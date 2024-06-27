const express = require("express");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const { Op } = require("sequelize");
const auth = require("./utils/auth");
const sequelize = require("./utils/sequelize");
const user = require("./models/user");
const session = require("./models/session");
const book = require("./models/book");
const borrow = require("./models/borrow");

sequelize.sync().then(() => console.log("database is ready"));

user.hasOne(session, {
  foreignKey: "user_id",
});
user.hasMany(borrow, {
  foreignKey: "user_id",
});
book.hasOne(borrow, {
  foreignKey: "book_id",
});

const app = express();
const port = 5000;

const options = {
  failOnErrors: true,
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Book API",
      version: "1.0.0",
    },
  },
  apis: ["index.js"],
};

const swaggerDocs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(express.json());
app.use(cookieParser());

app.use("/logout", auth);
app.use("/profile", auth);
app.use("/borrowed", auth);
app.use("/borrow", auth);

/**
 * @openapi
 * /register:
 *  post:
 *    tags:
 *      - user
 *    description: To sign up as a user, users must provide a unique username and email address.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                example:  admin
 *              email:
 *                type: string
 *                example:  admin@gmail.com
 *              password:
 *                type: string
 *                example:  admin
 *              first_name:
 *                type: string
 *                example:  pedro
 *              last_name:
 *                type: string
 *                example:  pascal
 *              birthday:
 *                type: date
 *                example:  2024-02-20 02:45:36.483
 *              phone_number:
 *                type: string
 *                example:  09101330563
 *    responses:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 */
app.post("/register", async (req, res) => {
  const foundUser = await user.findOne({
    where: {
      [Op.or]: [{ username: req.body.username }, { email: req.body.email }],
    },
  });
  if (!foundUser) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    user.create(req.body);
    const getID = await user.findOne({ where: { email: req.body.email } });
    const uuid = uuidv4();
    const cookie = await session.create({
      cookie: uuid,
      user_id: getID.id,
    });
    await cookie.save();
    res.cookie("session_token", uuid, {});
    res.status(200).json({ status: 200, result: req.body });
  } else {
    res.status(401).json({ status: 401, result: "user already exists" });
  }
});

/**
 * @openapi
 * /login:
 *  post:
 *    tags:
 *      - user
 *    description: To log in as a user, users must provide an email and password.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                example:  admin@gmail.com
 *              password:
 *                type: string
 *                example:  admin
 *    responses:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 */
app.post("/login", async (req, res) => {
  const foundUser = await user.findOne({
    where: {
      [Op.or]: [{ username: req.body.username }, { email: req.body.username }],
    },
  });
  if (foundUser) {
    const passUser = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );
    if (passUser) {
      const uuid = uuidv4();
      const cookie = await session.create({
        cookie: uuid,
        user_id: foundUser.id,
      });
      await cookie.save();
      res.cookie("session_token", uuid, {});
      res.status(200).json({ status: 200, result: cookie });
    } else {
      res
        .status(401)
        .json({ status: 401, result: "invalid email or password" });
    }
  } else {
    res.status(401).json({ status: 401, result: "invalid email or password" });
  }
});

/**
 * @openapi
 * /logout:
 *  post:
 *    tags:
 *      - user
 *    description: After a user has logged in, they can log out to exit his/her account.
 *    responses:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 */
app.post("/logout", async (req, res) => {
  const foundUser = await session.findOne({
    where: { cookie: req.cookies.session_token },
  });
  await session.destroy({ where: { id: foundUser.id } });
  res.clearCookie("session_token", {});
  res
    .status(200)
    .json({ status: 200, result: "The user successfully logged out" });
});

/**
 * @openapi
 * /profile:
 *  get:
 *    tags:
 *      - user
 *    description: This is an API for getting profile information.
 *    responses:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 */
app.get("/profile", async (req, res) => {
  const foundSession = await session.findOne({
    where: { cookie: req.cookies.session_token },
  });
  const foundUser = await user.findOne({
    where: { id: foundSession.user_id },
  });
  res.status(200).json({
    status: 200,
    id: foundUser.id,
    username: foundUser.username,
    email: foundUser.email,
    first_name: foundUser.first_name,
    last_name: foundUser.last_name,
    birthday: foundUser.birthday,
    phone_number: foundUser.phone_number,
  });
});

/**
 * @openapi
 * /borrowed:
 *  get:
 *    tags:
 *      - user
 *    description: This is an API for getting borrowed books.
 *    responses:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 */
app.get("/borrowed", async (req, res) => {
  const foundSession = await session.findOne({
    where: { cookie: req.cookies.session_token },
  });
  const borrowedBooks = await borrow.findAll({
    where: { user_id: foundSession.user_id },
  });
  if (borrowedBooks[0] != null) {
    const books = await book.findAll({
      where: { id: { [Op.in]: borrowedBooks.map((b) => b.book_id) } },
    });
    res.status(200).json({ status: 200, result: books });
  } else {
    res.status(200).json({ status: 200, result: "empty" });
  }
});

/**
 * @openapi
 * /statistics:
 *  get:
 *    tags:
 *      - landing_page
 *    description: This is an API to get statistics.
 *    responses:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 */
app.get("/statistics", async (req, res) => {
  const now = new Date();
  const newbook = await book.count({
    where: {
      ["createdAt"]: {
        [Op.gt]: now - 2592000000,
      },
    },
  });
  res.status(200).json({
    status: 200,
    usercount: await user.count(),
    bookcount: await book.count(),
    newbookcount: newbook,
  });
});

/**
 * @openapi
 * /new-books:
 *  get:
 *    tags:
 *      - landing_page
 *    description: This API gets new 6 books that are added to the website.
 *    responses:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 */
app.get("/new-books", async (req, res) => {
  const recentBooks = await book.findAll({
    limit: 6,
    order: [["createdAt", "DESC"]],
  });
  res.status(200).json({ status: 200, result: recentBooks });
});

/**
 * @openapi
 * /search:
 *  post:
 *    tags:
 *      - search
 *    description: You must provide a title of a book or an author's name to search.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              search:
 *                type: string
 *                example:  شب
 *    responses:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 */
app.post("/search", async (req, res) => {
  const foundBooks = await book.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${req.body.search}%` } },
        { author: { [Op.like]: `%${req.body.search}%` } },
      ],
    },
  });
  if (foundBooks[0] == null) {
    res.status(404).json({ status: 404, result: "not found" });
  } else {
    res.status(200).json({ status: 200, result: foundBooks });
  }
});

/**
 * @openapi
 * /borrow:
 *  post:
 *    tags:
 *      - search
 *    description: You must provide a book_id of a book.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              book_id:
 *                type: integer
 *                example:  1
 *    responses:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 */
app.post("/borrow", async (req, res) => {
  const foundUser = await session.findOne({
    where: { cookie: req.cookies.session_token },
  });
  const countBooks = await borrow.count({
    where: { user_id: foundUser.user_id },
  });
  const foundBooks = await book.findOne({
    where: { [Op.and]: [{ id: req.body.book_id }, { inventory_status: 1 }] },
  });
  if (countBooks < 5 && foundBooks) {
    const borrowBook = await borrow.create({
      user_id: foundUser.user_id,
      book_id: req.body.book_id,
    });
    await foundBooks.update({ inventory_status: 0 });
    await borrowBook.save();
    res.status(200).json({ status: 200, result: "book borrowed" });
  } else {
    res.status(401).json({ status: 401, result: "unauthorized" });
  }
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

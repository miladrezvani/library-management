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

sequelize.sync().then(() => console.log("database is ready"));

user.hasOne(session, {
  foreignKey: "user_id",
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
 *    description: This is a test API for checking cookies.
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
  res.status(200).json({ status: 200, result: foundUser });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
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
  res.status(200).json({ status: 200, usercount: await user.count() });
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
        { Title: { [Op.like]: `%${req.body.search}%` } },
        { Author: { [Op.like]: `%${req.body.search}%` } },
      ],
    },
  });
  if (foundBooks[0] == null) {
    res.status(404).json({ status: 404, result: "not found" });
  } else {
    res.status(200).json({ status: 200, result: foundBooks });
  }
});

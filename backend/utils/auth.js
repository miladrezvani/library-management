const express = require("express");
const { v4: uuidv4 } = require("uuid");
const session = require("../models/session");

const auth = express();

auth.use("/", async (req, res, next) => {
  if (req.cookies.session_token) {
    const foundUser = await session.findOne({
      where: { cookie: req.cookies.session_token },
    });
    if (foundUser) {
      const now = new Date();
      const currentDate = now - foundUser.updatedAt;
      if (currentDate > 600000) {
        const uuid = uuidv4();
        foundUser.cookie = uuid;
        req.cookies.session_token = uuid;
        await foundUser.save();
        res.cookie("session_token", uuid, {});
      } else {
        res.cookie("session_token", foundUser.cookie, {});
      }
      next();
    }
  } else {
    res.json({ status: 401, result: "unauthorized" });
  }
});

module.exports = auth;

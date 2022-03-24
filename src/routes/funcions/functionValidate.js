const { Router } = require("express");
const { User } = require("../db.js");

async function validateRegister(id) {
  try {
    const user = await User.findByPk(id);
    if (user != null) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return err;
  }
}
module.exports = {
  validateRegister,
};

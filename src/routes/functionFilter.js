const { Op } = require("../db");

function filter(name, age, width, movie) {
  let condition;
  if (name || age || width || movie) {
    if (name && age && width) {
      condition = {
        where: {
          [Op.and]: [
            { name: { [Op.substring]: name.toLowerCase() } },
            { age: age },
            { width: width },
          ],
        },
      };
      return condition;
    }
    if (name && age) {
      condition = {
        where: {
          [Op.and]: [
            { name: { [Op.substring]: name.toLowerCase() } },
            { age: age },
          ],
        },
      };
      return condition;
    }
    if (name && width) {
      condition = {
        where: {
          [Op.and]: [
            { name: { [Op.substring]: name.toLowerCase() } },
            { width: width },
          ],
        },
      };
      return condition;
    }
    if (age && width) {
      condition = { where: { [Op.and]: [{ width: width }, { age: age }] } };
      return condition;
    }
    if (name) {
      condition = {
        where: { name: { [Op.substring]: name.toLowerCase() } },
      };
      return condition;
    }
    if (age) {
      condition = {
        where: { age: age },
      };
      return condition;
    }
    if (width) {
      condition = {
        where: { width: width },
      };
      return condition;
    }
  }
  return {};
}

module.exports = {
  filter,
};

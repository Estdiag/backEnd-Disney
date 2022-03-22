const { Op } = require("../db");

export function filter(name, age, width, movie) {
  let condition;
  if (name || age || width || movie) {
    if (name && age && width) {
      condition = {
        where: {
          [Op.and]: [{ name: name }, { age: age }, { width: width }],
        },
      };
      return condition;
    }
    if (name && age) {
      condition = { where: { [Op.and]: [{ name: name }, { age: age }] } };
      return condition;
    }
    if (name && width) {
      condition = { where: { [Op.and]: [{ name: name }, { width: width }] } };
      return condition;
    }
    if (age && width) {
      condition = { where: { [Op.and]: [{ width: width }, { age: age }] } };
      return condition;
    }
    if (name) {
      condition = {
        where: { name: name },
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

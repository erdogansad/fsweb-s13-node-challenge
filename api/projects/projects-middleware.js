const { get } = require("./projects-model.js");

const bodyController = (req, res, next) => {
  if (req.body.name !== undefined && req.body.description !== undefined && req.body.completed !== undefined) {
    next();
  } else {
    next({ status: 400, message: "bad request" });
  }
};

const finder = async (req, res, next) => {
  try {
    let data = await get(req.params.id);
    if (data) {
      req.data = data;
      next();
    } else {
      next({ status: 404, message: "not found" });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  bodyController,
  finder,
};

const express = require("express");
const route = express.Router();
const { get, insert, update, remove } = require("./actions-model.js");
const { finder, bodyController } = require("./actions-middlware.js");

route.get("/", async (req, res, next) => {
  try {
    let query = await get();
    res.status(200).json(query);
  } catch (e) {
    next(e);
  }
});

route.get("/:id", finder, async (req, res, next) => {
  try {
    res.status(200).json(req.data);
  } catch (e) {
    next(e);
  }
});

route.post("/", bodyController, async (req, res, next) => {
  try {
    let query = await insert(req.body);
    res.status(201).json(req.body);
  } catch (e) {
    next(e);
  }
});

route.put("/:id", finder, bodyController, async (req, res, next) => {
  try {
    let query = await update(req.params.id, req.body);
    res.status(200).json(req.body);
  } catch (e) {
    next(e);
  }
});

route.delete("/:id", async (req, res, next) => {
  try {
    let query = await remove(req.params.id);
    res.status(200).json(query);
  } catch (e) {
    next(e);
  }
});

module.exports = route;

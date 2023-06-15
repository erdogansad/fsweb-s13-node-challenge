const express = require("express");
const route = express.Router();
const { get, insert, update, remove, getProjectActions } = require("./projects-model.js");
const { bodyController, finder } = require("./projects-middleware.js");

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

route.delete("/:id", finder, async (req, res, next) => {
  try {
    let query = await remove(req.params.id);
    res.status(200).json(query);
  } catch (e) {
    next(e);
  }
});

route.get("/:id/actions", async (req, res, next) => {
  try {
    let query = await getProjectActions(req.params.id);
    res.status(200).json(query);
  } catch (e) {
    next(e);
  }
});

module.exports = route;

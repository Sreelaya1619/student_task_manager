const { validationResult } = require("express-validator");
const Task = require("../models/task");

exports.getAllTasks = (req, res) => {
  Task.getAll((err, tasks) => {
    if (err)
      return res.status(500).json({ success: false, message: err.message });

    res.json({
      success: true,
      data: tasks,
    });
  });
};

exports.getTaskById = (req, res) => {
  Task.getById(req.params.id, (err, task) => {
    if (err)
      return res.status(500).json({ success: false });

    if (!task)
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });

    res.json({
      success: true,
      data: task,
    });
  });
};

exports.createTask = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(422).json({
      success: false,
      errors: errors.array(),
    });

  Task.create(req.body, (err, id) => {
    if (err)
      return res.status(500).json({
        success: false,
        message: err.message,
      });

    Task.getById(id, (err, task) => {
      res.status(201).json({
        success: true,
        data: task,
      });
    });
  });
};

exports.updateTask = (req, res) => {
  Task.update(req.params.id, req.body, (err) => {
    if (err)
      return res.status(500).json({
        success: false,
      });

    Task.getById(req.params.id, (err, task) => {
      res.json({
        success: true,
        data: task,
      });
    });
  });
};

exports.completeTask = (req, res) => {
  Task.complete(req.params.id, (err) => {
    if (err)
      return res.status(500).json({
        success: false,
      });

    Task.getById(req.params.id, (err, task) => {
      res.json({
        success: true,
        data: task,
      });
    });
  });
};

exports.deleteTask = (req, res) => {
  Task.delete(req.params.id, (err) => {
    if (err)
      return res.status(500).json({
        success: false,
      });

    res.json({
      success: true,
      message: "Task deleted successfully",
    });
  });
};

exports.getStats = (req, res) => {
  Task.getStats((err, stats) => {
    if (err)
      return res.status(500).json({
        success: false,
      });

    res.json({
      success: true,
      data: stats,
    });
  });
};
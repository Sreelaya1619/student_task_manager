const db = require("../database/db");

const Task = {
  getAll(callback) {
    db.all(
      "SELECT * FROM tasks ORDER BY id DESC",
      [],
      (err, rows) => callback(err, rows)
    );
  },

  getById(id, callback) {
    db.get(
      "SELECT * FROM tasks WHERE id = ?",
      [id],
      (err, row) => callback(err, row)
    );
  },

  create(task, callback) {
    db.run(
      "INSERT INTO tasks(title, description, status) VALUES(?,?,?)",
      [
        task.title,
        task.description || "",
        "Pending"
      ],
      function (err) {
        callback(err, this.lastID);
      }
    );
  },

  update(id, task, callback) {
    db.run(
      "UPDATE tasks SET title=?, description=? WHERE id=?",
      [task.title, task.description, id],
      function (err) {
        callback(err, this.changes);
      }
    );
  },

  complete(id, callback) {
    db.run(
      "UPDATE tasks SET status='Completed' WHERE id=?",
      [id],
      function (err) {
        callback(err, this.changes);
      }
    );
  },

  delete(id, callback) {
    db.run(
      "DELETE FROM tasks WHERE id=?",
      [id],
      function (err) {
        callback(err, this.changes);
      }
    );
  },

  getStats(callback) {
    db.get(
      `SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN status='Completed' THEN 1 ELSE 0 END) AS completed,
        SUM(CASE WHEN status='Pending' THEN 1 ELSE 0 END) AS pending
      FROM tasks`,
      [],
      (err, row) => callback(err, row)
    );
  }
};

module.exports = Task;
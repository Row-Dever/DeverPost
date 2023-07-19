import db from "../util/database.js";

export default class Posts {
  constructor(title, content, category, userId, imgsrc) {
    this.id = null;
    this.title = title;
    this.content = content;
    this.category = category;
    this.userId = userId;
    this.imgsrc = imgsrc;
  }

  save() {
    return db.query(
      "INSERT INTO posts (title, content, category, userId, imgsrc, created_at) VALUES(?, ?, ?, ?, ?, NOW())",
      [this.title, this.content, this.category, this.userId, this.imgsrc]
    );
  }

  static deleteById(id) {
    return db.query("DELETE FROM posts WHERE id = ?", [id]);
  }

  static fetchData(limit, cursorId) {
    if (cursorId) {
      return db.execute(
        "SELECT * FROM posts WHERE id < ? ORDER BY id DESC LIMIT ?",
        [cursorId, limit]
      );
    } else {
      return db.execute("SELECT * FROM posts ORDER BY id DESC LIMIT ?", [
        limit,
      ]);
    }
  }

  static findById(id) {
    return db.query("SELECT * FROM posts WHERE id = ?", [id]);
  }

  static updateById(id, title, content, category, imgsrc) {
    return db.query(
      "UPDATE posts SET title = ?, content = ?, category = ?, imgsrc = ?, created_at = NOW() WHERE id = ?",
      [title, content, category, imgsrc, id]
    );
  }
}

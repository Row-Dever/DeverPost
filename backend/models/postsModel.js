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
        "SELECT p.id, p.created_at, p.title, p.content, p.category, p.imgsrc, p.userid, u.username FROM posts as p INNER JOIN users as u ON p.userid = u.id WHERE p.id < ? ORDER BY p.id DESC LIMIT ?",
        [cursorId, limit]
      );
    } else {
      return db.execute(
        "SELECT p.id, p.created_at, p.title, p.content, p.category, p.imgsrc, p.userid, u.username FROM posts as p INNER JOIN users as u ON p.userid = u.id ORDER BY p.id DESC LIMIT ?",
        [limit]
      );
    }
  }

  static fetchKeywordData(limit, cursorId, keyword) {
    if (cursorId) {
      return db.execute(
        "SELECT p.id, p.created_at, p.title, p.content, p.category, p.imgsrc, p.userid, u.username FROM posts as p INNER JOIN users as u ON p.userid = u.id WHERE p.id < ? && p.title like CONCAT('%', ?, '%') ORDER BY p.id DESC LIMIT ?",
        [cursorId, keyword, limit]
      );
    } else {
      return db.execute(
        "SELECT p.id, p.created_at, p.title, p.content, p.category, p.imgsrc, p.userid, u.username FROM posts as p INNER JOIN users as u ON p.userid = u.id WHERE p.title like CONCAT('%', ?, '%') ORDER BY p.id DESC LIMIT ?",
        [keyword, limit]
      );
    }
  }

  static findById(id) {
    return db.query(
      "SELECT p.id, p.title, p.content, p.category, p.imgsrc, p.created_at, p.userid, u.username FROM posts as p INNER JOIN users as u ON p.userid = u.id WHERE p.id = ?",
      [id]
    );
  }

  static updateById(id, title, content, category, imgsrc) {
    return db.query(
      "UPDATE posts SET title = ?, content = ?, category = ?, imgsrc = ?, created_at = NOW() WHERE id = ?",
      [title, content, category, imgsrc, id]
    );
  }
}

// import db from "../util/database.js";

export default class Posts {
  constructor(title, description, imgSrc, category, userName, userId) {
    this.id = null;
    this.title = title;
    this.description = description;
    this.imgSrc = imgSrc;
    this.userName = userName;
    this.userId = userId;
    this.category = category;
  }

  //   save() {
  //     console.log("save");
  //     return db.query(
  //       "INSERT INTO posts (title, description, imgSrc, userName, userId, category, created_at) VALUES(?, ?, ?, ?, ?, ?, NOW())",
  //       [
  //         this.title,
  //         this.description,
  //         this.imgSrc,
  //         this.userName,
  //         this.userId,
  //         this.category,
  //       ]
  //     );
  //   }

  //   static deleteById(id) {
  //     return db.query("DELETE FROM posts WHERE id = ?", [id]);
  //   }

  //   static fetchAll(limit, start) {
  //     return db.execute("SELECT * FROM posts ORDER BY id DESC LIMIT ? , ?", [
  //       start,
  //       limit,
  //     ]);
  //   }

  //   static findById(id) {
  //     return db.query("SELECT * FROM posts WHERE id = ?", [id]);
  //   }

  //   static updateById(id, title, description) {
  //     console.log("updated");
  //     return db.query(
  //       "UPDATE posts SET title = ?, description = ?, created_at = NOW() WHERE id = ?",
  //       [title, description, id]
  //     );
  //   }
}

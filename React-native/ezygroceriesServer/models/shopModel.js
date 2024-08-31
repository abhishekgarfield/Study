import { db } from "../config/application.js";

const shopModal = {
  getAllshops: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * from shops;", [], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  getShopWithId:  (shop_id) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * from shops where id = ?;", [shop_id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  shopsAvailableForUser: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT shops.id AS id, shops.name AS name, shops.web_url AS web_url, shops.is_verified AS is_verified, shops.gst_no AS gst_no, shops.description AS description, shops.created_at AS created_at, shops.updated_at AS updated_at, shops.pic_url AS pic_url FROM shops LEFT JOIN membership ON membership.shop_id = shops.id WHERE membership.customer_id <> 1 OR membership.customer_id IS NULL;`,
        [id],
        (err, result) => {
          if (err) {
            console.log("---err--", err);
            reject(err);
          } else {
            console.log("---RESULT-22222-", result);
            resolve(result);
          }
        }
      );
    });
  }

};

export default shopModal;

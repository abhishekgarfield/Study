import { db } from "../config/application.js";

const shopModal = {
  getAllshops: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT id as value, name as label from shops;", [], (err, result) => {
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

};

export default shopModal;

import { db } from "../config/application.js";

const shopItemModal = {
  getAllShopItems: (shop_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from shop_items where shop_id = ? `,
        [shop_id],
        (err, result) => {
          if (err) {
            console.log("---err--", err);
            reject(err);
          } else {
            console.log("---RESULT--", result);
            resolve(result);
          }
        }
      );
    });
  },
  updateIsAvailable: (item_id, is_available) => {
    return new Promise((resolve, reject) => {
      db.query(
        `update shop_items set is_available = ? where id = ? `,
        [is_available, item_id],
        (err, result) => {
          if (err) {
            console.log("---err--", err);
            reject(err);
          } else {
            console.log("---RESULT--", result);
            resolve(result);
          }
        }
      );
    });
  },
};

export default shopItemModal;

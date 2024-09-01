import { db } from "../config/application.js";

const orderModal = {
  createOrder: (membership_id, total_cost, groupedItems) => {
    return new Promise((resolve, reject) => {
      db.query(
        "select * from membership where id = ?",
        [membership_id],
        (err3, result3) => {
          if (err3) {
            reject(err3);
          } else {
            if (result3.length > 0) {
              db.query(
                "INSERT INTO orders (membership_id, total_cost) VALUES",
                [membership_id, total_cost],
                (err, result) => {
                  if (err) {
                    reject(err);
                  } else {
                    if (result.insertId > 0) {
                      const orderId = result.insertId;
                      let queryValues = [];

                      for (const key in groupedItems) {
                        if (groupedItems.hasOwnProperty(key)) {
                          const items = groupedItems[key];
                          const quantity = items.length;
                          const { id, price } = items[0];
                          const values = `(${orderId}, ${id}, ${quantity}, '${price}')`;
                          queryValues.push(values);
                        }
                      }

                      const query = `INSERT INTO order_items (order_id, shop_item_id, quantity, price_per_item) VALUES ${queryValues.join(
                        ", "
                      )};`;
                      db.query(query, [], (err2, result2) => {
                        if (err2) {
                          reject(err2);
                        } else {
                          console.lof("----result3-----", result3);
                          db.query(
                            "update table membership set total_amount = ?",
                            [result3.total_amount - total_cost],
                            (err, result4) => {
                              if (err) {
                                reject(err);
                              } else {
                                db.query(
                                  "INSERT INTO transaction (membership_id, is_debit, transaction_mode_id, total_cost ) VALUES (?, 1, (SELECT id FROM transactionmode WHERE name = 'Credit'), ?);",
                                  [membership_id, total_cost],
                                  (err6, result6) => {
                                    if (err6) {
                                      reject(err6);
                                    } else {
                                      resolve("Order placed successfully!");
                                    }
                                  }
                                );
                              }
                            }
                          );
                        }
                      });
                    }
                  }
                }
              );
            } else {
              reject("No membership found !");
            }
          }
        }
      );
    });
  },
};

export default orderModal;

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
  editShopitem: (id, name, is_available, quantity, price, description, image_urls, brand_name) => {
    return new Promise((resolve, reject) => {
      db.query(
        `update shop_items set brand_name = ? , is_available = ? , quantity = ? , name = ? , price = ? , description = ? , image_urls = JSON_ARRAY(?) where id = ? `,
        [brand_name, is_available, quantity, name,price, description, image_urls, id ],
        (err, result) => {
          if (err) {
            console.log("---err--", err);
            reject(err);
          } else {
            console.log("---RESULT--", result);
            db.query("select * from shop_items where id = ?",[id],(err, result2)=>{
              if(err){
                reject(err);
              }else{
                console.log("---result 2--1111---",result2[0]);
                resolve(result2[0])
              }
            })
          }
        }
      );
    });
  },
  createShopitem: (name, is_available, quantity, price, description, image_urls, brand_name, shop_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `insert into shop_items (brand_name, is_available, quantity, name ,price ,description ,image_urls, shop_id) values ( ? ,? ,? ,? ,? ,? ,JSON_ARRAY(?) ,?)`,
        [brand_name, is_available, quantity, name,price, description, image_urls, shop_id ],
        (err, result) =>  {
          if (err) {
            console.log("---err--", err);
            reject(err);
          } else {
            console.log("---RESULT--", result.insertId);
            db.query("select * from shop_items where id = ?",[result.insertId],(err, result2)=>{
              if(err){
                reject(err);
              }else{
                console.log("---result 2-----",result2[0]);
                resolve(result2[0])
              }
            })
          }
        }
      );
    });
  },
  deleteShopItem: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `delete from shop_items where id = ? `,
        [id],
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
  }
};

export default shopItemModal;

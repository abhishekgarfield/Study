import shopModal from "../models/shopModel.js";

const shopController = {
  allShops: (req, res) => {
    try {
      shopModal
        .getAllshops()
        .then((result) => {
          console.log("--res--", result);
          res.status(200).send(result);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    } catch (err) {
      console.error("-----employeeController.allShops---", err);
    }
  },
  getShop: (req, res) => {
    try {
      console.log("---req.body---",req.body)

      const{shop_id} = req.body;
      shopModal
        .getShopWithId(shop_id)
        .then((result) => {
          console.log("--res--", result);
          res.status(200).send(result[0]);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    } catch (err) {
      console.error("-----employeeController.getShop---", err);
    }
  },
  getAvailableShop: (req, res) => {
    try {
      console.log("---req.body---",req.query)

      const{user_id} = req.query;
      shopModal
        .shopsAvailableForUser(user_id)
        .then((result) => {
          console.log("--res--", result);
          res.status(200).send(result);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    } catch (err) {
      console.error("-----employeeController.getShop---", err);
    }
  }
};

export default shopController;

import shopItemModal from "../models/shopItemModal.js";

const shopItemController = {
  getShopItems: (req, res) => {
    try {
      const { shop_id } = req.query;
      shopItemModal
        .getAllShopItems(shop_id)
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((err) => {
          console.log("----errr---", err);
          res.send(400).send("Unable to get shop items");
        });
    } catch (err) {
      console.log("----errr---", err);
      res.send(400).send("Unable to get shop items");
    }
  },
  updateIsAvailable: (req, res) => {
    try {
      console.log("-----", req.body);
      const { is_available, item_id } = req.body;
      shopItemModal
        .updateIsAvailable(item_id, is_available)
        .then((result) => {
          res.status(200).send("Item updated successfully!");
        })
        .catch((err) => {
          console.log("----errr---", err);
          res.send(400).send("Unable to update shop items");
        });
    } catch (err) {
      console.log("----errr---", err);
      res.send(400).send("Unable to update shop items");
    }
  },
};

export default shopItemController;

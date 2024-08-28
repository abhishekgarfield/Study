import shopItemModal from "../models/shopItemModal.js";
import handleImageUploads from "../utils/imageProcessutil.js";

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
          res.status(400).send("Unable to get shop items");
        });
    } catch (err) {
      console.log("----errr---", err);
      res.status(400).send("Unable to get shop items");
    }
  },
  updateIsAvailable: (req, res) => {
    try {
      const { is_available, item_id } = req.body;
      shopItemModal
        .updateIsAvailable(item_id, is_available)
        .then((result) => {
          res.status(200).send("Item updated successfully!");
        })
        .catch((err) => {
          console.log("----errr---", err);
          res.status(400).send("Unable to update shop items");
        });
    } catch (err) {
      console.log("----errr---", err);
      res.status(400).send("Unable to update shop items");
    }
  },
  createShopItem:async (req, res) => {
    try {
      const { name, is_available, quantity, price, description, image_urls, brand_name, shop_id } = req.body.shop_item;
      if (!image_urls || !Array.isArray(image_urls)) {
        return res.status(400).json({ error: 'Invalid imageUrls' });
      }
      const uploadedImageUrls = await handleImageUploads(image_urls);
      console.log("---image--urls----",uploadedImageUrls)
      shopItemModal.createShopitem(name, is_available, quantity, price, description, uploadedImageUrls, brand_name, shop_id)
        .then((result) => {
          console.log("---result--1111111---",result)
          res.status(200).send({
            message:"Item updated successfully!",
            data:result
          });
        })
        .catch((err) => {
          console.log("----errr---", err);
          res.status(400).send("Unable to create shop items");
        });
    } catch (err) {
      console.log("----errr---", err);
      res.status(400).send("Unable to create shop items");
    }
  },
  editShopItem: async(req, res) => {
    try {
      console.log("-------------body ---------",req.body)
      const {id, name, is_available, quantity, price, description, image_urls, brand_name } = req.body.shop_item;
      if (!image_urls || !Array.isArray(image_urls)) {
        return res.status(400).json({ error: 'Invalid imageUrls' });
      }
      const uploadedImageUrls = await handleImageUploads(image_urls);
      shopItemModal.editShopitem(id, name, is_available, quantity, price, description, uploadedImageUrls, brand_name)
        .then((result) => {
          console.log("---result-----",result)
          res.status(200).send({
            message:"Item updated successfully!",
            data:result
          });
        })
        .catch((err) => {
          console.log("----errr---", err);
          res.status(400).send("Unable to edit shop items");
        });
    } catch (err) {
      console.log("----errr---", err);
      res.status(400).send("Unable to edit shop items");
    }
  },
  deleteShopItem: (req, res) => {
    try {
      console.log("-------------body ---------",req.body)

      const {id} = req.body;
      shopItemModal.deleteShopItem(id)
        .then((result) => {
          console.log("---result-----",result)
          res.status(200).send({
            message:"Item deleted successfully!",
            data:result
          });
        })
        .catch((err) => {
          console.log("----errr---", err);
          res.status(400).send("Unable to delete shop items");
        });
    } catch (err) {
      console.log("----errr---", err);
      res.status(400).send("Unable to delete shop items");
    }
  },
};

export default shopItemController;

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
      console.error("-----employeeController.allEmployees---", err);
    }
  }
};

export default shopController;

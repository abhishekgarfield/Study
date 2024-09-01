import orderModal from "../models/orderModal.js";

const orderController = {
  createOrder: (req, res) =>{
    try {
        const {groupedItems, membership_id, total_cost} = req.body
        order
        orderModal.createOrder(membership_id, total_cost, groupedItems)
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
  }
}

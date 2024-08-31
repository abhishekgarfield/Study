import { membershipModal } from "../models/membershipModal.js";

const memberShipController = {
  getshopMemberships: (req, res) => {
    try {
      const { shop_id } = req.query;
      membershipModal
        .getMembershipfromshop(shop_id)
        .then((result) => {
          console.log("--res--", result);
          res.status(200).send(result);
        })
        .catch((err) => {
          res.status(401).send(err);
        });
    } catch (err) {
      res.status(401).send(err);
      console.error("-----membershipController.getshopmembership---", err);
    }
  },
  getCustomerMemberships: (req, res) => {
    try {
      const { user_id } = req.query;
      console.log("----------------req.query-------",req.query)
      membershipModal
        .getMembershipfromcustomer(user_id)
        .then((result) => {
          console.log("--res--", result);
          res.status(200).send(result);
        })
        .catch((err) => {
          res.status(401).send(err);
        });
    } catch (err) {
      res.status(401).send(err);
      console.error("-----membershipController.getshopmembership---", err);
    }
  },
  addMembership: (req, res) => {
    try {
      const { shop_id, totalAmount, email } = req.body;
      console.log("-----req-----",req.body)
      membershipModal
        .createMemberShip(email, shop_id, totalAmount)
        .then((result) => {
          console.log("--res------", result);
          if(result.length > 0){
            res.status(200).send(result);

          }else{
            res.status(404).send('No email found');

          }
        })
        .catch((err) => {
          res.status(401).send(err);
        });
    } catch (err) {
      res.status(401).send(err);
      console.error("-----membershipController.getshopmembership---", err);
    }
  },
};

export default memberShipController;

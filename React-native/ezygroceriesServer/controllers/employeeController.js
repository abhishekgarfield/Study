import employeeModal from "../models/employeeModal.js";
import { compareHashedpass } from "../utils/bcryptUtils.js";
import { generateToken } from "../utils/jwtUtils.js";

const employeeController = {
  allEmployees: (req, res) => {
    try {
      console.log("----as-d-asd---");
      employeeModal
        .getAllemployees()
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
  },
  employeeLogin: (req, res) => {
    try {
      const { email, password } = req.body;
      employeeModal
        .checkLogin(email, password)
        .then((result) => {
          if (result) {
            if (compareHashedpass(password, result.password)) {
              let authToken = generateToken({
                time: Date(),
                userID: result.id,
              });
              res.status(200).send({ authToken: authToken });
            } else {
              res.status(400).send("INVLID PASSWORD");
            }
          } else {
            res.code(400).send("INVALID EMAIL");
          }
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    } catch (err) {
      console.error("-----employeeController.employeeLogin---", err);
    }
  },
};

export default employeeController;

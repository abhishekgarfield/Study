import customerModal from "../models/customerModal.js";
import { compareHashedpass, encryptPassword } from "../utils/bcryptUtils.js";
import { generateToken } from "../utils/jwtUtils.js";
import { sendEmail } from "../utils/mailerUtils.js";
import { generateOtp, validateOtp } from "../utils/otpUtils.js";
import baseController from "./baseController.js";

const customerController = {
  allcustomers: (req, res) => {
    try {
      customerModal
        .getAllcustomers()
        .then((result) => {
          console.log("--res--", result);
          res.status(200).send(result);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    } catch (err) {
      console.error("-----customerController.allEmployees---", err);
    }
  },
  customerLogin: (req, res) => {
    try {
      console.log("----body====",req.body)
      const { email, password } = req.body.user;
      customerModal
        .checkLogin(email, password)
        .then(async (result) => {
          if (result.length > 0 ) {
          const { first_name, id } = result[0];
          console.log("---result--111--", result[0]);

            if (await compareHashedpass(password, result[0].password)) {

                const { otp, secret } = generateOtp();
                customerModal.saveotpSecret(secret, id).catch((err) => {
                  res.send(209).send("Unable to send otp");
                });
                const mail_options = baseController.generateMailOptions(
                  email,
                  "employee_signup",
                  { first_name, email, otp }
                );
                sendEmail(mail_options)
                  .then((result) => {
                    res.status(200).send({
                      user_id: id,
                      message: "otp has been sent",
                    });
                  })
                  .catch((err) => {
                    res.status(400).send("Bad request");
                  });

            } else {
              console.log("---asd-a-sd-a-sd-as-d-")
              res.status(207).send("Password doesnot match.");
            }
          } else {
            console.log("--a-sd-a-sd--")
            res.status(203).send("Unable to find any user with this email");
          }
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    } catch (err) {
      console.error("-----customerController.customerLogin---", err);
    }
  },
  customerSignup: async (req, res) => {
    try {
      const {
        user: { name, email, dob, password, phone },
      } = req.body;
      let hashedPassword = await encryptPassword(password);
      const checkEmail = await customerModal.getCustomerWithEmail(email);
      if (checkEmail.length > 0) {
        res
          .status(203)
          .send("User already exists with this email.\nPlease signin.");
      } else {
        customerModal
          .customerSignup(
            name,
            name,
            hashedPassword,
            dob,
            phone,
            email,
          )
          .then((result) => {
            const user_id = result.insertId;
            res.status(202).send("User successfully created. Please login!");
          })
          .catch((err) => {
            res.status(409).send("Internal server error");
          });
      }
    } catch (err) {
      console.error("-----customer.customerSignup---", err);
    }
  },
  verifyOtp: (req, res) => {
    try {
      const { otp, user_id } = req.body.data;
      customerModal.getOtpSecret(user_id).then(async (result) => {
        const secret = result[0].otp;
        if (validateOtp(secret, otp)) {
          const authToken = await generateToken({
            time: new Date(),
            userID: user_id,
          });
          customerModal
            .saveAuthtoken(authToken, user_id)
            .then((result) => {
              res.status(200).send({ user: result[0] });
            })
            .catch((err) => {
              res.status(500).send("Server error");
            });
        } else {
          res.status(202).send("Invalid otp");
        }
      });
    } catch (err) {
      console.log("-----employeeController.verifyOtp---", err);
      res.status(500).send("Server error");
    }
  },
  resendOtp: (req, res) => {
    const { name, email, user_id } = req.body.data;
    const { otp, secret } = generateOtp();
    customerModal.saveotpSecret(secret, user_id).catch((err) => {
      res.send(400).send("Unable to send otp");
    });
    const mail_options = baseController.generateMailOptions(
      email,
      "employee_signup",
      { name, email, otp }
    );
    sendEmail(mail_options)
      .then((result) => {
        res.status(200).send("");
      })
      .catch((err) => {
        res.status(400).send("Bad request");
      });
  },
};

export default employeeController;

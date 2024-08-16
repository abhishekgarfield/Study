import employeeModal from "../models/employeeModal.js";
import { compareHashedpass, encryptPassword } from "../utils/bcryptUtils.js";
import { generateToken } from "../utils/jwtUtils.js";
import { sendEmail } from "../utils/mailerUtils.js";
import { generateOtp, validateOtp } from "../utils/otpUtils.js";
import baseController from "./baseController.js";

const employeeController = {
  allEmployees: (req, res) => {
    try {
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
  employeeLogin:(req, res) => {
    try {
      const { email, password } = req.body;
      employeeModal
        .checkLogin(email, password)
        .then(async (result) => {
          if (result) {
            if (await compareHashedpass(password, result.password)) {
              let authToken = await generateToken({
                time: new Date(),
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
  employeeSignup: async (req, res) => {
    try {
      const {
        user: { name, email, dob, password, shop_id, phone },
      } = req.body;
      let hashedPassword = await encryptPassword(password);
      const checkEmail = await employeeModal.getEmployeeWithEmail(email);
      if(checkEmail.length > 0){
         res.status(203).send('User already exists with this email.\nPlease signin.')
      }else{
      employeeModal
        .employeeSignup(name, name, hashedPassword, dob, phone, email, shop_id)
        .then((result) => {
          const user_id = result.insertId;
          res.status(202).send('User successfully created')
          // const { otp, secret } = generateOtp();
          // employeeModal.saveotpSecret(secret, user_id).catch((err) => {
          //   res.send(400).send("Unable to send otp");
          // });
          // const mail_options = baseController.generateMailOptions(
          //   email,
          //   "employee_signup",
          //   { name, email, otp }
          // );
          // sendEmail(mail_options)
          //   .then((result) => {
          //     res
          //       .status(200)
          //       .send({
          //         user_id: user_id,
          //         message: "User created and otp has been sent",
          //       });
          //   })
          //   .catch((err) => {
          //     res.status(400).send("Bad request");
          //   });
        })
        .catch((err) => {
          res.status(409).send("Internal server error");
        });
      }
    } catch (err) {
      console.error("-----employeeController.employeeSignup---", err);
    }
  },
  verifyOtp: (req, res) => {
    try {
      const { otp, user_id } = req.body.data;
      employeeModal.getOtpSecret(user_id).then(async (result) => {
        const secret = result[0].otp;
        if (validateOtp(secret, otp)) {
          const authToken = await generateToken({
            time: new Date(),
            userID: user_id,
          });
          employeeModal
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
    const  { name, email, user_id } = req.body.data;
    const { otp, secret } = generateOtp();
    employeeModal.saveotpSecret(secret, user_id).catch((err) => {
      res.send(400).send("Unable to send otp");
    });
    const mail_options = baseController.generateMailOptions(
      email,
      "employee_signup",
      { name, email, otp }
    );
    sendEmail(mail_options)
      .then((result) => {
        res
          .status(200)
          .send('');
      })
      .catch((err) => {
        res.status(400).send("Bad request");
      });
  },
};

export default employeeController;

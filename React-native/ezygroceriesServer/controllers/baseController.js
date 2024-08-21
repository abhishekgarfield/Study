import dotenv from "dotenv";
dotenv.config();

const baseController = {
  generatemailText: function (options = {}) {
    const { otp, first_name } = options;

    const emailBody = `
    Hello ${first_name},

    Thank you for signing up with ${"ezygroceries"}! To complete your registration, please use the following One-Time Password (OTP) code:

    **OTP Code**: ${otp}

    This OTP is valid for the next 10 minutes. Please enter this code on the sign-up page to verify your email address and complete your registration.

    If you did not request this OTP, please ignore this email.

    Best regards,
    The ${"ezygroceries"} Team

    ${"abhishek2759@gmail.com"}
    `;
    return emailBody;
  },

  generateMailOptions: function (to_user, mail_type, options = {}) {
    try {
      let mailOptions = {
        from: process.env.MAILING_ACCOUNT,
        to: to_user,
      };

      switch (mail_type) {
        case "employee_login":
          mailOptions = {
            ...mailOptions,
            subject: "Your OTP Code for Account Verification",
            text: this.generatemailText(options),
          };
          break;
        case "employee_signup":
          mailOptions = {
            ...mailOptions,
            subject: "Your OTP Code for Account Verification",
            text: this.generatemailText(options),
          };
          break;
        case "customer_login":
          mailOptions = {
            ...mailOptions,
            subject: "Your OTP Code for Account Verification",
            text: this.generatemailText(options),
          };
          break;
        default:
          mailOptions = {
            ...mailOptions,
            subject: "Your OTP Code for Account Verification",
            text: this.generatemailText(options),
          };
      }
      return mailOptions;
    } catch (err) {
      console.log(
        "---------------------basecontroller.generateMailOptions--------------",
        err
      );
    }
  },
};

export default baseController;

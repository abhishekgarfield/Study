import { authenticator } from "otplib"

authenticator.options = { digits: 6, step: 1000000};

export const generateOtp = () => {
  const secret = authenticator.generateSecret();
  const otp = authenticator.generate(secret);
  return {
    otp: otp,
    secret: secret,
  };
};

export const validateOtp = (secret, otp) => {
  console.log("---otp , secret",otp,"---s-d",secret)
  const isValid = authenticator.check(otp,secret);
  console.log("---is--valid---",isValid)
  return isValid;
}

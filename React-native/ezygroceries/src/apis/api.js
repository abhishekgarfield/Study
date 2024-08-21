import { domain, protocol } from "../config/application";

export const getAllShops = `${protocol}${domain}/shops/getallshops`;
export const employeeSignup = `${protocol}${domain}/employees/signup`;
export const employeeLogin = `${protocol}${domain}/employees/login`;
export const employeeVerifyOtp = `${protocol}${domain}/employees/verifyotp`;
export const employeeResendOtp = `${protocol}${domain}/employees/resendotp`;
export const getShop = `${protocol}${domain}/shops/getshop`;




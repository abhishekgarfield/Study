import {domain, protocol} from '../config/application';

export const getAllShops = `${protocol}${domain}/shops/getallshops`;
export const employeeSignup = `${protocol}${domain}/employees/signup`;
export const employeeLogin = `${protocol}${domain}/employees/login`;
export const employeeVerifyOtp = `${protocol}${domain}/employees/verifyotp`;
export const employeeResendOtp = `${protocol}${domain}/employees/resendotp`;
export const getShop = `${protocol}${domain}/shops/getshop`;
export const customerSignup = `${protocol}${domain}/customers/signup`;
export const customerLogin = `${protocol}${domain}/customers/login`;
export const customerVerifyOtp = `${protocol}${domain}/customers/verifyotp`;
export const customerResendOtp = `${protocol}${domain}/customers/resendotp`;

// shop item apis

export const getShopItems = `${protocol}${domain}/shopitems/allshopItems`;
export const updateItemAvailability = `${protocol}${domain}/shopitems/updateavailability`;
export const createshopitem = `${protocol}${domain}/shopitems/createshopitem`;
export const updateshopitem = `${protocol}${domain}/shopitems/editshopitem`;
export const deleteshopitem = `${protocol}${domain}/shopitems/deleteshopitem`;


// headers

export let headers = {};

export const setHeader = (auth_token) => {
  headers = {
   'ezyGroceries_header_key': auth_token
  };
};

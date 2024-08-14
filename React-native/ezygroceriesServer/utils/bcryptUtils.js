import bcrypt from "bcryptjs";

export const encryptPassword = (pass) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return;
    }

    bcrypt.hash(pass, salt, (err, hash) => {
      if (err) {
        return;
      }
      console.log("---hahsed--", hash);
      return hash;
    });
  });
};

export const compareHashedpass = (userInputPass, storedPass) => {
  bcrypt.compare(userInputPass, storedPass, (err, result) => {
    if (err) {
      return;
    }
    if (result) {
      return true;
    } else {
      return false;
    }
  });
};

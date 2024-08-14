import bcrypt from "bcryptjs";

export const encryptPassword =async (pass) => {
  return new Promise((resolve, reject )=>{
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return reject(err);
      }

      const hash = bcrypt.hash(pass, salt, (err, hash) => {
        console.log("22222", hash)
        if (err) {
          return reject(err);
        }
        return resolve(hash);
      });
    });
  })


};

export const compareHashedpass = (userInputPass, storedPass) => {
  return new Promise((resolve, reject)=>{
    bcrypt.compare(userInputPass, storedPass, (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result) {
        return resolve(true);
      } else {
        return resolve(false);
      }
    });
  })

};

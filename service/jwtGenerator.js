import jwt from 'jsonwebtoken';

const PRIVATE_KEY = 'secret';
const EXPIRED_SECOND = 60 * 60; //만료 시간 (분)

// JWT 만드는 역할
// RS256에 비해 HS256는 변조까지 막음.
export const generate = (user_id, user_name, user_email) => {
  return jwt.sign(
    {
      user_id,
      user_name,
      user_email,
      exp: Math.floor(Date.now() / 1000) + EXPIRED_SECOND,
    },
    PRIVATE_KEY,
    { algorithm : 'HS256'});
};

export const isVerified = (token) => {
  return new Promise( (resolve, reject) => {
    jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
      if(decoded === undefined) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};
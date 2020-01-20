import {Router} from 'express';
import {createUser, findUser} from "../models/userModel";
import crypto from 'crypto';
import {generate} from "../service/jwtGenerator";

let router = Router();

router.post('/login', async (req, res) => {
  const base64_token = req.headers.authorization.split(" ")[1];
  let buff = new Buffer(base64_token, 'base64');
  let law_token = buff.toString('ascii');
  let law_id = law_token.split(":")[0];
  let law_password = law_token.split(":")[1];
  console.log('lawItems ->\ntoken: ', law_token, '\nid: ', law_id, '\npw: ', law_password);
  let userData = await findUser(law_id);

  let hashPW = cryptoPW(userData.salt, law_password);

  if (userData.pw === hashPW) {
    let jwtToken = generate(law_id, userData.name, userData.email);
    res.send(jwtToken);
  } else {
    res.status(401).send({error: "Wrong Id or PW"});
  }
});

function cryptoPW(salt, pw) {
  let hash = crypto.createHmac('sha256', salt);
  hash.update(pw);

  return hash.digest("base64");
}

router.post('/create', async (req, res) => {
  const {id, pw, name, email} = req.body;
  const salt = "custom_salt";
  let hashPW = cryptoPW(salt, pw);

  await createUser({
    id,
    pw: hashPW,
    name,
    email,
    salt
  });

  res.send("test");
});

export default router;
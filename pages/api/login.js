const db = require('../../lib/db')
const escape = require('sql-template-strings')
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
import Settings from '../../common/config';

async function findUser(db,email){
  let userEmail=email;
  const [User]=await db.query(escape`
    SELECT id,email,password,name from users where email=${email}
  `);
  return User;
}
module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const femail=req.body.email;
    const fPassword=req.body.password;
    let UserDB=await findUser(db,femail);
    UserDB=JSON.parse(JSON.stringify(UserDB));
    console.log('----- UserDB ------');
    console.log(UserDB);

    if(!UserDB.email){
      res.status(404).json({
        error:'User not found'
      });
      return;
    }else{
      let samePass=await bcrypt.compare(fPassword, UserDB.password);
      if(!samePass){
        res.status(404).json({
          error:'User not Found'
        });
        return;
      }else{
        const token = jwt.sign(
          {userId: UserDB.id, email: UserDB.email},
          Settings.jwtSecret,
          {
            expiresIn: 3000, //50 minutos
          },
        );
        const userLogged={
          id:UserDB.id,
          name:UserDB.name,
          email:UserDB.email,
          token:token
        }
        res.status(200).json({userLogged});
        return;
      }
    }
  } else {
    // Handle any other HTTP method
    res.statusCode = 401;
    res.end();
  }

}
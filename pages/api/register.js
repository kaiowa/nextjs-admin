const db = require('../../lib/db')
const escape = require('sql-template-strings')
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
import Settings from '../../common/config';

async function createUser(db,email,password,name){
  const [User]=await db.query(escape`
    Insert into users(email,password,name) values(${email},${password},${name})
  `);
  return User;
}
async function findUser(db,email){
  const [User]=await db.query(escape`
    SELECT id,email,password from users where email=${email}
  `);
  return User;
}
module.exports = async (req, res) => {
  if (req.method === 'POST') {
    console.log(req.body);
    console.log(Settings);

    const fEmail=req.body.email;
    const fPassword=req.body.password;
    const fName=req.body.name;
    try {

        let UserDB=await findUser(db,fEmail);
        UserDB=(UserDB ) ? JSON.parse(JSON.stringify(UserDB)) : null;
        if(UserDB && UserDB.email){
          console.log('------  email exists ----');
          console.log(UserDB);
          res.status(403).json({
            error:'Email already exists'
          });
          return;
        }else{
          bcrypt.genSalt(Settings.saltRounds, function(err, salt) {
            bcrypt.hash(fPassword, salt, function(err2, hash) {
                
              const hashUser=hash;
              console.log('hasUser',hashUser);
      
              createUser(db,fEmail,hashUser,fName);
              
              // try{
              //   createUser(db,fEmail,fPassword,fEmail);
              // }catch(e){
              //   console.log('error');
              //   console.log(e);
              // }

            });
        });
          res.status(200).json({})
        }
        
    } catch (error) {
              
    }
  } else {
    // Handle any other HTTP method
    res.statusCode = 401;
    res.end();
  }
  

}
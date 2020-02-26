const db = require('../../lib/db')
const escape = require('sql-template-strings')
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

async function findUser(db,email){
  const [User]=await db.query(escape`
    SELECT id,email,password from users where email=${email}
  `);
  return User;
}
module.exports = async (req, res) => {
  if (req.method === 'POST') {
    console.log(req.body);

    const femail=req.body.email;
    const fPassword=req.body.password;
    let UserDB=await findUser(db,femail);
    UserDB=(UserDB ) ? JSON.parse(JSON.stringify(UserDB)) : null;
    if(UserDB && UserDB.email){
      console.log('------  email exists ----');
      console.log(UserDB);
      res.status(403).json({
        error:'Email already exists'
      });
      return;
    }else{
      
      res.status(200).json({})
    }
 
  } else {
    // Handle any other HTTP method
    res.statusCode = 401;
    res.end();
  }

}
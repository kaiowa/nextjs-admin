const db = require('../../lib/db')
const escape = require('sql-template-strings')
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

async function findUser(db,email){
  let userEmail=email;
  const [User]=await db.query(escape`
    SELECT id,email,password from users where email=${email}
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
      console.log('------El usuariodexiste----');
      console.log(UserDB);
      console.log('------------------------');
      let samePass=await bcrypt.compare(fPassword, UserDB.password);
      if(!samePass){
        res.status(404).json({
          error:'User not Found'
        });
        return;
      }else{
        //jwt.sign del token


      }
    }
    // const [profiles] = await db.query(escape`
    //  SELECT *
    //  FROM profiles limit 20`)
    //res.status(200).json({ UserDB });
  } else {
    // Handle any other HTTP method
    res.statusCode = 401;
    res.end();
  }

}
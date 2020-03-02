const db = require('../../lib/db')
const escape = require('sql-template-strings')

module.exports = async (req, res) => {
  let page = 1
  const limit = 10;
  if (page < 1) page = 1
  const profiles = await db.query(escape`
  SELECT *
  FROM profiles
  ORDER BY id
  LIMIT ${(page - 1) * limit}, ${limit}`)
  res.status(200).json( profiles )
}
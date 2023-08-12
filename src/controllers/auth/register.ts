import express, { Request, Response } from 'express'
import { UserRegisterParam } from '../../interfaces/UserRegisterParam'
import UtilDatabase from '../../utils/UtilDatabase'

const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10
const db = new UtilDatabase()

router.post('/', (req: Request, res: Response) => {
  const idLength = 10
  const idSource = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let id = ''
  for (let i = 0; i < idLength; i++)
    id += idSource[Math.floor(Math.random() * idSource.length)]
  const param: UserRegisterParam = req.body
  const hashedPassword = bcrypt
    .hashSync(param.password, saltRounds)
    .replace('/', '')
  return db.getDbConnection().then((connection) => {
    const result = connection.query(
      `INSERT INTO users VALUES ("${id}", "${param.name}", "${param.email}", "${hashedPassword}")`,
      (error: string, result: []) => {
        if (error) {
          res.send({ status: 'error', detail: error })
        } else {
          res.send({ status: 'success' })
        }
      },
    )
    return connection.end()
  })
})

module.exports = router

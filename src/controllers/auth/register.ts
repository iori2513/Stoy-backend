import express, { Request, Response } from 'express'
import { UserRegisterParam } from '~/interfaces/UserRegisterParam'
import UtilDatabase from '~/utils/UtilDatabase'
import bcrypt from 'bcrypt'

const router = express.Router()
const saltRounds = 10
const db = new UtilDatabase()

router.post('/', async (req: Request, res: Response) => {
  const idLength = 10
  const idSource = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let id = ''
  for (let i = 0; i < idLength; i++)
    id += idSource[Math.floor(Math.random() * idSource.length)]
  const param: UserRegisterParam = req.body
  const hashedPassword = bcrypt
    .hashSync(param.password, saltRounds)
    .replace('/', '')
  const connection = await db.getDbConnection()
  await connection.query(
    `INSERT INTO users VALUES ("${id}", "${param.name}", "${param.email}", "${hashedPassword}")`,
    (error: string) => {
      if (error) {
        res.send({ status: 'error', detail: error })
      } else {
        res.send({ status: 'success' })
      }
    }
  )
  return connection.end()
})

module.exports = router

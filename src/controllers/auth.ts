import express, { Request, Response } from 'express'
import { UserRegisterParam } from '@src/interfaces/UserRegisterParam'
import * as bcrypt from 'bcrypt'
import UtilGeneral from '@src/utils/UtilGeneral'
import { User } from '@src/interfaces/User'

const router = express.Router()
const saltRounds = 10

router.post('/register', async (req: Request, res: Response) => {
  const idLength = 20
  const idSource = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let id = ''
  for (let i = 0; i < idLength; i++)
    id += idSource[Math.floor(Math.random() * idSource.length)]
  const param: UserRegisterParam = req.body
  const hashedPassword = bcrypt
    .hashSync(param.password, saltRounds)
    .replace('/', '-')
  const connection = await UtilGeneral.dbConnection()
  await connection.query(
    `INSERT INTO users VALUES ("${id}", "${param.name}", "${param.email}", "${hashedPassword}")`,
    (error: string) => {
      if (error) {
        return UtilGeneral.sendResponseError(res, error)
      } else {
        return UtilGeneral.sendResponseSuccess(res)
      }
    }
  )
  return connection.end()
})

// router.delete('/delete/:id', async (req: Request, res: Response) => {
//   const id = req.params.id
//   const connection = await UtilGeneral.dbConnection()
//   await connection.query(
//     `DELETE FROM users WHERE id = ${id}`,
//     (error: string) => {
//       if (error) {
//         return UtilGeneral.sendResponseError(res, error)
//       } else {
//         return UtilGeneral.sendResponseSuccess(res)
//       }
//     }
//   )
//   return connection.end()
// })

router.post('/login', async (req: Request, res: Response) => {
  const params: { email: string; password: string } = req.body
  const connection = await UtilGeneral.dbConnection()

  const response = await connection.query(
    `SELECT * FROM users WHERE email = '${params.email}'`
  )
  connection.end()
  if (!response || !response.length) {
    return UtilGeneral.sendResponseError(res, 'no user')
  }
  const user: { id: string; name: string; email: string; password: string } =
    response[0]
  const match: boolean = await bcrypt.compare(
    params.password,
    user.password.replace('-', '/')
  )
  if (!match) {
    return UtilGeneral.sendResponseError(res, 'password is incorrect')
  }
  const userData: User = {
    id: user.id,
    name: user.name,
    email: user.email
  }
  const token = await UtilGeneral.generateToken(userData)
  if (!token) {
    return UtilGeneral.sendResponseError(res, 'token作成失敗')
  }
  return UtilGeneral.sendResponseSuccess(res, { token })
})

router.get('/user', async (req: Request, res: Response) => {
  const token: string | null = UtilGeneral.getTokenFromRequest(req)
  if (token === null) {
    return UtilGeneral.sendResponseError(res, 'token error')
  }
  const user = await UtilGeneral.getUserFromToken(token)
  if (!user) {
    return UtilGeneral.sendResponseError(res, '有効なトークンではありません')
  }
  return UtilGeneral.sendResponseSuccess(res, user)
})

module.exports = router

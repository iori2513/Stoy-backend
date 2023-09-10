import { Request, Response } from 'express'
import { User } from '@src/interfaces/User'
import * as mysql from 'promise-mysql'
import UtilConfig from '@src/utils/UtilConfig'
import * as jwt from 'jsonwebtoken'
export default class UtilGeneral {
  public static dbConnection = async () => {
    return mysql.createConnection({
      host: 'localhost',
      user: UtilConfig.dbUsername,
      password: UtilConfig.dbPassword,
      database: UtilConfig.dbName
    })
  }

  public static sendResponseError = (res: Response, errorMessage: string) => {
    return res.send({ status: 'error', detail: errorMessage })
  }

  public static sendResponseSuccess = (res: Response, result?: any) => {
    return res.send({ status: 'success', result: result })
  }

  public static getTokenFromRequest = (req: Request) => {
    const bearToken = req.headers.authorization
    if (!bearToken) {
      return null
    }
    const bearer = bearToken.split(' ')
    if (bearer.length <= 1) {
      return null
    }
    return bearer[1]
  }

  public static generateToken = async (user: User): Promise<string | null> => {
    try {
      const token = jwt.sign(user, UtilConfig.jwtPrivateKey, {
        algorithm: 'RS256',
        expiresIn: '1d'
      })
      return token
    } catch (error) {
      console.log(error)
      return null
    }
  }

  public static getUserFromToken = async (
    token: string
  ): Promise<User | null> => {
    try {
      const result = jwt.verify(token, UtilConfig.jwtPublicKey) as {
        id: string
        name: string
        email: string
      }
      const user: User = {
        id: result.id,
        name: result.name,
        email: result.email
      }
      return user
    } catch (error) {
      console.log(error)
      return null
    }
  }
}

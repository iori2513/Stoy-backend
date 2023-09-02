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

  public static generateToken = (user: User): string | null => {
    let result: string | null = null
    jwt.sign(
      user,
      UtilConfig.jwtPrivateKey,
      {
        algorithm: 'RS256',
        expiresIn: '1d'
      },
      (error, encoded) => {
        if (!error && encoded) {
          result = encoded
        }
      }
    )
    return result
  }

  public static getUserFromToken = (token: string): User | null => {
    let result: User | null = null
    jwt.verify(token, UtilConfig.jwtPublicKey, (error, decoded) => {
      if (!error && decoded) {
        const param: User = decoded as {
          id: string
          email: string
          name: string
        }
        result = { id: param.id, email: param.email, name: param.name }
      }
    })
    return result
  }
}

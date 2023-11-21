import { Request, Response } from 'express'
import { User } from '@src/interfaces/User'
import * as mysql from 'promise-mysql'
import UtilConfig from '@src/utils/UtilConfig'
import * as jwt from 'jsonwebtoken'
import moment from 'moment'
import { RowDataPacket } from 'mysql2'
export default class UtilGeneral {
  public static dbConnection = async () => {
    return mysql.createConnection({
      host: UtilConfig.dbHost,
      user: UtilConfig.dbUsername,
      password: UtilConfig.dbPassword,
      database: UtilConfig.dbName,
      port: UtilConfig.dbPort
    })
  }

  public static sendResponseError = (res: Response, errorMessage: string) => {
    return res.send({ status: 'error', errorMessage: errorMessage })
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

  // DBに保存する際にSQLのDateTime型に合わせるためこれを使用
  public static dbDatetimeString = (): string => {
    return moment().format('YYYY-MM-DD HH:mm:ss')
  }

  public static parseDbData = (val: RowDataPacket): any => {
    Object.entries(val).forEach(([key, value]) => {
      const datetimePattern =
        /\b(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat) [A-Za-z]{3} \d{1,2} \d{4} \d{2}:\d{2}:\d{2} GMT[+-]\d{4} \(.+\)\b/
      if (datetimePattern.test(value) && !isNaN(Date.parse(value))) {
        val[key] = Date.parse(value)
      } else {
        val[key] = value
      }
    })
    return val
  }

  public static saveToDatabase = async (
    table: string,
    data: { [key: string]: any }
  ) => {
    const connection = await this.dbConnection()
    try {
      const result: RowDataPacket = await connection.query(
        `INSERT INTO ${table} SET ?`,
        data
      )
      console.log(`Inserted ${result.affectedRows} row(s) into ${table}`)
    } catch (error) {
      console.error('Error inserting data:', error)
      throw new Error('SQL error, ' + error)
    } finally {
      console.log(111)
      await connection.end()
    }
  }

  public static fetchDbData = async (table: string, conditionStr: string) => {
    const connection = await this.dbConnection()
    let result = []
    try {
      const response: RowDataPacket[] = await connection.query(
        `SELECT * FROM ${table} ${conditionStr}`
      )
      result = response.map(row => this.parseDbData(row))
    } catch (error) {
      console.error('Error inserting data:', error)
      throw new Error('SQL Error, ' + error)
    } finally {
      await connection.end()
    }
    return result
  }
}

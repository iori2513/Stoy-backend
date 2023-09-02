import { config } from 'dotenv'
import * as process from 'process'
import path from 'path'
import fs from 'fs'

config({
  path: path.join(__dirname, '../config/.env'),
  debug: true
})

export default class UtilConfig {
  public static dbPassword = process.env.DB_PASSWORD ?? ''
  public static dbUsername = process.env.DB_USERNAME ?? ''
  public static dbName = process.env.DB_NAME ?? ''

  public static jwtPrivateKey = fs.readFileSync(
    path.join(__dirname, '../config/private_key.pem')
  )
  public static jwtPublicKey = fs.readFileSync(
    path.join(__dirname, '../config/public_key.pem')
  )
}

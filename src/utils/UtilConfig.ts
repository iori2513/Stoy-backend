import { config } from 'dotenv'
import * as process from 'process'
import path from 'path'

if (process.env.STOY_ENV_NAME !== 'prod') {
  config({
    path: path.join(__dirname, '../config/.env'),
    debug: true
  })
}

export default class UtilConfig {
  public static dbPassword = process.env.DB_PASSWORD ?? ''
  public static dbUsername = process.env.DB_USERNAME ?? ''
  public static dbName = process.env.DB_NAME ?? ''
  public static dbPort: number = Number(process.env.DB_PORT)
  public static dbHost: string = process.env.DB_HOST ?? ''

  public static jwtPrivateKey = Buffer.from(
    process.env.JWT_PRIVATE_KEY?.replace(/\\n/g, '\n') ?? ''
  )
  public static jwtPublicKey = Buffer.from(
    process.env.JWT_PUBLIC_KEY?.replace(/\\n/g, '\n') ?? ''
  )
}

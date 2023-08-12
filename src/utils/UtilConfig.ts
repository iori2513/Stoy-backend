import { config } from 'dotenv'
import * as process from 'process'
import path from 'path'

config({
  path: path.join(__dirname, '../config/.env'),
  debug: true,
})

export default class UtilConfig {
  public static dbPassword = process.env.DB_PASSWORD ?? ''
  public static dbUsername = process.env.DB_USERNAME ?? ''
  public static dbName = process.env.DB_NAME ?? ''
}

import * as mysql from 'promise-mysql'
import UtilConfig from './UtilConfig'
export default class UtilDatabase {
  public async getDbConnection() {
    return mysql.createConnection({
      host: 'localhost',
      user: UtilConfig.dbUsername,
      password: UtilConfig.dbPassword,
      database: UtilConfig.dbName,
    })
  }
}

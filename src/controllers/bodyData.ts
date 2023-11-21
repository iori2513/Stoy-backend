import express, { Request, Response } from 'express'
import UtilGeneral from '@src/utils/UtilGeneral'
import { BodyDataAddParam } from '@src/interfaces/BodyDataAddParam'
import { v4 as uuid } from 'uuid'
import { BodyData } from '@src/interfaces/BodyData'

const router = express.Router()

router.post('/add', async (req: Request, res: Response) => {
  const token: string | null = UtilGeneral.getTokenFromRequest(req)
  if (token === null) {
    return UtilGeneral.sendResponseError(res, 'token error')
  }
  const user = await UtilGeneral.getUserFromToken(token)
  if (!user) {
    return UtilGeneral.sendResponseError(res, 'no user')
  }
  const id = uuid()
  const param: BodyDataAddParam = req.body
  const currentDateTime = UtilGeneral.dbDatetimeString()
  return UtilGeneral.saveToDatabase('bodyData', {
    ...param,
    id: id,
    userId: user.id,
    createDate: currentDateTime
  })
    .catch(error => {
      return UtilGeneral.sendResponseError(res, error.message)
    })
    .then(() => {
      return UtilGeneral.sendResponseSuccess(res, { docId: id })
    })
})

router.get('/fetch', async (req: Request, res: Response) => {
  const token: string | null = UtilGeneral.getTokenFromRequest(req)
  if (token === null) {
    return UtilGeneral.sendResponseError(res, 'token error')
  }
  const user = await UtilGeneral.getUserFromToken(token)
  if (!user) {
    return UtilGeneral.sendResponseError(res, 'no user')
  }
  const fetchedDataList: BodyData[] = await UtilGeneral.fetchDbData(
    'bodyData',
    `where userId = "${user.id}"`
  )
  return UtilGeneral.sendResponseSuccess(res, { dataList: fetchedDataList })
})

module.exports = router

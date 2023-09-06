import express from 'express'
import type { Express, Request, Response } from 'express'
import UtilConfig from '@src/utils/UtilConfig'

const app: Express = express()
const port = UtilConfig.portNumber || 3444

app.use(express.json())
const paths: string[] = ['/auth']

for (const path of paths) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  app.use(path, require(`./controllers${path}.ts`))
}

app.get('/', (req: Request, res: Response) => {
  return res.send('no path')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

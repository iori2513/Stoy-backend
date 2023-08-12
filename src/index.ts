import express from 'express'
import type { Express, Request, Response } from 'express'

const app: Express = express()
const port = 3002

app.use(express.json())
const paths: string[] = ['/auth/register']

for (const path of paths) {
  app.use(path, require(`./controllers${path}.ts`))
}

app.get('/', (req: Request, res: Response) => {
  return res.send('no path')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

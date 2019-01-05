/** This file is intentionally written as procedural since the app's scope is too small,
 * there's no extensive error handling and error message decoder whatsoever.
 */

const express = require("express")
const app = express()
const axios = require("axios")
const bodyParser = require("body-parser")
const path = require("path")
const inspect = require("util").inspect
const circularjson = require("circular-json")
const queryString = require("query-string")
const cors = require("cors")

require("dotenv").config({ path: path.resolve(__dirname, "./.env") })

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/** For the sake of not breaking the app, we're going to return nothing when an error happens
 *  endpoints are assumed to always work. Could do better here though.
 */

export const errorHandler = fn => (req, res, next) =>
  fn(req, res, next).catch(next)

const getTokenFromCode = async code => {
  const response = await axios.post(process.env.GITHUB_GET_TOKEN_ENDPOINT, {
    client_id: process.env.GITHUB_APPID,
    client_secret: process.env.GITHUB_APPSECRET,
    code
  })

  const data = queryString.parse(response.data)
  return data.access_token
}

const getUserCredentials = async access_token => {
  const response = await axios.get(`${process.env.GITHUB_API_BASE}/user`, {
    headers: {
      Authorization: "bearer " + access_token
    }
  })
  return response.data
}

app.get('/', async (req, res, next) => {
  if(req.query.)
  axios.post('/login/tockentouser', { req.quer })
})

app.post(
  "/login/tokentouser",
  errorHandler(async (req, res) => {
    if (req.body.token) {
      const user = await getUserCredentials(req.body.token)
      res.json({ ...user, access_token: req.body.token })
      res.status(200)
    } else {
      res.end()
    }
  })
)

app.get(
  "/login",
  errorHandler(async (req, res) => {
    if (req.query.code) {
      const token = await getTokenFromCode(req.query.code)
      const user = await getUserCredentials(token)
      res.json({ ...user, access_token: token })
      res.status(200)
    } else {
      res.end()
    }
  })
)

app.listen(process.env.PORT, () =>
  console.log(`Express is running at port: ${process.env.PORT}`)
)

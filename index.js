/** This file is intentionally written as procedural since the app's scope is too small,
 * there's no error handling whatsoever.
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

const GITHUB_GET_TOKEN_ENDPOINT = "https://github.com/login/oauth/access_token"
const GITHUB_API_BASE = "https://api.github.com"

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post("/login", async (req, res) => {
  if (req.body.code) {
    try {
      const response = await axios.post(GITHUB_GET_TOKEN_ENDPOINT, {
        client_id: process.env.GITHUB_APPID,
        client_secret: process.env.GITHUB_APPSECRET,
        code: req.body.code
      })

      const data = queryString.parse(response.data)

      const user = await axios.get(`${GITHUB_API_BASE}/user`, {
        headers: {
          Authorization: "Bearer " + data.access_token
        }
      })

      res.json({ user: user.data })
    } catch (err) {
      console.log(err)
    }
  }
  res.end()
})

app.listen(process.env.PORT, () =>
  console.log(`Express is running at port: ${process.env.PORT}`)
)

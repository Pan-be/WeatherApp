import express, { json } from "express"
import https from "https"
import "dotenv/config"
import path from "path"
import { fileURLToPath } from "url"
import bodyParser from "body-parser"
const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const app = express()
const apiKey = process.env.WEATHER_ID

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/index.html`)
})

app.post("/", (req, res) => {
	const query = req.body.cityName
	const unit = "metric"

	const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`

	https.get(url, (response) => {
		response.on("data", (data) => {
			const weatherData = JSON.parse(data)
			const temp = weatherData.main.temp
			const desc = weatherData.weather[0].description
			const iconNum = weatherData.weather[0].icon
			const iconURL = `https://openweathermap.org/img/wn/${iconNum}@2x.png`

			res.send(
				`<div><h1>The temperature in ${query} is ${temp} degrees Celcius</h1>
			<p>The weather is currently ${desc}</p>
			<img src="${iconURL}">
			</div>`
			)
		})
	})
})

app.listen(3000, () => console.log("server is running on port 3000."))

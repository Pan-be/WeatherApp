import express, { json } from "express"
import https from "https"
import "dotenv/config"

const app = express()
const apiKey = process.env.WEATHER_ID

app.get("/", (req, res) => {
	const url = `https://api.openweathermap.org/data/2.5/weather?q=Bielsko-Biala&appid=${apiKey}&units=metric`

	https.get(url, (response) => {
		console.log(response.statusCode)
		response.on("data", (data) => {
			const weatherData = JSON.parse(data)
			const temp = weatherData.main.temp
			const desc = weatherData.weather[0].description
			const iconNum = weatherData.weather[0].icon
			const iconURL = `https://openweathermap.org/img/wn/${iconNum}@2x.png`
			// console.log(iconNum)
			res.send(
				`<div><h1>The temperature in Bielsko-Biała is ${temp} degrees Celcius</h1>
				<p>The weather is currently ${desc}</p>
				<img src="${iconURL}">
				</div>`
			)
		})
	})
})

app.listen(3000, () => console.log("server is running on port 3000."))

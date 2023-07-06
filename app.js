import express from "express"
import https from "https"
import "dotenv/config"

const app = express()
const apiKey = process.env.WEATHER_ID

app.get("/", (req, res) => {
	const url = `https://api.openweathermap.org/data/2.5/weather?q=Bielsko-Biala&appid=${apiKey}&units=metric`

	https.get(url, (response) => console.log(response.statusCode))
	res.send("server is running")
})

app.listen(3000, () => console.log("server is running on port 3000."))

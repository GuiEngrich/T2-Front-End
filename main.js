const axios = require("axios");
const appid = "86be1e183443fdbd22398b87ba0eae4a";
const q = "Belzec";
const cnt = "1";
const countryCode = 48;
const urlCoordenada = `http://api.openweathermap.org/geo/1.0/direct?q=${q},${countryCode}&limit=${cnt}&appid=${appid}`;

async function getCoordenates(url) {
	try {
		const { data } = await axios.get(url);
		console.log(
			`${`Latitude de ` + q + ` é ` + data[0].lat} ${
				`e longitude é ` + data[0].lon
			}.`
		);
		return { lat: data[0].lat, lon: data[0].lon };
	} catch (error) {
		throw new Error(error);
	}
}

async function getWeather(lat, lon) {
	try {
		const { data } = await axios.get(
			`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}`
		);
		const feels_like = data.main.feels_like - 273.15;
		const description = data.weather[0].description;
		console.log(
			`sensação térmica é de: ${feels_like.toFixed(2)} graus Celsius e a descrição é: ${description}`
		);
	} catch (error) {
		throw new Error(error);
	}
}

async function main() {
	const { lat, lon } = await getCoordenates(urlCoordenada);
	await getWeather(lat, lon);
}

main();
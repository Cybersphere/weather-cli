#!/usr/bin/env node
import {getArgs} from './helpers/args.js'
import { getIcon, getWeather } from './services/api.service.js';
import { printHelp, printError, printSuccess, printWeather } from './services/log.service.js';
import { saveKeyValue } from './services/storage.service.js';

const saveToken = async (token) => {
	if (!token.length) {
		printError('Не передан token');
		return
	}
	try {
		await saveKeyValue('token', token)
		printSuccess('Токен сохранен')
	} catch (e) {
		printError(e.message)
	}
}

const saveCity = async (city) => {
	if (!city.length) {
		printError ('Не передан город')
		return
	}

	try {
		await saveKeyValue('city', city)
		printSuccess('Город сохранен')
	} catch (e) {
		printError(e.message)
	}
}

const getForecast = async () => {
 
	try {
	const weather =  await getWeather();
	const icon = getIcon(weather.weather[0].icon)
	printWeather(weather, icon)
	} catch (e) {
		if (e?.response?.status == 404) {
			printError('Неверно указан город')	
		} else if (e?.response?.status == 401) {
			printError('Неверно указан токен')
		} else	{
			printError(e.message);
		}
	}
}

const initCLI = () => {
	const args = getArgs(process.argv);

	
	if (args.h) {
		printHelp();
	}

	if (args.s) {
		return saveCity(args.s)
	}

	if (args.t) {
		return saveToken(args.t)
	}

	return getForecast();
};

initCLI();
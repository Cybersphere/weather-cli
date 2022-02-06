#!/usr/bin/env node
import {getArgs} from './helpers/args.js'
import { getWeather } from './services/api.service.js';
import { printHelp, printError, printSuccess } from './services/log.service.js';
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
const initCLI = () => {
	const args = getArgs(process.argv);
	
	if (args.h) {
		printHelp();
	}

	if (args.s) {
		//Сохранить город
	}

	if (args.t) {
		return saveToken(args.t)
	}

	getWeather('moscow')
};

initCLI();
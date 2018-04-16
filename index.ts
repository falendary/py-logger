import * as express from 'express';
import * as bodyParser from 'body-parser';

var app = express();
app.use(bodyParser.json())

import { createLogger, format, transports } from 'winston';
const { combine, timestamp, json } = format;

import * as fs from 'fs'

const cwd = process.cwd()
const logPath = cwd + '/logs'

console.log('logPath', logPath)

const port = 8080;

const logger = createLogger({
	level: 'info',
	format: combine(
		timestamp(),
		json()
	),
	transports: [
		new transports.Console({
			colorize: true
		}),
		new transports.File({filename: logPath + '/error.log', level: 'error'}),
		new transports.File({filename: logPath + '/info.log', level: 'info'}),
		new transports.File({filename: logPath + '/combined.log', maxsize: 2000000})
	]
})

app.get('/', function(req, res){

	const path = logPath + '/combined.log'

		fs.readFile(path, 'utf8', function(err, data) {
			if (err) res.send(err)
			res.send(data)
		})

})

app.post('/log', function(req, res){

	console.log(req.body.message)

	switch(req.body.type) {

		case 'info':
			logger.info(req.body.message)
			break;
		case 'error':
			logger.error(req.body.message)
			break;
		default:
			logger.info(req.body.message)
			break;

	}

	res.send('ok')

})

app.listen(port, function () {
  console.log('server started at', port);
});
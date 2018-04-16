import requests
import json

class Pylogger():

	@staticmethod
	def info(message):

		data = json.dumps({'message': message, 'type': 'info'})
		headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}

		try:

			r = requests.post("http://206.189.63.221/log", data=data, headers=headers)

			return {'info': 'Ok'}

		except requests.exceptions.Timeout:
		    return {'error': 'Server is down'}
		except requests.exceptions.RequestException as e:
			return {'error': 'Something went wrong'}

	@staticmethod
	def error(message):

		data = json.dumps({'message': message, 'type': 'error'})
		headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}

		try:

			r = requests.post("http://206.189.63.221/log", data=data, headers=headers)

			return {'info': 'Ok'}

		except requests.exceptions.Timeout:
		    return {'error': 'Server is down'}
		except requests.exceptions.RequestException as e:
			return {'error': 'Something went wrong'}
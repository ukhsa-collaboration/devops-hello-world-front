from flask import Flask, render_template
import requests
import os
import logging


app = Flask(__name__)
app.logger.setLevel(logging.INFO)

api = os.environ['API_URL']

@app.route('/')
def index():
    try:
        response = requests.get(f'{api}/api/hello')
        data = response.json()
        message = data.get('message', 'Hello, World!')
    except Exception as e:
        message = 'Hello, World!'
        app.logger.warn(f"Exception when trying to contact API server: {e}")
    return render_template('index.html', message=message)

if __name__ == '__main__':
    app.run(host='0.0.0.0')

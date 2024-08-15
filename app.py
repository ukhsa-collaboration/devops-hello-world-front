from flask import Flask, render_template
import requests
import os
app = Flask(__name__)

api = os.environ['API_URL']

@app.route('/')
def index():
    try:
        response = requests.get(f'{api}/api/hello')
        data = response.json()
        message = data.get('message', 'Hello, World!')
    except:
        message = 'Hello, World!'
    return render_template('index.html', message=message)

if __name__ == '__main__':
    app.run(host='0.0.0.0')

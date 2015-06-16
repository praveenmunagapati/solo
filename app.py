from flask import Flask, jsonify
from flask import request
from flask import render_template
import json
# from forms.QueryForm import CleverbotForm
from libs import cleverbot
app = Flask(__name__, static_url_path='/static');

cleverbot_client = cleverbot.Cleverbot()
answers = []

@app.route('/')
def index():
  return render_template('index.html') 

# @csrf.exempt
@app.route('/chat', methods=["POST"])
def cleverbot():
  question = str(request.form['query'])
  answer = cleverbot_client.ask(question)
  answers.append(answer)
  print(question)
  print(answer)
  return json.dumps({'status': 'OK', 'message': answer})


if __name__ == '__main__':
  app.run(debug=True)

from flask import Flask
from flask import request
from flask import render_template
# from forms.QueryForm import CleverbotForm
from libs import cleverbot
app = Flask(__name__, static_url_path='/static');

cleverbot_client = cleverbot.Cleverbot()

@app.route('/')
def index():
  return render_template('index.html') 

@app.route('/chat', methods=["GET", "POST"])
def cleverbot():
  if request.method == 'POST':
    question = request.form['query']
    answer = cleverbot_client.ask(question);
    return answer
  else:
    return 'Not much here champ'

if __name__ == '__main__':
  app.run(debug=True)

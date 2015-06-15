from flask import Flask, jsonify
from flask import request
from flask import render_template
# from forms.QueryForm import CleverbotForm
from libs import cleverbot
app = Flask(__name__, static_url_path='/static');

cleverbot_client = cleverbot.Cleverbot()
answers = []

@app.route('/')
def index():
  return render_template('index.html') 

# @csrf.exempt
@app.route('/chat', methods=["GET", "POST"])
def cleverbot():
  if request.method == 'POST':
    question = request.args.get('question', type=str)
    print(question)
    answer = cleverbot_client.ask(question);
    answers.append(answer)
    return jsonify(message=str(answer))
    # return jsonify(message=str(answer))
  else:
    return jsonify(messages=str(answers))

if __name__ == '__main__':
  app.run(debug=True)

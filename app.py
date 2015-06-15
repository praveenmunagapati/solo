from flask import Flask
from flask import request
from flask import render_template
# from forms.QueryForm import CleverbotForm
app = Flask(__name__, static_url_path='/static');

@app.route('/')
def index():
  return render_template('index.html') 

@app.route('/chat', methods=["GET", "POST"])
def cleverbot():
  if request.method == 'POST':
    return 'ayyyyyy'

if __name__ == '__main__':
  app.run(debug=True)

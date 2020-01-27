from flask import Flask, render_template, request, redirect, url_for
import sys
# import sass

app = Flask(__name__)

data = []

@app.route('/')
def home():
  return render_template('home.html')

@app.route('/getMap', methods=['POST'])
def getMap():
  data = request.form['data']
  print(data, file=sys.stderr)
  return redirect(url_for('map'))

@app.route('/map')
def map():
  print(data, file=sys.stderr)
  return render_template('map.html', mapData = data)
  



if __name__ == '__main__':
  app.run(host='127.0.0.1',port=8000,debug=True)
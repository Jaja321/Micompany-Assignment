import csv
from flask import Flask, jsonify, send_from_directory
app = Flask(__name__, static_url_path='/src')

@app.route("/")
def index():
    return send_from_directory('src', 'index.html')
    
@app.route("/data")
def getChurnData():
    data=[]
    with open('churn_case_data.csv') as csvfile:
        reader=csv.DictReader(csvfile, delimiter=';')
        for row in reader:
            data.append(row)
    return jsonify(data)
    
if __name__ == '__main__':
    app.run()
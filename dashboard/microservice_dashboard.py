from flask import Flask, render_template, jsonify
import psycopg2
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)


@app.route('/')
def start():
    return render_template('page.html')

# check if application is running
@app.route("/api/check-status", methods=['GET'])
def check_status():
    return jsonify({"status": "success"})



# Connect to postgres sql database
def database_connection(database, user, password, host, port):
    conn = psycopg2.connect(database=database, user=user,
                            password=password, host=host, port=port)
    return conn.closed


def check_status(id):
    database = os.getenv('DATABASE'+id)
    user = os.getenv('USER'+id)
    password = os.getenv('PASSWORD'+id)
    host = os.getenv('HOST'+id)
    port = os.getenv('PORT'+id)
    status = False
    try:
        if database_connection(database, user, password, host, port) == 0:
                status = True
    except:
        status = False
    return status


@app.route("/status<id>", methods=['GET', 'POST'])
def test_microservices_status(id):
    if not check_status(id):
        return jsonify({"status":"fail"})
    return jsonify({"status":"success"})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5555,debug=True)

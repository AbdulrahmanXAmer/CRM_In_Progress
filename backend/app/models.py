import psycopg2
from psycopg2 import sql
from flask import current_app as app

def create_connection():
    return psycopg2.connect(
        dbname=app.config['DB_NAME'],
        user=app.config['DB_USER'],
        password=app.config['DB_PASSWORD'],
        host=app.config['DB_HOST']
    )

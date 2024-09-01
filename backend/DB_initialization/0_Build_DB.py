import psycopg2
from psycopg2 import sql
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Connection parameters loaded from environment variables
DB_NAME = os.getenv("DB_NAME", "postgres")  # Default DB to connect
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
CRM_DB_NAME = os.getenv("CRM_DB_NAME")

def create_connection(db_name):
    return psycopg2.connect(
        dbname=db_name,
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST
    )

def drop_database(connection, db_name):
    connection.autocommit = True
    with connection.cursor() as cursor:
        cursor.execute(sql.SQL("DROP DATABASE IF EXISTS {};").format(sql.Identifier(db_name)))
    print(f"Database {db_name} dropped.")

def create_database(connection, db_name):
    connection.autocommit = True
    with connection.cursor() as cursor:
        cursor.execute(sql.SQL("CREATE DATABASE {};").format(sql.Identifier(db_name)))
    print(f"Database {db_name} created.")

if __name__ == "__main__":
    connection = None
    try:
        # Connect to the default database
        connection = create_connection(DB_NAME)

        # Drop the crm database if it exists
        drop_database(connection, CRM_DB_NAME)

        # Create a new crm database
        create_database(connection, CRM_DB_NAME)

    except Exception as e:
        print(f"Error: {e}")
    finally:
        if connection:
            connection.close()

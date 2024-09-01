import psycopg2
from psycopg2 import sql
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Connection parameters loaded from environment variables
DB_NAME = os.getenv("CRM_DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")

def create_connection():
    return psycopg2.connect(
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST
    )

def create_users_table(connection):
    with connection.cursor() as cursor:
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                phone_number VARCHAR(20) UNIQUE
            );
        """)
        connection.commit()
    print("Users table created successfully.")

if __name__ == "__main__":
    try:
        # Connect to the CRM database
        connection = create_connection()

        # Create the users table
        create_users_table(connection)

    except Exception as e:
        print(f"Error: {e}")
    finally:
        if connection:
            connection.close()

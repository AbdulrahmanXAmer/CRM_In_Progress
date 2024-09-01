import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    DB_NAME = os.getenv("CRM_DB_NAME")
    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    DB_HOST = os.getenv("DB_HOST")
    SECRET_KEY = os.environ.get('SECRET_KEY')  
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') 
  








# Project Setup Guide

## React Application Setup

### Prerequisites

Before you start, make sure you have the following installed on your machine:

- Node.js (v14.x or later)
- npm (v6.x or later) or yarn (v1.x or later)
- Git

### Steps to Clone and Run the UI

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/your-react-repo.git
   cd your-react-repo
   ```

2. **Install Dependencies:**

    If you're using npm:

    ```bash

    npm install
    ```
    If you're using yarn:

    ```bash 
    yarn install
    ```

3. **Start the Development Server**

    If you're using npm:

    ``` bash
    npm start
    ```

    If you're using yarn:

    ```bash
    yarn start
    ```

#### *The development server should now be running, and you can view your React application by navigating to http://localhost:3000 in your browser.*

***

# Building the React Application

## To build the application for production

1. *If you're using npm:*

```bash
npm run build
```

2. *If you're using yarn*
```bash 
yarn build
```

#### *This will create a build/ directory with your production files, which can then deploy to aws with goal to dockerize*

***


# Flask Application Setup

## Prerequisites

Ensure you have the following installed:

- Python 3.7 or later
- pip (Python package installer)
- Virtualenv (optional but recommended)

## Steps to Clone and Set Up the Flask Application

### 1. Clone the Repository:

```bash
git clone https://github.com/yourusername/your-flask-repo.git
cd your-flask-repo
```

### Create a Virtual Environment:

To keep dependencies isolated, it's recommended to use a virtual environment.

```bash
python3 -m venv crm_env
```

### Activate the Virtual Environment:

    On macOS/Linux:

    ```bash
    python3 -m venv crm_env
    ```

    On Windows:

    ```bash 
    crm_env\Scripts\activate 
    ```

### Install Dependencies:

With the virtual environment activated, install the necessary dependencies from requirements.txt:


```bash
 pip install -r requirements.txt
 ```

### Set Up Environment Variables:

Create a .env file in the root directory and add any necessary environment variables. An example .env might look like this:

```makefile

FLASK_APP=app
FLASK_ENV=development
SECRET_KEY=your_secret_key

```

### Initialize the Database:

Install Posgres if you havent already 

1. MacOs uses HomeBrew:
    ```bash 
    brew install postgressql
    ```
    After installation, you can start PostgreSQL using:
    ```bash 
    brew services start postgresql
    ```
    To exit 
    ```bash 
    brew services stop postgressql
    ```

2. Windows
    To install PostgreSQL on Windows:

    - Visit the official PostgreSQL download page: https://www.postgresql.org/download/windows/
    - Download the installer and run it.
    - Follow the installation steps, making sure to remember the port number, username, and password that you set during the installation.

    Once installed, you can start and stop the PostgreSQL service using the following commands in the Command Prompt (run as Administrator):
    ```bash 
    net start postgresql-x64-14
    ```
    To stop the service:
    ```bash 
    net stop postgresql-x64-14
    ```
*(Note: Replace 14 with your installed PostgreSQL version number.)*


### Initialize the Database with DB Initialization Scripts

In the backend, there are DB initialization scripts that you need to run sequentially to set up the database properly.

1. **Run Script 0**: 

   Use the following command to run the first script:

    ```bash
    python3 0_Build_DB.py 
        python3 1_user_table.py
    ...
    ...
    ...
    ```
###### Continue to run any additional scripts in the same manner, ensuring that each script is executed in the correct order.

### Run the Flask Application:

In directory with run.py , run:

```python3 run.py```


*The Flask application should now be running at http://127.0.0.1:5000/.*

## Blueprint (auth_bp, main_bp)
### Overview
#### The auth_bp blueprint is responsible for handling all authentication-related routes in the Flask application. Note this adds  /auth before a route so if it is /login and we wrap in this bp then it becomes /auth/login.  This includes:

1. User login (/auth/login)
    Explanation:
    /auth/login - This route allows an existing user to log in by providing their email and password. On successful authentication, a JWT access token is generated and returned to the user.

#### main_bp is the generic blueprint where routes are not altered.


### Sample Requests
Here are some example curl commands to test these routes:

1. **Register a New User**
    ```bash

    curl -X POST http://127.0.0.1:5000/create_user -H "Content-Type: application/json" -d '{
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@example.com",
        "password": "securepassword"
    }'
    ```

2. **Log in a User**

    ```bash

    curl -X POST http://127.0.0.1:5000/auth/login -H "Content-Type: application/json" -d '{
        "email": "johndoe@example.com",
        "password": "securepassword"
    }'
    ```

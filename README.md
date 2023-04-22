# WebStack Portfolio Project at ALX.

## Authors:
1. Mesfin Mulugeta
1. Getacher Mitike
## Online Exam Website

### Technolgy Used.
---
1. Django Rest Framework:- Backend framework.
1. ReactJs:- Frontend framework
1. Ubuntu OS

## Installation
**Before** you do any installation or clonning the repo make sure you have installed this app on your machine:-
> MySQL 

> Python3 env, pip

> Nodejs, npm 

* First clone this repository to your local machine.
```
git clone https://github.com/GetacherD/alx-backend-specialization_portfolio.git
```
* After you clone the repo navigate to it.
```
cd alx-backend-specialization_portfolio
```

* Create vertual inviroment to install python packages. Found inside requirement.txt file in the root directory of this repo.

```
python3 -m venv venv
```

* Then activate vertual enviroment before intalling python packages.
```
source /venv/bin/activate
```
* Now you can install python dependencies.
```
pip install -r requirement.txt
```
* Create user and database on your MySQL server, give all previllages for your user's on your database. Put this credentials inside the setting of th backend directory, replace the user name with your username, db with db name, password with your password.
* navigate to backend directory.
```
cd backend
```
* Then you have to migrate the django classes to your MySQL db.
```
python3 manage.py makemigrations
python3 manage.py migrate
```
* When you can reach these steps successfully, now you have backend server ready.
* Lets run backend server.
```
python3 manage.py runserver
```
* The django server runs on `127.0.0.1:800`
* Lets create admin user.
```
python3 manage.py createsuperuser
```
* Enter username integer number, your name, and your Email.
* check the server on [`127.0.0.1:800/admin`](`127.0.0.1:800/admin`).
* Enter your credentials.
* Now you can manage your Backend server.
  * Add another admin.
  * Add user.
  * Add Exam questions.
  * Add jobs.
  * Add Exam candidates.
  * check results of candidates.
  * and more you can do as admin.
### Now lets dive into frontend sections.
* Navigate to frontend directory.
```
cd frontend
```
* Now install all react dependencies.
```
npm install
```
* If you successfully install all dependecies you cand proceedd, if not fix the issues and proceed.
* React runs on [127.0.0.1:3000](127.0.0.1:3000).
* You can check or use frontend pages there.
* On frontend pages there is so many feature.
  * SignUp page
  * Login Page
  * Home Page
  * Result page
  * Exam page

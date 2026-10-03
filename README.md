# 📝 Full-Stack Task Management System

A robust full-stack web application built using Java Spring Boot, React (Vite + Tailwind CSS), and MySQL. 

## 🚀 Tech Stack

* **Backend:** Java 21, Spring Boot 3, Spring Data JPA, Hibernate, Maven
* **Frontend:** React, Vite, Tailwind CSS, Axios
* **Database:** MySQL
* **Testing:** Bruno / cURL

---

## ⚡ Features

* **Full CRUD Operations:** Create, View, Update, and Delete tasks seamlessly.
* **Smart Search:** Real-time task title search powered by Spring Data JPA custom queries.
* **Priority & Status Management:** Dynamic state toggles with backend enum validation.
* **Database Persistence:** Auto-schema mapping via Hibernate ORM.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/tasks` | Fetch all tasks |
| `GET` | `/api/tasks/{id}` | Fetch a task by ID |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/{id}` | Update an existing task |
| `DELETE` | `/api/tasks/{id}` | Delete a task by ID |
| `GET` | `/api/tasks/search?query={keyword}` | Search tasks by title |

---

## 🛠️ How to Run Locally

### 1. Prerequisites
* Java 17/21 installed
* MySQL Server running on `localhost:3306`
* Node.js & npm installed

### 2. Database Setup
Create the MySQL database:
```sql
CREATE DATABASE task_db;

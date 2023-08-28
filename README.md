# MVC with Node.js

This repository is a small playground for learning MVC in Node.js using Typescript, Express, Prisma, and PostgreSQL.

  

## Project context

The end goal is to have an application that allows borrowers to take books out of a library. There are three tables in the database: borrowers, books, and loans. A loan has one book and one borrower, but a borrower can have many loans. I'm trying to keep the scope of the project down right now. In a real world database, I would have a table for users (standard, admin) where an admin could add, edit, and delete books/loans/borrowers and a standard user could only read the data. I would also break the books into multiple tables for genre, author, etc. However, this project is very simple and I would like to just have books, borrowers, and loans.

  

## Goals in this project

  

I would like to learn how MVC works in Node.js. I've never spent a lot of time with MVC and I would really like to understand this architecture because it's commonly used in software everywhere. I also have a fundamental understanding of OOP and would like to take a deeper dive to really understand all of the moving parts.

  

Please let me know of any design issues or bad practice. This is strictly for my learning and part of learning is being told where you're wrong.

  

---

  

### How to run the project

#### Prerequisites:

1. Must have PostgreSQL installed

2. Must have a database called: library

  

#### Create an env file

1. Copy the .env.example file and call it .env.development

2. Put your PostgreSQL connection string in the DATABASE_URL field

3.  *optional* - Add a port in the PORT field. (defaults to 3000 otherwise)

  

#### Install dependencies and migrate

  

1.  ``` npm install ``` to install dependencies

2.  ``` npx prisma migrate dev --name init ``` to create the tables in the database

  

#### Seed the database

1.  ``` npx prisma db seed -- --environment development ``` to seed the database with some values

  

#### Run the project

1.  ``` npm run dev ```

  
  

---

  

### Todo

- Add Docker to streamline building and running

  

---

  

### Issues

- Testing the update service always returns "No book with id "1" was found". The update service is expecting an id and a body to update with. While using mocking with Jest, I'm unable to pass an ID to the update method because the mock doesn't have any data already saved.
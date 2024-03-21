# Library Books User Management

### Project Description

This project is designed to manage user authentication and book management within a library system. It features functionalities such as user authentication using JSON Web Tokens (JWT), book CRUD operations, and additional features like purchasing , borrowing and searching books from the library are included.

## Features

### 1.UserAuthentication:

- Utilizes token-based authentication using JSON Web Tokens (JWT) for secure user access.

### 2.BookManagement:

- Allows admins to perform CRUD operations on books within the library.
- Users can browse and search for available books.

#### AditionalFeatures

- Users can buy or borrow books from the library.
- Each book can be borrowed by one user at a time.
- user returning book to the library functionality also included here.

### 3.GraphQL API:

Implementing GraphQL for efficient and flexible querying, including:

- Fetching data for users, books, and action tables.
- Mutation operations for creating books, users, buying, and borrowing effectively

## Tech Stack

- Node.js: A JavaScript runtime environment for server-side development.
- Express.js: A web application framework for Node.js used for building APIs.
- Sequelize ORM: An Object-Relational Mapping tool for Node.js, used for interacting with databases.
- GraphQL: A query language for APIs that enables more efficient data fetching.
- JSON Web Tokens (JWT): A standard for secure authentication mechanism.
- express-graphql: Middleware for creating GraphQL servers with Express.js.
- bcrypt: A library for encrypting passwords securely.

# Running This Project In Your Local Machine

- Clone the project from git to your local machine by using the folowing comment.
- > git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
- now you have to set the db go to the db connection and change the credentials according to your username , password and dataabase name.

```
                                      npm start
```

- It may throws lots of error dont worry because of you are not install the theird party packages.

```
     npm i express nodemon body_parser jsonwebtoken express-graphql graphql mysql2 bcrypt sequelize
```

- Just copy the above line and run it in your vs code terminal it will download almost all the theird party packages to run this code in your local machine.
- once you download it start the server by running ** npm start **.
- now goto browser run the following url.

```
localhost:3000/graphql
```

- The above link will open up some space to check all the apis, to check the api's follow the following things

# Register User

```
mutation {
  createUser(firstName: "yourname", lastName: "yourlastname", email: "youremail", password: "yourpassword",role:"admin / user") {
   message
  }
}
```

# signIn

```
mutation {
  signIn(email: "youremail", password: "yourpassword") {
   message
  }
}
```

# Add Book

```
mutation {
  addBook( bookName: "bookname", authorName: "authorname" , rentalCostPerDay:cost , bookPrice:price) {
   message
  }
}
```

# Buy Book

```
mutation {
  buyBook( bookId: 5, userId: 1 ) {
    message
  }
}
```

# Borrow Book

```
mutation {
  borrowBook( bookId: 4, userId: 3) {
   message

  }
}
```

# return Book

```
mutation {
  returnBook( bookId: 3, userId: 3) {
    bookName
    authorName
  }
}
```

# search Book

```
query {
  bookSearchByText(searchText : "bookname/authername") {
   bookName
    authorName
    bookPrice
  }
}
```

Project Name: BookChap

# Client / Frontend

### React Router Routes (React App)

| Path             | Component          | Permissions            | Behaviour                                             |
| ---------------- | ------------------ | ---------------------- | ----------------------------------------------------- |
| /login           | LoginPage          | anon only <AnonRoute>  | Login form, navigates to home page after login.       |
| /signup          | SignupPage         | anon only <AnonRoute>  | Signup form, navigates to home page after signup.     |
| /                | HomePage           | public <Route>         | HomePage                                              |
| /books           | BooksPage          | public <Route>         | User and admin can access the books list              |
| /books/:id       | BookDetailsPage    | public <Route>         | User and admin can access the book details            |
| /addBook         | AddBookPage        | admin only <Private>   | Only admin logged in can create new books             |
| /updateBook      | EditBookPage       | admin only <Private>   | Only admin logged in can edit a book                  |
| /active-rentals  | RentalsPage        | user & admin <Private> | users sees his rentals and admin sees all the rentals |
| /user-dashboard  | UserDashboardPage  | <Private>              | User performs actions on account                      |
| /admin-dashboard | AdminDashboardPage | <Private>              | Admin performs actions on account                     |
| /checkout        | checkoutPage       | anon only <AnonRoute>  | Checkout form navigates to user dashboard             |

Components
Pages:

LoginPage

SignupPage

HomePage

BooksPage

BookDetailsPage

AddBookPage

EditBookPage

RentalsPage

UserDashboardPage

AdminDashboardPage

Components:

Navbar

IsAnon

IsPrivate

# Server / Backend

## Routes

### Book Routes

| Method | Route                                | Description                           |
| ------ | ------------------------------------ | ------------------------------------- |
| GET    | /api/books                           | Retrieves all books                   |
| GET    | /api/books/:id                       | Retrieves a specific book by ID       |
| POST   | /api/books                           | Creates a new book                    |
| PUT    | /api/books/:id                       | Updates a specific book by ID         |
| DELETE | /api/books/:id                       | Deletes a specific book by ID         |
| GET    | /api/books/search/isbn/:isbn         | Retrieves a specific book by ISBN     |
| GET    | /api/books/search/category/:category | Retrieves a specific book by category |

### Rental Routes

| Method | Route                   | Description                         |
| ------ | ----------------------- | ----------------------------------- |
| GET    | /api/rentals/active     | Retrieves all rentals for the admin |
| GET    | api/users/:userId/rentals  | Retrieves user's rentals            |
| POST   | /api/rentals            | Rent a New Book                     |
| PUT    | /api/rentals/:id/return | Return a book by the user           |

### User Routes

| Method | Route                     | Description                      |
| ------ | ------------------------- | -------------------------------- |
| GET    | /api/user-dashboard       | Retrieves the user's dashboard   |
| GET    | /api/admin-dashboard      | Retrieves the admin's dashboard  |
| PUT    | /api/user-dashboard-edit  | Updates the user's profile info  |
| PUT    | /api/admin-dashboard-edit | Updates the admin's profile info |

### Auth Routes

| Method | Route       | Description                      |
| ------ | ----------- | -------------------------------- |
| POST   | /api/signup | Creates a new user account       |
| POST   | /api/login  | Authenticates and logs in a user |
| GET    | /api/verify | Verifies and logs in a user      |

### User Model

js
{
name: String,
image: String,
email: String,
password: String,
address: String
}

### Category Model

js
{
name: String;
description: String;
}

### Book Model

js

{
title: String,
author: String,
description: String,
availability: Boolean,
rentedBy: { type: Schema.Types.ObjectId, ref: 'User' },
category: String,
imgUrl: String,
isbn: String,
rating: Number
}

### Rental Model

js

{
book: { type: Schema.Types.ObjectId, ref: 'Book' },
user: { type: Schema.Types.ObjectId, ref: 'user' },
rentalDate: Date,
returnDate: Date
}

# Book Rental Server

## Routes

### Category Routes

| Method | Route               | Description                         |
| ------ | ------------------- | ----------------------------------- |
| GET    | /api/categories     | Retrieves all categories            |
| GET    | /api/categories/:id | Retrieves a specific category by ID |
| POST   | /api/categories     | Creates a new category              |
| PUT    | /api/categories/:id | Updates a specific category by ID   |
| DELETE | /api/categories/:id | Deletes a specific category by ID   |

### Book Routes

| Method | Route                       | Description                           |
| ------ | --------------------------- | ------------------------------------- |
| GET    | /api/books                  | Retrieves all books                   |
| GET    | /api/books/:id              | Retrieves a specific book by ID       |
| POST   | /api/books                  | Creates a new book                    |
| PUT    | /api/books/:id              | Updates a specific book by ID         |
| DELETE | /api/books/:id              | Deletes a specific book by ID         |
| GET    | /api/books/search/:isbn     | Retrieves a specific book by ISBN     |
| GET    | /api/books/search/:category | Retrieves a specific book by category |

### Rental Routes

| Method | Route                   | Description                        |
| ------ | ----------------------- | ---------------------------------- |
| GET    | /api/rentals            | Retrieves all rentals for the user |
| GET    | /api/rentals/:id        | Retrieves a specific rental by ID  |
| POST   | /api/rentals            | Creates a new rental for the user  |
| PUT    | /api/rentals/:id        | Updates a specific rental by ID    |
| DELETE | /api/rentals/:id        | Deletes a specific rental by ID    |
| POST   | /api/rentals/:id/return | Marks a rental as returned         |
| POST   | /api/rentals/:id/extend | Extends the rental period          |

### User Routes

| Method | Route              | Description                  |
| ------ | ------------------ | ---------------------------- |
| GET    | /api/users/profile | Retrieves the user's profile |
| PUT    | /api/users/profile | Updates the user's profile   |
| DELETE | /api/users/profile | Deletes the user's account   |

### Auth Routes

| Method | Route       | Description                      |
| ------ | ----------- | -------------------------------- |
| POST   | /api/signup | Creates a new user account       |
| POST   | /api/login  | Authenticates and logs in a user |
| GET    | /api/verify | Verifies and logs in a user      |

### User Model

js
{
name: String,
image: String,
email: String,
password: String,
address: String
}

### Category Model

js
{
name: String;
description: String;
}

### Category Model

js
{
name: String;
description: String;
}

### Book Model

js
{
title: String,
author: String,
description: String,
availability: Boolean,
rentedBy: { type: Schema.Types.ObjectId, ref: 'User' },
category: { type: Schema.Types.ObjectId, ref: 'Category' },
image: String,
isbn: String,
rating: Number
}

### Rental Model

js
{
book: { type: Schema.Types.ObjectId, ref: 'Book' },
user: { type: Schema.Types.ObjectId, ref: 'user' },
rentalDate: Date,
returnDate: Date
}
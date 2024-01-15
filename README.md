# Blog Sphere

## Introduction

Welcome to the *Blog Sphere* documentation! This document provides an overview of the Blog Sphere app, including its architecture, components, and usage. The app allows users to create blogs, like, comment, and follow other users.

## Project Overview

The Blog Sphere is a web-based Social media application built using Node.js, Express.js, and MongoDB. It provides the following key features:

- User registration and login.
- Blog creation.
- Blog retrieval for authenticated users.
- Blog status (likes, comments, and owner of this blog).
- User details like followers, following, and blogs created.
- Implimented Load balancing using clusters .
- Used queues for non-critical operations to minimize the load on the server in case of large traffic.

## Installation

To run Blog Sphere locally, follow these installation steps:

### Prerequisites

- Node.js and npm installed.
- MongoDB installed and running.

### Installation Steps

1. Clone the project repository.
2. Install project dependencies.
3. Set up environment variables by creating a `.env` file (inside config folder as config).
4. Start the application (**node index.js**).

## Configuration

The app uses environment variables for configuration. Make sure to set the necessary environment variables in the `.env` file for your specific environment.

## Usage

To use the Blog Sphere, follow these steps:

1. Register a new user using the `/user/signup` endpoint.
2. Log in with your registered username and password using the `/user/login` endpoint.
3. Use the provided access token for authenticated requests to perform the necessary features offered by this web service.

## API Endpoints

### User Routes

- **POST /user/signup**: Register a new user with a unique username and hashed password.
- **POST /user/login**: Authenticate a user based on their username and password, providing an access token upon successful login.

### Task Routes

- **GET /post/allposts**: Retrieve all posts from the Post model.
- **POST /post/upload**: Logged-in user can upload a blog as a post.
- **GET /post/getpostbyid**: Authenticated user can get a post details by the postID.
- **GET /post/getallpostsbyuser**: Retrieve all blog posts associated with the authenticated user.
- **GET /post/getallpostsbyotheruser**: Retrieve all blog posts associated with other authenticated users.
- **GET /post/viewpost**: Retrieve post details whose postID is specified in the body.
- **POST /post/like**: Used to like a post.
- **POST /post/comment**: Used to comment on a post.

## Models

### User Model

The user model is defined using Mongoose, a MongoDB object modeling tool for Node.js. It includes the following fields:

- **name**:
  - Type: String
  - Required: true
  - Description: Represents the user's name.

- **username**:
  - Type: String
  - Required: true
  - Description: Represents the user's unique username.

- **password**:
  - Type: String
  - Required: true
  - Description: Represents the hashed password of the user. The actual password is hashed using bcrypt before being stored in the database for security reasons.

- **posts**:
  - Type: Array of ObjectIds
  - Ref: "Post"
  - Description: An array of references to Post documents associated with the user.

- **followers**:
  - Type: Array of ObjectIds
  - Ref: "Follower"
  - Description: An array of references to Follower documents representing users who are followers of the current user.

- **following**:
  - Type: Array of ObjectIds
  - Ref: "Following"
  - Description: An array of references to Following documents representing users whom the current user is following.

### Post Model

The post model is defined using Mongoose, a MongoDB object modeling tool for Node.js. It includes the following fields:

- **title**:
  - Type: String
  - Description: Represents the title of the post.

- **caption**:
  - Type: String
  - Required: true
  - Description: Represents the caption or main content of the post.

- **owner**:
  - Type: ObjectId
  - Ref: "User"
  - Description: Represents the user who owns or authored the post. It is a reference to the "User" model.

- **comments**:
  - Type: Array of Objects
  - Description: An array of objects representing comments on the post. Each comment includes a message and the identity of the user who made the comment.

    - **message**:
      - Type: String
      - Description: The content of the comment.

    - **identity**:
      - Type: ObjectId
      - Ref: "User"
      - Description: Represents the user who made the comment.

- **likes**:
  - Type: Array of ObjectIds
  - Ref: "User"
  - Description: An array of references to users who liked the post.

## Controllers

### User Controller

- `signup`: Register a new user.
- `login`: Authenticate a user and provide an access token.

### Task Controller

- `commentPost`: Takes the user input for the comment and pushes it into the comment queue to create a comment.
- `followUser`: Takes the user input for the follower and pushes it into the follow queue to create a follow operation.
- `getAllPosts`: Retrieve all posts for the authenticated user.
- `getAllPostsbyOtherUsers`: Gets all the posts of other users.
- `getAllPostsByUser`: Gets all the posts by the current user.
- `getPostById`: Retrieve a post by ID.
- `likePost`: Takes the user input for the like and pushes it into the like queue to add or remove a like.
- `UploadPost`: Upload a blog post.
- `ViewPost`: Retrieves information about the post ID.

## Middleware

### Authentication Middleware

- **authenticateToken**: Verify JWT tokens in request headers to authenticate users for protected routes.

## Queues

### `comment queue`:
- The comment queue is responsible for handling tasks related to adding comments to posts.

### `like queue`:
- The like queue is responsible for handling tasks related to adding or removing likes from posts.

### `follow queue`:
- The follow queue is responsible for handling tasks related to user follows.

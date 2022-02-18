<!-- ![CircleCI](https://img.shields.io/circleci/build/github/AmirShaban53/fastfood_backend?label=circleCi&logo=circleci)
![Coveralls](https://img.shields.io/coveralls/github/AmirShaban53/fastfood_backend) -->

# BLOG API

PERN stack blog API.

## Description

This is a restful API desgined to for a BLOG inodrer to be used in online
to create, display and delete blog posts.

## Built With

* [NodeJS](https://nodejs.org/) - Runtime Environment
* [ExpressJs](https://expressjs.com/) - Web Application Framework

## Getting Started


### installation and setup

* download project from github.com/AmirShaban53/blog_API/
* run the following in the terminal
```
npm install
```
   

### Usage

* How to run the program

```
#to start development server
npm run start

#to run unit tests and code coverage
npm run coverage
```

### Setup the following environment variables
* PG_USERNAME
* PG_PASSWORD
* PG_DATABASE
* PG_HOST
* PG_PORT
* JWT_KEY


## Features
* user can view all posts
* user can view an inidividual post
* user can view comments on a post
* user can comment on a post
* user can create an account
* admin can create posts
* admin can delete posts



## Endpoints
| Endpoint  |  Method  |  Task  |
| --- |  --- |  ---  |
| `/posts/`            | `GET`    | `view all posts`  |
| `/posts/`            | `POST`   | `create a new post`  |
| `/posts/:id`         | `GET`    | `view post with the given ID`  |
| `/posts/:id`         | `DELETE` | `delete post with the given ID`  |
| `/posts/:id/comment` | `GET`    | `view all comments of given post ID`  |
| `/posts/:id/comment` | `POST`   | `create a comment of given post ID`  |
| `/auth/signup`       | `POST`   | `create a new user`  |
| `/auth/login`        | `POST`   | `login in existing user`  |


## Credit
created by Amir Budda Shaban




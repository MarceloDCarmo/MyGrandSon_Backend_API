# MyGrandSon Backend API

API to Serve the app MyGrandSon.

## Prerequisites

Node 16.16.0 or above
MySQL 8.0

## Endpoints

##### Swagger (docs)
- **.../doc - GET**

##### Create User
- **.../users - POST**
    >{  
        "username": string,  
	    "password": string  
    }

##### Delete User (authenticate)
- **.../users - DELETE**
    >{  
        "id": string,  
        "password": string  
    }

##### Login
- **.../login - POST**
    >{  
        "username": string,  
	    "password": string  
    }

##### Change Password (authenticate)
- **.../changePassword - POST**
    >{  
        "password": string  
        "newPassword": string  
    }

## Authentication

Endpoints marked with "authenticate" tag need a Bearer Token to be sent in headers.

## Environment variables

To run the project you'll need to create a file named ".env" in the root directory.
Inside the file you must define some variables:
- DATABASE_URL="mysql://username:password@host:port/db-name"
- PORT=port to run aplication
- SALT=number to be used on hash
- SECRET=secret to be used by JWT

## Running on Dev

**Be sure MySQL is running**

We recommend you to use Yarn as package manager:
> npm install yarn -g

Now install all dependencies:
> yarn install

To run the migrations, execute:
> yarn prisma migrate dev

To run server:
> yarn dev
# MyGrandSon Backend API

API to Serve the app MyGrandSon.

## Endpoints

##### Create User
- **.../users - POST**
    >{  
        "username": string,  
	    "password": string  
    }

##### Delete User (authenticate)
- **.../user - DELETE**
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

## Running on Dev

We recommend you to use Yarn as package manager:
> npm install yarn -g

Now install all dependencies:
> yarn install

To run the migrations, execute:
> yarn prisma migrate dev

To run server:
> yarn dev
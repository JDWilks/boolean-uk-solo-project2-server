to run the backend server from the terminal: npm start

to run the seed file: npx prisma db seed

to migrate database: npx prisma migrate dev

to run prisma studio npx prisma studio

> > > > >

# Steps to impliemnt password auth

## Save user with hashed password

## Install bycrypt

'npm i bcrypt'

if using typescript install

'npm i @types/bcrypt

## Create service module

This will allow us to add functionality to the create user model function

## Get the hash function from bcrypt

Remember the fucntion takes 2 arguments

hash(plaintext, saltrounds: number)

## Replace user password with its hashed version

This will return a promise while hashing

## Use this patched **create** function in the user controller

## Create the user with data coming from the body

You can do some validations before saving the user, such as password length

## Login with user credenetials

## Create a new resource called Auth

This includes router / controller / service modules

## Create a log in route

## Create a login user controller function

Here we will handle the errors from the login process

## Create findUserWithValidation function

Here we will handle the possible outcomes of the login process
Throw errors when we have invalid inputs - this is important

## Find the user in the database using a unique identifier other than id

Make sure we have a unique field in our user model

## Use the compare bcrypt function to validate the user credential passwordagainst the saved hashed

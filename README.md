# Web Development Final Project
Final project for the CSCI 3230, the idea is to make blog website for students where students can add comments and respond in chat

The website is made using NodeJs for backend and EJS for templating. 
The site has login functionality, and allows user to Create, Read, Update and Delete blogs. Users can also reply to existing blog posts.

The database part is done using MongoDb and schema is added to the models directory.

The website also makes use of D3 and webservices to show statistics for articles uploaded.

Styling for the site was done using Bootstrap and custom CSS.

Independent Study Google Slide link : 
https://docs.google.com/presentation/d/1u5n47wy67LlsWrwrTHbTdg5CflWe4Cp-VBSQhseo6k4/edit?usp=sharing

| Group Member Name | GitHub Username (GitHub URL)|
| :------------------------:|:--------------------------------------:|
| Qasim Iqbal | [qasim-iqbal](https://github.com/qasim-iqbal) |
| Mayur Bhai | [mayurbhai24](https://github.com/mayurbhai24) |
| Nirojan Arunakirinathan | [NirojanAruna](https://github.com/NirojanAruna) |
| Saffana Ahammed | [saffanaa](https://github.com/saffanaa) |

Steps for running the application
Install the dependencies
### npm install

Run the server
### npm run dev

Usage: To use the application, after launching you will need to register as a new user and then will have to login. Thereby will have to create new posts as no posts are preloaded in the database

Go to localhost:5000 if not already open

#### References
###### https://www.passportjs.org/packages/passport-local
###### https://www.npmjs.com/package/passport-local
###### https://www.npmjs.com/package/bcryptjs

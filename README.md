"# Blog_Api"
This is a project developed in Node.JS, Express.JS, MongoDB, using one of the best typescript ORM prisma.

To get started following are the steps to be followed.

1. add node modules by using npm install command.

2. Create a Database on MongoDB and create a database URL of the following type.

"mongodb+srv://${Database_username}:${Database_password}@cluster0.s2yk7p4.mongodb.net/${Database_name}"
use Database_username as the username of your mongoDB, Database_password as the password of your mongoDB, and Database_name which is the name of database you created.

3. Create an environment variables file called .env, and put the following information in that.

PORT= port you want to use
DATABASE_URL= your database url which you created in step 2
API_URL= your api url, for our case it will be /api/blog
SECRET= A long string which is your secret key to create token.

4. Now run command, "npm run dev", prisma will create the database according to prisma schema, and you can try using the following urls to avail the services.

Login -> POST http://localhost:port/api/blog/login , req.body= {name:string,email:string}
Get blogs -> GET http://localhost:port/api/blog
Add blogs -> POST http://localhost:port/api/blog , req.body={title:string,description:string}, header={'Authorization':'Bearer token'}
Edit blogs -> PUT http://localhost:port/api/blog/blog_id , req.body={title:string,description:string}, header={'Authorization':'Bearer token'}
Delete blogs -> DELETE http://localhost:port/api/blog/blog_id , header={'Authorization':'Bearer token'}

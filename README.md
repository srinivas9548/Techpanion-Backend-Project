### Backend: Node.js with Express.js

1. **Project Setup:**
    - Initialize a new Node.js project using `npm init`.
    - Install necessary packages such as Express.js, Mongoose (for MongoDB), and Sequelize (for SQL).    

2. **Database Setup:**
    - **MongoDB:**
        - Create models and schemas using Mongoose.
        - Define collections for storing form data and action history.
    - **SQL:**
        - Set up Sequelize to define models and relationships.
        - Create tables for storing the same data as in MongoDB.

3. **API Endpoints:**
    - **GET /api/invoice-details:** Fetch invoice details to be displayed.
    - **POST /api/submit-form:** Handle form submission and save data to the database.
    - **GET /api/action-history:** Retrieve action history.

4. **Middleware:**
    - Implement middleware for request validation, authentication (if needed), and error handling.

5. **Database Scripts:**
    - Provide scripts to create necessary tables and collections.
    - Include sample data for testing.

6. **Deploy and Test:**
    - Deploy the backend on a service like Heroku or a VPS.
    - Use Postman or similar tools to test the API endpoints.

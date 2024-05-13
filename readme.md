
To run the project, ensure you have Python3 and pip installed on your machine. Then, execute:

```bash
npm install
```

For MongoDB connection, you can add the connection string in the `server.js` file. 
Alternatively, consider using a `.env` file to manage sensitive information securely.

To initiate the server, use:

```bash
npm run dev
```

For Docker setup, follow these steps:

```bash
# Build the Docker image
docker build . -t kolin/hotel-booking-backend:v1

# Run the Docker image
docker run -d -p 5001:5000 kolin/hotel-booking-backend:v1
```

For API documentation, access:

- Swagger documentation for the Node server without Docker: [http://localhost:5000/api-docs/](http://localhost:5000/api-docs/)
- Swagger documentation for the Docker server: [http://localhost:5001/api-docs/](http://localhost:5001/api-docs/)

For the Postman documentation, access:

- [Postman Collection](https://documenter.getpostman.com/view/27392607/2sA3JNaLLf)

For the live server, access:

- [Hotel Booking System Backend](https://hotel-booking-system-backend.vercel.app/)

Here are the demo login credentials for the live server:

For admin:
```
{
    "userId": "admin",
    "password": "admin1245"
}
```

For normal user:
```
{
    "userId": "user",
    "password": "user12345"
}
```

for running the project you need to have python3 and pip installed on your machine

```bash
npm install
```

to start the server

```bash
npm run dev
```

for setup docker

```bash
docker build . -t  kolin/hotel-bookin-backend:v1

run docker image
docker run -d -p 5001:5000 kolin/hotel-bookin-backend:v1
```

swagger documentation visit
[for node server without docker](https://http://localhost:5000/api-docs/)
[for docker server](http://localhost:5001/api-docs/)

for postman collection visit
[postman collection](https://documenter.getpostman.com/view/27392607/2sA3JNaLLf)

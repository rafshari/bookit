Bookit
A Hotel and Room Booking Application built with nextjs and deployed using vercel.com.
![image](https://user-images.githubusercontent.com/102416116/225724630-73e7235e-1573-4d37-b709-38384cc17a6a.png)


Warning
This is a work in progress and some packages may be due an upgrade.

Clone the repository

git clone https://github.com/rafshari/bookit.git
Mongo DB
You need an instance of Mongo database. Mongo Atlas Free Tier is a good start.
You can also run one in Docker. A Docker Compose file running all the services in one go is provided. You need Docker and Docker Compose installed on your machine.
Running server application
cd backend && npm install && npm start
Running client application
cd frontend && npm install && npm start
Running in Docker
You need Docker and Docker Compose installed on your machine.
In root folder of the repository:

docker compose up -d or 
docker-compose up -d (if you use an older version of Docker Compose)
Deploying to Kubernetes Cluster
To come soon...

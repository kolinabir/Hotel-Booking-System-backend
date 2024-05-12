import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';
import swaggerDocs from './app/utils/swagger';
import express from 'express';

let server: Server;
const apps = express();
async function main() {
  try {
    await mongoose.connect(
      'mongodb+srv://blog:O9Nqn7VLHrO4Z0vk@cluster0.z0ckcxg.mongodb.net/hotel-manage?retryWrites=true&w=majority&appName=Cluster0',  //just for testing
    );
    server = app.listen(config.port, () => {
      swaggerDocs(apps);
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection', (err: any) => {
  console.log(
    `unHandledRejection is detected 🔥🔥🔥  , shutting down ... server`,
  );
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', (err: any) => {
  console.log(
    `unCaughtException is detected 🔥🔥🔥  , shutting down ... server`,
  );
  process.exit(1);
});

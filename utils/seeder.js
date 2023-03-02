// import mongoose from "mongoose";
// import Room from "models/room";
// import { dbConnect } from "config/dbConnect";
// import rooms from "data/rooms.json";

const Room = require("../models/room");
const mongoose = require("mongoose");
const rooms = require("../data/rooms.json");

mongoose
  .connect(
    "mongodb+srv://roozbeh123:roozbeh123@cluster0.skexl.mongodb.net/bookit?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to database");
  });

const seedRooms = async () => {
  try {
    await Room.deleteMany();
    console.log("Rooms are deleted");

    await Room.insertMany(rooms);
    console.log("All rooms are added");
    
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedRooms();

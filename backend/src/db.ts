const mongoose = require("mongoose");
// const dbUrl =
//   "mongodb+srv://admin:OpHEv7XyPKRKOh0L@atlascluster.j8hrjww.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";

// mongoose
//   .connect(dbUrl, { dbName: "project" })
//   .then(() => {
//     console.log("Connected to mongodb atlas");
//   })
//   .catch((e: any) => {
//     console.log(e);
//   });

// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "MongoDb connection error: "));
// export default db;

// Initialize database connection once
mongoose.connect(
  "mongodb+srv://admin:OpHEv7XyPKRKOh0L@atlascluster.j8hrjww.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

// import mongodb from "mongodb";
// const mongoose = require("mongoose");
// const MongoClient = mongodb.MongoClient;
// const uri =
//   "mongodb+srv://admin:OpHEv7XyPKRKOh0L@atlascluster.j8hrjww.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";
// const client = new MongoClient(uri);
// client.connect();
// const db = client.db("project");
// export default db;

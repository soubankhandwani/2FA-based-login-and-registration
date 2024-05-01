import express, { Express, Request, Response } from "express";
const speakeasy = require("speakeasy");
const uuid = require("uuid");
const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");

// import database from "./db";
import UserModel from "./models/userModel";

const { MongoClient } = require("mongodb");
const client = new MongoClient(
  "mongodb+srv://admin:OpHEv7XyPKRKOh0L@atlascluster.j8hrjww.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster"
);

const port = 3000;

const app: Express = express();
const db = new JsonDB(new Config("myDatabase", true, false, "/"));

app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Welcome to 2FA using node, express and ts" });
});

//Register user and create a temp secret
app.post("/api/register", async (req: Request, res: Response) => {
  try {
    const id = uuid.v4();
    // const path = `/user/${id}`;
    const temp_secret = speakeasy.generateSecret();
    await client.connect(); // Connect to MongoDB

    const database = client.db("project");
    const col = database.collection("users");

    const newUser = {
      id,
      secret: temp_secret.base32,
    };

    await col.insertOne(newUser); // Wait for insertion to complete
    // Create user in the database
    await createUser(id, temp_secret.base32);

    // Send response with user ID and secret
    res.json({ id, secret: temp_secret.base32 });
  } catch (error) {
    console.error("Error generating the secret:", error);
    res.status(500).json({ message: "Error generating the secret" });
  }
});

//Verify the token and make the secret permanent
app.post("/api/verify", async (req: Request, res: Response) => {
  const { token, userId } = req.body;

  try {
    const path = `/user/${userId}`;
    const user = await db.getData(path);
    const { base32: secret } = await user.temp_secret;

    const verified = speakeasy.totp.verify({
      secret,
      encoding: "base32",
      token,
    });

    if (verified) {
      db.push(path, { id: userId, secret: user.temp_secret });
      res.json({ verified: true });
    } else {
      res.json({ verified: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error verifying the token" });
  }
});

//Validating the token after it became perm
app.post("/api/validate", async (req: Request, res: Response) => {
  const { token, userId } = req.body;

  try {
    const path = `/user/${userId}`;
    const user = await db.getData(path);
    const { base32: secret } = user.secret;

    const isValidated = speakeasy.totp.verify({
      secret,
      encoding: "base32",
      token,
      window: 0,
    });

    if (isValidated) {
      res.json({ validated: true });
    } else {
      res.json({ validated: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error verifying the token" });
  }
});

async function createUser(id: string, secret: string) {
  try {
    const user = new UserModel({ id, secret });
    await user.save();
    console.log("User created:", user);
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

app.listen(port, () => {
  console.log(`App listening at ${port}`);
});

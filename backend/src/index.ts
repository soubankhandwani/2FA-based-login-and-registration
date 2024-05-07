import express, { Express, Request, Response, NextFunction } from "express";
const speakeasy = require("speakeasy");
const uuid = require("uuid");
const { MongoClient } = require("mongodb");
const User = require("./models/User");
const UAParser = require("ua-parser-js");
const ejs = require("ejs");
const IP = require("ip");
const session = require("express-session");
const crypto = require("crypto");
const platform = require("platform");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();
const cors = require("cors");
const MongoStore = require("connect-mongo");

const app: Express = express();
const port = process.env.PORT;
app.set("view engine", "ejs");
app.use(express.json());
app.use(cors());
const client = new MongoClient(process.env.MONGO_ATLAS_URL);

const mongoURI = process.env.MONGO_ATLAS_URL;
const sessionStore = MongoStore.create({
  mongoUrl: mongoURI,
  dbName: "project",
  collectionName: "sessions",
});
const generateSecret = () => {
  return crypto.randomBytes(32).toString("hex");
};
const secret = generateSecret();
app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false, // Set to true for HTTPS environments
      sameSite: "strict",
    },
  })
);
let sessionMail = "";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.user) {
    next(); // User is authenticated, proceed to next middleware
  } else {
    res.json({ message: "User not authenticated" });
  }
};

const getDetails = (req: Request, res: Response) => {
  const info = platform.parse(req.headers["user-agent"]);
  const parser = new UAParser();
  parser.setUA(req.headers["user-agent"]);
  let timestamp = new Date().toUTCString();
  const loginDetails: {} = {
    login_ip: IP.address(),
    login_browser: info.description,
    login_device: platform.description,
    login_timestamp: timestamp,
  };
  return loginDetails;
};

app.get("/home", isAuthenticated, (req: Request, res: Response) => {
  res.json({ message: `Welcome to home page: ${req.session.user}` });
});

app.post("/api/login", async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    // Connect to Mongo Atlas
    await client.connect();
    const database = client.db("project");
    const col = database.collection("users");

    const user = await col.findOne({ email });

    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        req.session.email = email;
        req.session.save((err: any) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Session saved success: ", req.session.email);
            sessionMail = req.session.email;
          }
        });
        col.updateOne(
          { email },
          {
            $push: {
              login_info: getDetails(req, res),
            },
          }
        );
        res.json({ message: true });
        console.log("At Login: ", getDetails(req, res));
      } else {
        res.json({ message: false });
      }
    } else {
      res.json({ message: false });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error during login" });
  }
});

// Logout route
app.get("/api/logout", (req: Request, res: Response) => {
  // Destroy the session
  req.session.destroy((err: any) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).json({ message: "Error logging out" });
    } else {
      res.json({ message: "Logged out successfully" });
      sessionMail = "";
    }
  });
});

app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "2FA using node, express and ts" });
});

app.get("/", (req: Request, res: Response) => {
  res.render("index.ejs");
});

//Register user and create a temp secret
app.post("/api/register", async (req: Request, res: Response) => {
  try {
    // Generating a unique id and secret for token generation
    const id = uuid.v4();
    const temp_secret = speakeasy.generateSecret();
    // Fetching user name and email from request
    const { username, email, password } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Connect to Mongo Atlas
    await client.connect();
    const database = client.db("project");
    const col = database.collection("users");

    const user = await col.findOne({ email });
    if (user) {
      res.json({ message: "User already exists" });
      return;
    }

    const newUser = new User({
      id,
      secret: temp_secret.base32,
      username,
      email,
      password: hashedPassword,
    });

    await col.insertOne(newUser);
    console.log("At Register: ", getDetails(req, res));
    res.json({ message: true });
  } catch (error) {
    console.error("Error generating the secret:", error);
    res.status(500).json({ message: "Error generating the secret" });
  }
});

//Verify the token
app.post("/api/verify", async (req: Request, res: Response) => {
  const email = req.session.email;
  if (email) {
    try {
      //Connect to MongoDB
      await client.connect();
      const db = client.db("project");
      const col = db.collection("users");

      const { token } = req.body;
      const user = await col.findOne({ email });

      const secret = user.secret;
      const verified = speakeasy.totp.verify({
        secret,
        encoding: "base32",
        token,
        window: 0,
      });

      if (verified) {
        req.session.user = email;
        res.json({ verified: true });
      } else {
        res.json({ verified: false });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error verifying the token" });
    }
  } else {
    res.status(500).json({ message: "User not logged in" });
  }
});

app.get("/api/fetch_login_activity", async (req: Request, res: Response) => {
  const email = sessionMail;
  if (email) {
    try {
      await client.connect();
      const db = client.db("project");
      const col = db.collection("users");

      const user = await col.findOne({ email });
      res.json({ user });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong!" });
    }
  }
});

app.listen(port, () => {
  console.log(`App listening at ${port}`);
});

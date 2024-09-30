import express from "express";
import * as dotenv from "dotenv";
import { connectDatabase } from "./utils/connectDatabase.js";
import cors from "cors";
import flash from "connect-flash";
import passport from "passport";
import session from "express-session";
import configurePassport from "./utils/passport.js";
import authRoutes from './routes/auth.js';
import cartRoutes from './routes/cart.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

connectDatabase();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true 
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);


app.use('/api', authRoutes);
app.use('/api', cartRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}. In ${process.env.NODE_ENV} mode`);
});

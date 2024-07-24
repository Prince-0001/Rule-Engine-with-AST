import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
import ruleRoutes from './routes/rules.js';

const app = express();
configDotenv();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.options('*', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
  res.sendStatus(200);
});
app.use(bodyParser.json());
app.use('/api/rules', ruleRoutes);

main().catch(err => console.log(err));
main().then(console.log("Connected to mongodb"));

async function main(){
  await mongoose.connect(process.env.MONGO_URL)
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
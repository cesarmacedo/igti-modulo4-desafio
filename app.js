import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { gradeRouter } from './routes/gradeRouter.js'

import { db } from './models/index.js';

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conect mongoDB')
  } catch (error) {
    console.log(error)
    console.log('error ao conectar ao mongoDB')
    process.exit();
  }
})();

const app = express();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'https://frontend-app-grades.herokuapp.com',
  })
);


app.use("/", gradeRouter);

app.listen(process.env.PORT, () => {});

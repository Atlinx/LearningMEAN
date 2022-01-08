// Import all the rqeuired packages using import statement
import express, { ErrorRequestHandler } from 'express';
import createError, { HttpError } from 'http-errors';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dbConfig from './database/db';

// Connecting with mongo db

// Mongoose's own promise system is deprecated, therefore we have to assign the native promise implementation.
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db).then(() => {
      console.log('Database sucessfully connected')
   },
   error => {
      console.log('Database could not connected: ' + error)
   }
)

// Setting up port with express js
import employeeRoute from './routes/employee.route';
const app = express();
// app.use is apparantly a property that returns a function.
// Therefore calling app.use is getting the returned function and calling it immediately.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));
app.use('/', express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));
app.use('/api', employeeRoute);

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
});

// Find 404 and hand over to error handler
app.use((req, res, next) => {
   next(createError(404));
});

// error handler
app.use(((err, req, res, next) => {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
}) as ErrorRequestHandler);
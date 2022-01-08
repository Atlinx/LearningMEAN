import express from 'express';
import { NativeError, Query } from 'mongoose';
const app = express();
const employeeRoute = express.Router();

// Employee model
import { EmployeeSchema, Employee } from '../models/Employee';

// Add Employee
employeeRoute.route('/create').post((req, res, next) => {
  EmployeeSchema.create(req.body, (error: NativeError, data: Employee) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Employees
employeeRoute.route('/').get((req, res, next) => {
  EmployeeSchema.find((error: NativeError, data: Employee) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single employee
employeeRoute.route('/read/:id').get((req, res, next) => {
  EmployeeSchema.findById(req.params.id, (error: NativeError, data: Employee) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update employee
employeeRoute.route('/update/:id').put((req, res, next) => {
  EmployeeSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error: NativeError, data: Employee) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete employee
employeeRoute.route('/delete/:id').delete((req, res, next) => {
  // Equivalanet to:
  // findOneAndDelete({ _id: req.params.id }, ...)
  EmployeeSchema.findByIdAndDelete(req.params.id, (error: NativeError, data: Employee) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

export default employeeRoute;
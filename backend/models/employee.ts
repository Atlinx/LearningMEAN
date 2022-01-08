import { Schema, model } from 'mongoose';

export interface Employee {
    name: string;
    email: string;
    designation: string;
    phoneNumber: number;
}

// Define collection and schema
const employeeSchema = new Schema<Employee>({
   name: {
      type: String
   },
   email: {
      type: String
   },
   designation: {
      type: String
   },
   phoneNumber: {
      type: Number
   }
}, {
   collection: 'employees'
});

export const EmployeeModel = model('Employee', employeeSchema);
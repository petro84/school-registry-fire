import { Student } from "./student.model";

export interface Teacher {
  avatar?: string;
  teacherId?: string;
  title: string;
  firstName: string;
  lastName: string;
  gradeId: string;
  phone: string;
  email: string;
  classSize: number;
  students?: Student[];
}

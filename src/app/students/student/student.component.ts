import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap } from 'rxjs';

import { Student } from '../../models/student.model';
import { Teacher } from '../../models/teacher.model';
import { StudentsService } from '../../services/students.service';
import { TeachersService } from '../../services/teachers.service';

@Component({
  selector: 'sr-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  student!: Student | null;
  teachers: Teacher[] = [];
  teacherId!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentsSvc: StudentsService,
    private teachersSvc: TeachersService
  ) {
    this.teachersSvc
      .getAllTeachers()
      .subscribe((teachers) => (this.teachers = teachers));
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      if (data['student']) {
        this.studentsSvc.setStudent(data['student']['student']);
        this.teachersSvc.setTeacher(data['student']['teacher']);
        this.teacherId = data['student']['teacher'].teacherId;
        this.student = data['student']['student'];
      }
    });
  }

  save(formValues: any) {
    const student: Student = {
      avatar: formValues['avatar'],
      firstName: formValues['firstName'],
      lastName: formValues['lastName'],
      email: formValues['email'],
      phone: formValues['phone']
    };

    if (!this.student) {
      let teacher = this.getRandomTeacherByGrade(formValues['grade']);
      this.teacherId = teacher.teacherId ? teacher.teacherId : '';

      this.studentsSvc.createStudent(this.teacherId, student).subscribe({
        next: () => console.log('Success'),
        error: err => console.error(err),
        complete: () => setTimeout(() => this.closeForm(), 3000)
      });
    } else if (this.student && !formValues['teacher']) {
      let teacher = this.getRandomTeacherByGrade(formValues['grade']);
      let sId = this.student?.studentId ? this.student.studentId : '';
      let id = teacher.teacherId ? teacher.teacherId : '';

      const createStudent = this.studentsSvc.createStudent(id, student);
      const deletePreviousStudent = createStudent.pipe(
        concatMap(t => this.studentsSvc.deleteStudent(this.teacherId, sId))
      );

      deletePreviousStudent.subscribe({
        next: () => console.log('Success'),
        error: err => console.error(err),
        complete: () => setTimeout(() => this.closeForm(), 3000)
      });
    } else {
      let sId = this.student.studentId ? this.student.studentId : '';
      this.studentsSvc.updateStudent(this.teacherId, sId, student).subscribe({
        next: () => console.log('Success'),
        error: err => console.error(err),
        complete: () => setTimeout(() => this.closeForm(), 3000)
      });
    }
  }

  closeForm() {
    this.studentsSvc.setStudent(null);
    if (this.teacherId) {
      this.router.navigate(['/students', this.teacherId]);
    } else {
      this.teachersSvc.setTeacher(null);
      this.router.navigate(['/'])
    }
  }

  delete() {
    if (this.teacherId && this.student?.studentId) {
      this.studentsSvc.deleteStudent(this.teacherId, this.student.studentId).subscribe({
        next: () => console.log('Success'),
        error: err => console.error(err),
        complete: () => setTimeout(() => this.closeForm(), 3000)
      });
    }
  }

  private getRandomTeacherByGrade(grade: string) {
    let teachersByGrade = this.teachers.filter(teachers => teachers.gradeId === grade);

    if (teachersByGrade.length > 1) {
      let randomNum = Math.floor(Math.random() * teachersByGrade.length);
      return teachersByGrade[randomNum];
    } else {
      return teachersByGrade[0];
    }
  }
}

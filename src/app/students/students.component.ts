import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Student } from '../models/student.model';
import { Teacher } from '../models/teacher.model';

import { faBookReader } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { TeachersService } from '../services/teachers.service';

@Component({
  selector: 'sr-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  teacher!: Teacher;
  students!: Student[];
  student!: Student;

  faBookReader = faBookReader;

  get teacherName() {
    if (this.teacher) {
      return `${this.teacher.title} ${this.teacher.lastName}`;
    } else {
      return '';
    }
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teachersSvc: TeachersService,
    private msgSvc: MessageService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((pm) => {
      const id = pm.get('id');

      if (id) {
        this.teachersSvc.getTeacherById(id).subscribe((teacher) => {
          this.teacher = <Teacher>{ ...teacher, teacherId: id };
          this.students = teacher.students ? teacher.students : [];
        });
      }
    });
  }

  openStudentInfo(student: Student) {
    const stud = this.students.find((s) => s.studentId === student.studentId);

    if (stud) {
      this.router.navigate([
        '/teacher',
        this.teacher.teacherId,
        'student',
        stud.studentId,
      ]);
    } else {
      this.msgSvc.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Student could not be found!'
      });
    }
  }

  registerStudent() {
    this.teachersSvc.setTeacher(null);
    this.router.navigate(['/student']);
  }

  home() {
    this.teachersSvc.setTeacher(null);
    this.router.navigate(['/']);
  }
}

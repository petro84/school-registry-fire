import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { faBookReader } from '@fortawesome/free-solid-svg-icons';

import { TeachersService } from '../services/teachers.service';
import { Teacher } from '../models/teacher.model';
import { Student } from '../models/student.model';

@Component({
  selector: 'sr-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students!: Student[];
  teacher!: Teacher;
  student!: Student;
  loading = true;

  faBookReader = faBookReader;

  get teacherName() {
    if (this.teacher) {
      return `${this.teacher.title} ${this.teacher.lastName}`;
    } else {
      return '';
    }
  }

  constructor(private route: ActivatedRoute, private router: Router, private teachersSvc: TeachersService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(pm => {
      const id = pm.get('id');

      if (id) {
        this.teachersSvc.getTeacherById(id).subscribe(teacher => {
          this.teacher = <Teacher>{ ...teacher, teacherId: id };
          this.students = teacher.students ? teacher.students : [];
          this.loading = false;
        });
      }
    })
  }

  openStudentInfo(student: Student) {
    const stud = this.students.find(s => s.studentId === student.studentId);

    if (stud) {
      this.router.navigate(['/teacher', this.teacher.teacherId, 'student', stud.studentId]);
    } else {
      console.error("Student could not be found!");
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

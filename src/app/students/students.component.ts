import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { faBookReader } from '@fortawesome/free-solid-svg-icons';

import { TeachersService } from '../services/teachers.service';
import { Teacher } from '../models/teacher.model';
import { Student } from '../models/student.model';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'sr-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  students!: Student[];
  teacher!: Teacher;
  student!: Student;
  loading = true;
  sortOptions: SelectItem[];
  sortKey: string;

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
    private teachersSvc: TeachersService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((pm) => {
      const id = pm.get('id');

      if (id) {
        this.teachersSvc.getTeacherById(id).subscribe((teacher) => {
          this.teacher = <Teacher>{ ...teacher, teacherId: id };
          this.students = teacher.students ? teacher.students : [];
          this.loading = false;
        });
      }
    });

    this.sortOptions = [
      { label: 'Name - Asc', value: '!name' },
      { label: 'Name - Desc', value: 'name' },
    ];
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
      console.error('Student could not be found!');
    }
  }

  onSortChange() {
    if (this.sortKey.indexOf('!') === 0) this.sort(1);
    else this.sort(-1);
  }

  sort(order: number) {
    let students = [...this.students];
    students.sort((stud1, stud2) => {
      let s1 = stud1.firstName + ' ' + stud1.lastName;
      let s2 = stud2.firstName + ' ' + stud2.lastName;
      let result = (s1 < s2) ? -1 : (s1 > s2) ? 1 : 0;

      return (order * result);
    });

    this.students = students;
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

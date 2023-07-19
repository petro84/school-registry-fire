import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  faBookReader,
  faChalkboardTeacher,
} from '@fortawesome/free-solid-svg-icons';

import { TeachersService } from '../services/teachers.service';
import { Teacher } from '../models/teacher.model';

@Component({
  selector: 'sr-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
})
export class TeachersComponent implements OnInit {
  teachers: Teacher[] = [];
  loading = true;

  faBookReader = faBookReader;
  faChalkboardTeacher = faChalkboardTeacher;

  constructor(
    private teachersSvc: TeachersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((pm) => {
      const grade = pm.get('grade');
      const id = pm.get('id');

      if (grade) {
        this.teachersSvc.getTeachersByGrade(grade).subscribe((teachers) => {
          this.teachers = teachers;
          this.loading = false;
        });
      } else if (id) {
        this.teachersSvc.getTeacherById(id).subscribe((teachers) => {
          const teacher = <Teacher>{ ...teachers };
          this.teachers = [teacher];
          this.loading = false;
        });
      } else {
        this.teachersSvc.getAllTeachers().subscribe((teachers) => {
          this.teachers = teachers;
          this.loading = false;
        });
      }
    });
  }

  openTeacherInfo(teacher: Teacher) {
    const id = teacher.teacherId;
    const teach = this.teachers.find((t) => t.teacherId === id);

    if (teach) {
      this.teachersSvc.setTeacher(teach);
      this.router.navigate(['/teacher', id]);
    } else {
      console.log('Teacher could not be found.');
    }
  }
}

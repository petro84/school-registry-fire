import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  faBookReader,
  faChalkboardTeacher,
} from '@fortawesome/free-solid-svg-icons';

import { AdminService } from '../services/admin.service';
import { TeachersService } from '../services/teachers.service';
import { Teacher } from '../models/teacher.model';

@Component({
  selector: 'sr-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
})
export class TeachersComponent implements OnInit {
  teachers: Teacher[] = [];
  loggedInUser: any;

  faBookReader = faBookReader;
  faChalkboardTeacher = faChalkboardTeacher;

  constructor(
    private teachersSvc: TeachersService,
    private adminSvc: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.adminSvc.currentUser.subscribe(user => this.loggedInUser = user);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((pm) => {
      const grade = pm.get('grade');
      const id = pm.get('id');

      if (grade) {
        this.teachersSvc.getTeachersByGrade(grade).subscribe((teachers) => {
          this.teachers = teachers;
        });
      } else if (id) {
        this.teachersSvc.getTeacherById(id).subscribe((teachers) => {
          const teacher = <Teacher>{ ...teachers };
          this.teachers = [teacher];
        });
      } else {
        this.teachersSvc.getAllTeachers().subscribe((teachers) => {
          this.teachers = teachers;
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

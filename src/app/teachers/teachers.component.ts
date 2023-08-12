import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  faBookReader,
  faChalkboardTeacher,
} from '@fortawesome/free-solid-svg-icons';

import { AdminService } from '../services/admin.service';
import { TeachersService } from '../services/teachers.service';
import { Teacher } from '../models/teacher.model';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'sr-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
})
export class TeachersComponent implements OnInit {
  teachers: Teacher[] = [];
  fileterdTeachrs!: Teacher[];
  loggedInUser: any;
  searchText!: string;
  sortOptions: SelectItem[];
  sortKey: string;

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

    this.sortOptions = [
      {label: 'Grade - Asc', value: 'grade'},
      {label: 'Grade - Desc', value: '!grade'},
      {label: 'Name - Asc', value: '!name'},
      {label: 'Name - Desc', value: 'name'}
    ];
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

  search(event: any) {
    this.fileterdTeachrs = this.teachers.filter(text =>
      text.firstName.toLocaleLowerCase().includes(event.query.toLocaleLowerCase()) ||
      text.lastName.toLowerCase().includes(event.query.toLocaleLowerCase())
    );
  }

  onSelect(value: any) {

  }

  onSortChange() {
    if (this.sortKey.includes('grade')) {
      this.sort('grade', this.sortKey.indexOf('!') === 0 ? -1 : 1);
    } else {
      this.sort('name', this.sortKey.indexOf('!') ? -1 : 1);
    }
  }

  sort(field: string, order: number) {
    let teachers = [...this.teachers];

    if (field === 'grade') {
      teachers.sort((teach1, teach2) => {
        let t1 = teach1.gradeId;
        let t2 = teach2.gradeId;
        let result = (t1 < t2) ? -1 : (t1 > t2) ? 1 : 0;

        return (order * result);
      });
    } else {
      teachers.sort((teach1, teach2) => {
        let t1 = teach1.firstName + ' ' + teach1.lastName;
        let t2 = teach2.firstName + ' ' + teach2.lastName;
        let result = (t1 < t2) ? -1 : (t1 > t2) ? 1 : 0;

        return (order * result);
      });
    }

    this.teachers = teachers;

  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { faSchool } from '@fortawesome/free-solid-svg-icons';

import { Grade } from '../../models/grade.model';
import { Teacher } from '../../models/teacher.model';
import { GradesService } from '../../services/grades.service';
import { TeachersService } from '../../services/teachers.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'sr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  grades!: Grade[];
  teachers!: Teacher[];
  filteredTeachers!: Teacher[];
  searchText!: string;
  loggedInUser: any;

  showLoginDialog: boolean = false;
  showSignupDialog: boolean = false;

  faSchool = faSchool;

  constructor(
    private gradesSvc: GradesService,
    private teachersSvc: TeachersService,
    private adminSvc: AdminService,
    private router: Router
  ) {
    this.teachersSvc
      .getAllTeachers()
      .subscribe((teachers) => (this.teachers = teachers));
  }

  ngOnInit(): void {
    this.gradesSvc.fetchGrades().subscribe((grades) => {
      this.grades = grades;
    });

    this.adminSvc.currentUser.subscribe(user => this.loggedInUser = user);
  }

  search(event: any) {
    this.filteredTeachers = this.teachers.filter(
      (text) =>
        text.firstName.toLowerCase().includes(event.query.toLowerCase()) ||
        text.lastName.toLowerCase().includes(event.query.toLowerCase())
    );
  }

  onSelect(value: any) {
    let teacher: Teacher = value;

    this.router.navigate(['/teachers', { id: teacher.teacherId }]);
    this.filteredTeachers = [];
    this.searchText = '';
  }

  showDialog(action: string) {
    if (action === 'login') {
      this.showLoginDialog = true;
    } else if (action === 'signup') {
      this.showSignupDialog = true;
    }
  }

  close(action: string) {
    if (action === 'login') {
      this.showLoginDialog = false;
    } else if (action === 'signup') {
      this.showSignupDialog = false;
    }
  }

  logout() {
    this.adminSvc.signOut();
    this.router.navigate(['']);
  }
}

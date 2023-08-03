import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { faSchool } from '@fortawesome/free-solid-svg-icons';

import { AdminService } from '../../services/admin.service';
import { GradesService } from '../../services/grades.service';
import { Grade } from '../../models/grade.model';

@Component({
  selector: 'sr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  grades!: Grade[];
  loggedInUser: any;

  showLoginDialog: boolean = false;
  showRegisterDialog: boolean = false;

  faSchool = faSchool;

  constructor(private gradesSvc: GradesService, private adminSvc: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.gradesSvc.fetchGrades().subscribe(grades => this.grades = grades);

    this.adminSvc.currentUser.subscribe(user => this.loggedInUser = user);
  }

  showDialog(action: string) {
    if (action === 'login') {
      this.showLoginDialog = true;
    } else if (action === 'register') {
      this.showRegisterDialog = true;
    }
  }

  close(action: string) {
    if (action === 'login') {
      this.showLoginDialog = false;
    } else if (action === 'register') {
      this.showRegisterDialog = false;
    }
  }

  logout() {
    this.adminSvc.signOut();
    this.router.navigate(['']);
  }

}

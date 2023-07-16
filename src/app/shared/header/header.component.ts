import { Component, OnInit } from '@angular/core';

import { faSchool } from '@fortawesome/free-solid-svg-icons';

import { GradesService } from 'src/app/services/grades.service';
import { Grade } from 'src/app/models/grade.model';

@Component({
  selector: 'sr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  grades!: Grade[];

  faSchool = faSchool;

  constructor(private gradesSvc: GradesService) {}

  ngOnInit(): void {
    this.gradesSvc.fetchGrades().subscribe(grades => this.grades = grades);
  }

}

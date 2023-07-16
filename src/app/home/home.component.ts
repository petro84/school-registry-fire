import { Component, OnInit } from '@angular/core';

import { faBookReader } from '@fortawesome/free-solid-svg-icons';

import { GradesService } from '../services/grades.service';
import { Grade } from '../models/grade.model';

@Component({
  selector: 'sr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  grades!: Grade[];

  faBookReader = faBookReader;

  constructor(private gradesSvc: GradesService) {}

  ngOnInit(): void {
    this.gradesSvc.fetchGrades().subscribe(grades => {
      this.grades = grades;
    });
  }

}

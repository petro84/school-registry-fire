import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

import { GradesService } from './services/grades.service';
import { Grade } from './models/grade.model';

@Component({
  selector: 'sr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig, private gradesSvc: GradesService) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.gradesSvc.getGrades().subscribe(grades => {
      let sorted = this.sortBy(grades, 'K');
      this.gradesSvc.setGrades(sorted);
    });
  }

  sortBy(arr: Grade[], val: string) {
    var top = [];
    var rest = [];

    for (var a of arr) {
      if (a.gradeId === val) {
        top.push(a);
      } else {
        rest.push(a);
      }
    }

    return top.concat(rest);
  }
}

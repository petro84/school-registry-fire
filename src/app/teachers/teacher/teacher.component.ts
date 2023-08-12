import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { TeachersService } from '../../services/teachers.service';
import { Teacher } from '../../models/teacher.model';

@Component({
  selector: 'sr-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  teacher!: Teacher | null;
  teacherId!: string;

  constructor(private teachersSvc: TeachersService, private msgSvc: MessageService, private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe(pm => {
      const id = pm.get('id');

      if (id) {
        this.teacherId = id;
      }
    });
  }

  ngOnInit(): void {
    if (this.teacherId) {
      this.teachersSvc.getTeacherById(this.teacherId).subscribe(teacher => {
        this.teacher = <Teacher>{ ...teacher, teacherId: this.teacherId };
        this.teachersSvc.setTeacher(this.teacher);
      });
    } else {
      this.teachersSvc.getTeacher().subscribe(teacher => this.teacher = teacher);
    }
  }

  save(formValues: any) {
    const teach: Teacher = {
      avatar: formValues['avatar'],
      title: formValues['title'],
      firstName: formValues['firstName'],
      lastName: formValues['lastName'],
      gradeId: formValues['grade'],
      phone: formValues['phone'],
      email: formValues['email'],
      classSize: formValues['classSize']
    };

    if (!this.teacher) {
      this.teachersSvc.createTeacher(teach).subscribe({
        next: () => this.createToastMsg('success', 'Success', `${teach.title} ${teach.lastName} has been created!`, false),
        error: (err) => this.createToastMsg('error', err.code, err.message, true),
        complete: () => {}
      });
    } else {
      this.teachersSvc.updateTeacher(this.teacherId, teach).subscribe({
        next: () => this.createToastMsg('success', 'Success', `${teach.title} ${teach.lastName} has been updated!`, false),
        error: (err) => this.createToastMsg('error', err.code, err.message, true),
        complete: () => {}
      });
    }
  }

  delete() {
    if (this.teacher && this.teacherId && this.teacher.teacherId === this.teacherId) {
      this.teachersSvc.deleteTeacher(this.teacherId).subscribe({
        next: () => this.createToastMsg('success', 'Success', `${this.teacher?.title} ${this.teacher?.lastName} has been removed!`, false),
        error: (err) => this.createToastMsg('error', err.code, err.message, true),
        complete: () => {}
      });
    }
  }

  createToastMsg(severity: string, summary: string, detail: string, isError: boolean): void {
    this.msgSvc.add({ severity, summary, detail });

    if (!isError) {
      setTimeout(() => {
        this.closeForm();
      }, 3000);
    }
  }

  closeForm() {
    this.msgSvc.clear();
    this.teachersSvc.setTeacher(null);
    this.router.navigate(['/teachers']);
  }
}

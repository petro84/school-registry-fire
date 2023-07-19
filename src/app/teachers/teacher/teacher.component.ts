import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Teacher } from '../../models/teacher.model';
import { TeachersService } from '../../services/teachers.service';

@Component({
  selector: 'sr-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  teacher!: Teacher | null;
  teacherId!: string;

  constructor(private teachersSvc: TeachersService, private route: ActivatedRoute, private router: Router) {
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
        next: () => console.log('Success!'),
        error: (err) => console.error(err),
        complete: () => { setTimeout(() => this.closeForm(), 3000) }
      });
    } else {
      this.teachersSvc.updateTeacher(this.teacherId, teach).subscribe({
        next: () => console.log('Success'),
        error: (err) => console.error(err),
        complete: () => { setTimeout(() => this.closeForm(), 3000) }
      });
    }
  }

  delete() {
    if (this.teacher && this.teacherId && this.teacher.teacherId === this.teacherId) {
      this.teachersSvc.deleteTeacher(this.teacherId).subscribe({
        next: () => console.log('Success'),
        error: (err) => console.error(err),
        complete: () => { setTimeout(() => this.closeForm(), 3000) }
      });
    }
  }

  closeForm() {
    this.teachersSvc.setTeacher(null);
    this.router.navigate(['/teachers']);
  }
}

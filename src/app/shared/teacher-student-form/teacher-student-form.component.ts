import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { forkJoin, take } from 'rxjs';

import { Grade } from '../../models/grade.model';
import { Teacher } from '../../models/teacher.model';
import { Student } from '../../models/student.model';
import { GradesService } from '../../services/grades.service';
import { TeachersService } from '../../services/teachers.service';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'sr-teacher-student-form',
  templateUrl: './teacher-student-form.component.html',
  styleUrls: ['./teacher-student-form.component.css'],
})
export class TeacherStudentFormComponent implements OnInit {
  @Input() formType!: string;
  @Output() onClose = new EventEmitter();
  @Output() onSave = new EventEmitter<FormGroup>();
  @Output() onDelete = new EventEmitter();

  form!: FormGroup;
  grades!: Grade[];
  windowWidth!: number;
  currentGrade!: Grade;
  displayEditor = false;

  titles: string[] = ['Mr.', 'Mrs.', 'Ms.', 'Miss'];

  @HostListener('window:resize')
  onResize() {
    this.windowWidth = this.windowWidth;
  }

  constructor(
    private fb: FormBuilder,
    private gradesSvc: GradesService,
    private teachersSvc: TeachersService,
    private studentsSvc: StudentsService
  ) {
    this.gradesSvc.fetchGrades().subscribe((grades) => (this.grades = grades));
  }

  ngOnInit(): void {
    this.windowWidth = window.innerWidth;

    this.createForm();

    if (this.formType === 'teacher') {
      this.setupTeacher();
    } else if (this.formType === 'student') {
      this.setupStudent();
    }
  }

  createForm(): void {
    this.form = this.fb.group({
      avatar: [null],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      grade: [null, Validators.required],
      phone: [null, [Validators.required, Validators.minLength(10)]],
      email: [null, [Validators.required, Validators.email]],
    });
  }

  setupTeacher() {
    this.form.addControl('title', new FormControl(null, Validators.required));
    this.form.addControl(
      'classSize',
      new FormControl(0, [
        Validators.required,
        Validators.min(1),
        Validators.max(20),
      ])
    );

    this.teachersSvc.getTeacher().subscribe((teacher) => {
      if (teacher) {
        this.updateTeacherForm(teacher);
      }
    });
  }

  updateTeacherForm(teacher: Teacher) {
    this.form.patchValue({
      title: teacher.title,
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      phone: teacher.phone,
      email: teacher.email,
      grade: teacher.gradeId,
      classSize: teacher.classSize,
      avatar: teacher.avatar,
    });
  }

  setupStudent() {
    this.form.addControl('teacher', new FormControl(null));

    forkJoin({
      student: this.studentsSvc.fetchStudent().pipe(take(1)),
      teacher: this.teachersSvc.getTeacher().pipe(take(1)),
    }).subscribe(data => {
      if (data.student && data.teacher) {
        this.updateStudentForm(data.student, data.teacher);
      }
    });
  }

  updateStudentForm(student: Student, teacher: Teacher) {
    this.grades.find(grade => {
      if (grade.gradeId === teacher.gradeId) {
        this.currentGrade = grade;
      }
    });

    this.form.patchValue({
      firstName: student.firstName,
      lastName: student.lastName,
      phone: student.phone,
      email: student.email,
      teacher: `${teacher.title} ${teacher.lastName}`,
      grade: teacher.gradeId,
      avatar: student.avatar
    });

    this.form.controls['grade'].enable();
  }

  resetTeacher(event: any) {
    if (this.formType === 'student') {
      let changedGrade = <Grade>event;

      if (changedGrade) {
        if (this.currentGrade?.gradeId !== changedGrade.gradeId) {
          this.form.patchValue({
            teacher: null,
          });
        }
      }
    }
  }

  updateImg(event: string) {
    if (event) {
      this.form.patchValue({
        avatar: event,
      });
    }
  }

  save(formValues: any) {
    this.onSave.emit(formValues);
  }

  close() {
    this.onClose.emit();
  }

  delete() {
    this.onDelete.emit();
  }
}

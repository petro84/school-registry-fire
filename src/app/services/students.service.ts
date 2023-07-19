import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { BehaviorSubject, from, Observable } from 'rxjs';

import { Student } from '../models/student.model';
import { Teacher } from '../models/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private student$ = new BehaviorSubject<Student | null>(null);

  constructor(private fs: AngularFirestore) {}

  getStudent(teacherId: string, studentId: string) {
    const studentDoc = this.fs.doc<Student>(`teachers/${teacherId}/students/${studentId}`);

    return studentDoc.valueChanges({ idField: 'studentId' });
  }

  createStudent(
    teacherId: string,
    student: Student
  ): Observable<DocumentReference<Student>> {
    const studentColl = this.fs
      .doc<Teacher>(`teachers/${teacherId}`)
      .collection<Student>('students');

    return from(studentColl.add({ ...student }));
  }

  updateStudent(
    teacherId: string,
    studentId: string,
    student: Student
  ): Observable<void> {
    const studentDoc = this.fs.doc<Student>(
      `teachers/${teacherId}/students/${studentId}`
    );

    return from(studentDoc.update(student));
  }

  deleteStudent(teacherId: string, studentId: string): Observable<void> {
    const studentDoc = this.fs.doc<Student>(
      `teachers/${teacherId}/students/${studentId}`
    );

    return from(studentDoc.ref.delete());
  }

  setStudent(student: Student | null) {
    this.student$.next(student);
  }

  fetchStudent(): Observable<Student | null> {
    return this.student$.asObservable();
  }
}

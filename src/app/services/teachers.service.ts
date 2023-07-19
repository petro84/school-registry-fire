import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import {
  BehaviorSubject,
  forkJoin,
  from,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  take,
} from 'rxjs';

import { Student } from '../models/student.model';
import { Teacher } from '../models/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeachersService {
  private teachers$!: Observable<Teacher[]>;
  private teacher = new BehaviorSubject<Teacher | null>(null);

  constructor(private fs: AngularFirestore) {}

  getAllTeachers() {
    this.teachers$ = this.fs
      .collection<Teacher>('teachers')
      .valueChanges({ idField: 'teacherId' });

    return this.addStudents();
  }

  getTeachersByGrade(grade: string) {
    this.teachers$ = this.fs
      .collection<Teacher>('teachers', (ref) =>
        ref.where('gradeId', '==', grade)
      )
      .valueChanges({ idField: 'teacherId' });

    return this.addStudents();
  }

  getTeacherById(id: string) {
    let teacher$ = this.fs
      .doc<Teacher>(`teachers/${id}`)
      .valueChanges({ idField: 'teacherId' });

    return teacher$.pipe(
      switchMap((teacher) => {
        return this.fs
          .collection<Student>(`teachers/${teacher?.teacherId}/students`)
          .valueChanges({ idField: 'studentId' })
          .pipe(map((students) => ({ ...teacher, students })));
      })
    );
  }

  setTeacher(teacher: Teacher | null) {
    this.teacher.next(teacher);
  }

  getTeacher(): Observable<Teacher | null> {
    return this.teacher.asObservable();
  }

  createTeacher(teacher: Teacher): Observable<DocumentReference<Teacher>> {
    const teacherColl = this.fs.collection<Teacher>('teachers');

    return from(teacherColl.add({ ...teacher }));
  }

  updateTeacher(teacherId: string, teach: Teacher): Observable<void> {
    const teacherDoc = this.fs.doc<Teacher>(`teachers/${teacherId}`);

    return from(teacherDoc.update(teach));
  }

  deleteTeacher(teacherId: string): Observable<void> {
    const teacherDoc = this.fs.doc<Teacher>(`teachers/${teacherId}`);

    const nestedDocs = teacherDoc.collection('students');

    nestedDocs.get().forEach((docs) => docs.forEach((doc) => doc.ref.delete()));

    return from(teacherDoc.ref.delete());
  }

  private addStudents(): Observable<Teacher[]> {
    return this.teachers$.pipe(
      mergeMap((teachers) => {
        if (teachers.length === 0) {
          return of([]);
        }
        return forkJoin(
          teachers.map((teacher) => {
            return this.fs
              .collection<Student>(`teachers/${teacher.teacherId}/students`)
              .valueChanges({ idField: 'studentId' })
              .pipe(
                take(1),
                map((students) => <Teacher>{ ...teacher, students })
              );
          })
        );
      })
    );
  }
}

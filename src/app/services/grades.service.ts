import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

import { Grade } from '../models/grade.model';

@Injectable({
  providedIn: 'root'
})
export class GradesService {
  private grades$ = new BehaviorSubject<Grade[]>([]);

  constructor(private fs: AngularFirestore) { }

  getGrades(): Observable<Grade[]> {
    return this.fs
      .collection<Grade>('grades', ref => ref.orderBy('gradeId', 'asc'))
      .valueChanges();
  }

  setGrades(grades: Grade[]) {
    this.grades$.next(grades);
  }

  fetchGrades(): Observable<Grade[]> {
    return this.grades$.asObservable();
  }
}

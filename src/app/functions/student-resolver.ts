import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router"
import { inject } from '@angular/core';
import { catchError, forkJoin, Observable, of, take } from 'rxjs';

import { Student } from '../models/student.model';
import { StudentsService } from "../services/students.service";
import { TeachersService } from "../services/teachers.service";

export const StudentResolver: ResolveFn<Student> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  studentsSvc: StudentsService = inject(StudentsService),
  teachersSvc: TeachersService = inject(TeachersService)
): Observable<any> => {
  return forkJoin({
    student: studentsSvc.getStudent(route.params['id'], route.params['sId'])
      .pipe(take(1)),
    teacher: teachersSvc.getTeacherById(route.params['id'])
      .pipe(take(1)),
  }).pipe(catchError(() => of('Student does not exist!')));
}

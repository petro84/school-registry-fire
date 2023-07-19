import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TeachersComponent } from './teachers/teachers.component';
import { StudentsComponent } from './students/students.component';
import { TeacherComponent } from './teachers/teacher/teacher.component';
import { StudentComponent } from './students/student/student.component';
import { StudentResolver } from './functions/student-resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'teachers', component: TeachersComponent },
  { path: 'teachers/:grade', component: TeachersComponent },
  { path: 'teacher', component: TeacherComponent },
  { path: 'teacher/:id', component: TeacherComponent, pathMatch: 'full' },
  {
    path: 'teacher/:id/student/:sId',
    component: StudentComponent,
    resolve: { student: StudentResolver },
  },
  { path: 'students/:id', component: StudentsComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { MessageService } from 'primeng/api';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TeachersComponent } from './teachers/teachers.component';
import { TeacherComponent } from './teachers/teacher/teacher.component';
import { StudentsComponent } from './students/students.component';
import { StudentComponent } from './students/student/student.component';
import { AdminService } from './services/admin.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TeachersComponent,
    TeacherComponent,
    StudentsComponent,
    StudentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    SharedModule,
  ],
  providers: [
    MessageService,
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

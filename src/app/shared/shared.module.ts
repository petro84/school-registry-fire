import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './header/header.component';
import { PhotoEditorComponent } from './photo-editor/photo-editor.component';
import { TeacherStudentFormComponent } from './teacher-student-form/teacher-student-form.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AdminComponent,
    HeaderComponent,
    PhotoEditorComponent,
    TeacherStudentFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    ButtonModule
  ],
  exports: [
    HeaderComponent,
    FontAwesomeModule,
    ButtonModule
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './header/header.component';
import { PhotoEditorComponent } from './photo-editor/photo-editor.component';
import { TeacherStudentFormComponent } from './teacher-student-form/teacher-student-form.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImageCropperModule } from 'ngx-image-cropper';

import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { DialogModule } from 'primeng/dialog';
import { VirtualScrollerModule } from 'primeng/virtualscroller';

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
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ImageCropperModule,
    ButtonModule,
    AvatarModule,
    DividerModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    InputMaskModule,
    DialogModule,
    VirtualScrollerModule,
  ],
  exports: [
    HeaderComponent,
    TeacherStudentFormComponent,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ButtonModule,
    AvatarModule,
    VirtualScrollerModule
  ]
})
export class SharedModule { }

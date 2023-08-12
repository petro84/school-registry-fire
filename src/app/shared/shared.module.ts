import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { PhotoEditorComponent } from './photo-editor/photo-editor.component';
import { TeacherStudentFormComponent } from './teacher-student-form/teacher-student-form.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';

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
import { AutoCompleteModule } from 'primeng/autocomplete'
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    HeaderComponent,
    PhotoEditorComponent,
    TeacherStudentFormComponent,
    LoginComponent,
    RegisterComponent
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
    AutoCompleteModule,
    ToastModule
  ],
  exports: [
    HeaderComponent,
    TeacherStudentFormComponent,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ButtonModule,
    AvatarModule,
    VirtualScrollerModule,
    DropdownModule,
    AutoCompleteModule,
    ToastModule
  ]
})
export class SharedModule { }

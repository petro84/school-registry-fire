import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImageCropperModule } from 'ngx-image-cropper';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AvatarModule } from 'primeng/avatar';
import { KnobModule } from 'primeng/knob';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule  } from 'primeng/inputmask';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';

import { HeaderComponent } from './header/header.component';
import { TeacherStudentFormComponent } from './teacher-student-form/teacher-student-form.component';
import { LoginComponent } from './admin/login/login.component';
import { SignupComponent } from './admin/signup/signup.component';
import { PhotoEditorComponent } from './photo-editor/photo-editor.component';

@NgModule({
  declarations: [
    HeaderComponent,
    TeacherStudentFormComponent,
    LoginComponent,
    SignupComponent,
    PhotoEditorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ButtonModule,
    TableModule,
    AvatarModule,
    KnobModule,
    DividerModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    InputMaskModule,
    MessageModule,
    ToastModule,
    AutoCompleteModule,
    DialogModule,
    MessagesModule,
    ImageCropperModule
  ],
  exports: [
    HeaderComponent,
    TeacherStudentFormComponent,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ButtonModule,
    TableModule,
    AvatarModule,
    KnobModule,
    DividerModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    InputMaskModule,
    MessageModule,
    ToastModule,
    AutoCompleteModule,
    DialogModule,
    MessagesModule,
  ]
})
export class SharedModule { }

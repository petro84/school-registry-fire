import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AdminService } from '../../../services/admin.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'sr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Input() showLoginDialog!: boolean;
  @Output() closeDialog = new EventEmitter<any>();

  form!: FormGroup;

  constructor(private fb: FormBuilder, private adminSvc: AdminService, private msgSvc: MessageService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  verifyCredentials(formValues: any) {
    this.adminSvc
      .signIn(formValues['email'], formValues['password'])
      .then(() => this.close())
      .catch((err) => this.msgSvc.add({ severity: 'error', summary: 'Invalid Credentials', detail: 'Username/Password incorrect' }));
  }

  close() {
    this.msgSvc.clear();
    this.form.reset();
    this.closeDialog.emit();
  }
}

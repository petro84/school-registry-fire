import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { AdminService } from '../../../services/admin.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'sr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Input() showRegisterDialog!: boolean;
  @Output() closeDialog = new EventEmitter<any>();

  form!: FormGroup;

  constructor(private fb: FormBuilder, private adminSvc: AdminService, private msgSvc: MessageService) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        email: [
          null,
          {
            validators: [Validators.required, Validators.email],
            updateOn: 'blur',
          },
        ],
        password: [
          null,
          {
            validators: [
              Validators.required,
              Validators.pattern(
                /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
              ),
            ],
            updateOn: 'blur',
          },
        ],
        confirmPassword: [
          null,
          {
            validators: [
              Validators.required,
              Validators.pattern(
                /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
              ),
            ],
            updateOn: 'blur',
          },
        ],
      },
      { validator: this.MatchingPasswords }
    );
  }

  createAccount(formValues: any) {
    const displayName = formValues['firstName'] + ' ' + formValues['lastName'];

    this.adminSvc
      .signUp(formValues['email'], formValues['password'], displayName)
      .then(() => {
        this.msgSvc.add({
          severity: 'sucess',
          summary: 'Success',
          detail: 'Account successfully created!'
        })
        this.close();
      })
      .catch((err) => this.msgSvc.add({ severity: 'error', summary: err.code, detail: err.message}));
  }

  close() {
    this.msgSvc.clear();
    this.form.reset();
    this.closeDialog.emit();
  }

  MatchingPasswords(c: AbstractControl) {
    let pwd = c.get('password');
    let cpwd = c.get('confirmPassword');

    return pwd.value === cpwd.value ? null : { not_matching: true };
  }
}

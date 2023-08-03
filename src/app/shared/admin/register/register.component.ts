import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { AdminService } from '../../../services/admin.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'sr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Input() showRegisterDialog!: boolean;
  @Output() closeDialog = new EventEmitter<any>();

  form!: FormGroup;

  constructor(private fb: FormBuilder, private adminSvc: AdminService) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        password: [
          null,
          [
            Validators.required,
            Validators.pattern(
              /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
            ),
          ],
        ],
        confirmPassword: [
          null,
          [
            Validators.required,
            Validators.pattern(
              /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
            ),
          ],
        ],
      },
      { validator: this.MatchingPasswords('password', 'confirmPassword') }
    );
  }

  createAccount(formValues: any) {
    const displayName = formValues['firstName'] + ' ' + formValues['lastName'];

    this.adminSvc
      .signUp(formValues['email'], formValues['password'], displayName)
      .then(() => {
        console.log('success');
        this.close();
      })
      .catch((err) => console.error(err));
  }

  close() {
    this.form.reset();
    this.closeDialog.emit();
  }

  MatchingPasswords(control: string, matchingControl: string) {
    return (formGroup: FormGroup) => {
      const ctrl = formGroup.controls[control];
      const mctrl = formGroup.controls[matchingControl];

      if (ctrl.value !== mctrl.value && mctrl.value !== '') {
        mctrl.setErrors({ not_matching: true });
      } else {
        mctrl.setErrors(null);
      }
    };
  }
}

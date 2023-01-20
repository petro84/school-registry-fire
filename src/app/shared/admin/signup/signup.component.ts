import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'sr-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @Input() showDialog!: boolean;
  @Output() closeDialog = new EventEmitter<any>();

  form!: FormGroup;

  constructor(private fb: FormBuilder, private msgSvc: MessageService, private adminSvc: AdminService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  createAccount(formValues: any) {
    this.adminSvc.signUp(formValues['email'], formValues['password']).then(() => {
      this.msgSvc.add({
        severity: 'sucess',
        summary: 'Success!',
        detail: 'Admin account created!'
      });
      this.close();
    }).catch(err => this.msgSvc.add({ severity: 'error', summary: err.code, detail: err.message }))
  }

  close() {
    this.msgSvc.clear();
    this.form.reset();
    this.closeDialog.emit();
  }

}

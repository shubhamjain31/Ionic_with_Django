import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  credentials: FormGroup;

  constructor(private fb: FormBuilder, private alertController: AlertController, private router: Router, private loadingController: LoadingController) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      first_name:       ['', [Validators.required]],
      last_name:        ['', [Validators.required]],
      email:            ['', [Validators.required, Validators.email]],
      mobile:           ['', [Validators.required]],
      password:         ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', [Validators.required, Validators.minLength(8)]],
    }, { validators: this.checkPasswords });
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password').value;
    let confirmPass = group.get('confirm_password').value
    return pass === confirmPass ? null : { notSame: true }
  }

  // Easy access for form fields
  get first_name() {
    return this.credentials.get('first_name');
  }

  get last_name() {
    return this.credentials.get('last_name');
  }

  get email() {
    return this.credentials.get('email');
  }

  get mobile() {
    return this.credentials.get('mobile');
  }
  
  get password() {
    return this.credentials.get('password');
  }

  get confirm_password() {
    return this.credentials.get('confirm_password');
  }

  register(){
    console.log(this.credentials.value)
  }

}

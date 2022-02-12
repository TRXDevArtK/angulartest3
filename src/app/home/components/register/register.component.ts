import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  formNotf = '';

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    //do something on start
  }

  onSubmit(){
    if(this.registerForm.status === 'INVALID'){
      return this.formNotf = 'Tolong masukkan data dengan benar';
    }

    if(this.registerForm.get('password').value !== this.registerForm.get('confirmPassword').value){
      return this.formNotf = 'Tolong password dan confirm password harus sama';
    }

    this.formNotf = '';
    // return console.log(this.loginForm.value);

    this.userService.addUser(this.registerForm.value).subscribe(data => this.formNotf = data.message);
  }

}

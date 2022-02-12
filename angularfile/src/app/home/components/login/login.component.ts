import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Observable,Subject } from 'rxjs';
import { UserNotf } from '../../interface/user-notf';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  formNotf = '';
  userData = [];

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    //do something on start
  }

  onSubmit(){
    if(this.loginForm.status === 'INVALID'){
      return this.formNotf = 'Tolong masukkan data dengan benar';
    }

    this.formNotf = '';
    // return console.log(this.loginForm.value);

    this.userService.checkUser(this.loginForm.value).subscribe(
      data => {
        this.formNotf = data.message;
        localStorage.setItem('userId', data.data.userid);
        localStorage.setItem('userName', data.data.username);
        localStorage.setItem('loginStatus', data.status);

        //don't forget to set data user to UI
        this.userData = [data.data.userid, data.data.username];
    });
  }
}

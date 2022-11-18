import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient, User } from 'src/app/models/app-user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user : User = {
    password: '',
    firstName:  '',
    lastName: '',
    email: '',
    sex: true,
    age: 0,
    phoneNumber: '',
  }
  patient: Patient = {user: this.user,
                      job: ''}

  file: File = null as any;
  
  constructor(public accountService: AccountService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onFileSelected(event:any){
    this.file = event.target.files[0];
  }


  register(){
    this.accountService.register(this.patient,this.file)
    .subscribe(response => {
        alert("đăng ký người dùng thành công")
        this.router.navigate(['login']);
    },
    error => {
      alert(error.error.message)
    console.log(error)}
    )
  }

}

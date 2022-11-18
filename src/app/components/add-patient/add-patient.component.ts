import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient, User } from 'src/app/models/app-user';
import { AccountService } from 'src/app/services/account.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

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
  
  constructor(public patientService : PatientService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onFileSelected(event:any){
    this.file = event.target.files[0];
  }


  addPatient(){
    this.patientService.addPatient(this.patient,this.file)
    .subscribe(response => {
        alert("thêm người dùng thành công")
        this.router.navigate(['/admin-patients']);
    },
    error => {
      alert(error.error.message)
    console.log(error)}
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient, User } from 'src/app/models/app-user';
import { AccountService } from 'src/app/services/account.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent implements OnInit {

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

  id: number = 0;
  
  constructor(public patientService : PatientService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log(this.id)
    this.patientService.getDetailPatient(this.id).subscribe(patient => {
      this.patient.job = patient.job;
      this.user.age = patient.user.age;
      this.user.firstName =patient.user.firstName;
      this.user.lastName = patient.user.lastName;
      this.user.phoneNumber = patient.user.phoneNumber;
      this.user.sex = patient.user.sex;
    })
  }

  onFileSelected(event:any){
    this.file = event.target.files[0];
  }


  updatePatient(){
    this.patientService.updatePatient(this.patient,this.file,this.id)
    .subscribe(response => {
        alert("cập nhật thông tin người dùng thành công")
        this.router.navigate(['/admin-patients']);
    },
    error => {
      alert(error.error.message)
    console.log(error)}
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor, DoctorPost, User, UserPost } from 'src/app/models/doctor';
import { Specialty } from 'src/app/models/specialty';
import { DoctorService } from 'src/app/services/doctor.service';
import { SpecialtyService } from 'src/app/services/specialty.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {

  user: UserPost = {
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    sex: true,
    age:  0,
    phoneNumber: ''
  }
  doctor : DoctorPost = {
    user: this.user,
    experience: '',
    description:  '',
    specialty:  0
  }

  specialties: Specialty[] =[]

  file: File = null as any;

  constructor(private doctorService: DoctorService,
              private specialtyService: SpecialtyService,
              private router: Router) { }

  ngOnInit(): void {
    this.getSpecialty();
  }

  onFileSelected(event:any){
    this.file = event.target.files[0];
  }

  getSpecialty(){
    this.specialtyService.getSpecialties().subscribe(specialties=>{
      this.specialties =specialties
    })
  }

  addDoctor(){
    console.log(this.doctor)
    this.doctorService.addDoctor(this.doctor,this.file)
    .subscribe(response => {
        alert("thêm bác sĩ thành công")
        this.router.navigate(['admin-doctors']);
    },
    error => {
      alert(error.error.message)
    console.log(error)}
    )
  }

}

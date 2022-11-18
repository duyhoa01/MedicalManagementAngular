import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor, DoctorPost, User, UserPost } from 'src/app/models/doctor';
import { Specialty } from 'src/app/models/specialty';
import { DoctorService } from 'src/app/services/doctor.service';
import { SpecialtyService } from 'src/app/services/specialty.service';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.css']
})
export class EditDoctorComponent implements OnInit {

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

  id: number = 0

  constructor(private doctorService: DoctorService,
              private specialtyService: SpecialtyService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.getSpecialty();
    this.doctorService.getMemberDetail(this.id).subscribe(doctor => {
      this.doctor.experience = doctor.experience;
      this.doctor.description = doctor.description;
      this.doctor.specialty = doctor.specialty_id;
      this.user.age = doctor.user.age;
      this.user.firstName =doctor.user.firstName;
      this.user.lastName = doctor.user.lastName;
      this.user.phoneNumber = doctor.user.phoneNumber;
      this.user.sex = doctor.user.sex;
      console.log(doctor.specialty)
    })
  }

  onFileSelected(event:any){
    this.file = event.target.files[0];
  }

  getSpecialty(){
    this.specialtyService.getSpecialties().subscribe(specialties=>{
      this.specialties =specialties
    })
  }

  updateDoctotr(){
    console.log(this.doctor)
    this.doctorService.updateDoctor(this.doctor,this.file, this.id)
    .subscribe(response => {
        alert("cập nhật thông tin bác sĩ thành công")
        this.router.navigate(['admin-doctors']);
    },
    error => {
      alert(error.error.message)
    console.log(error)}
    )
  }

  isSelected(a: any,b: any ): boolean { 
    return a === b;
 }

}

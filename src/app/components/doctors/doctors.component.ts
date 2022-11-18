import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor';
import { Specialty } from 'src/app/models/specialty';
import { DoctorService } from 'src/app/services/doctor.service';
import { SpecialtyService } from 'src/app/services/specialty.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  doctors : Doctor[] =[]
  specialties : Specialty[] = []
  key: string | null = ''
  page: number = 0;
  count: number = 0;
  size: number = 3;
  specialty: number = 0;
  
  constructor(private doctorService: DoctorService,
              private specialtyService: SpecialtyService) { }

  ngOnInit(): void {
    this.getDoctor(this.page);
    this.getSpecialty();
  }

  getDoctor(page:number){
    this.doctorService.getMembers(this.key,this.specialty,page,this.size).subscribe(doctor => {
      if(doctor.page.totalElements == 0){
        this.doctors = []
      } else{
        this.doctors = doctor._embedded.doctors;
        this.count = doctor.page.totalPages;
      }
    });
  }

  getSpecialty(){
    this.specialtyService.getSpecialties().subscribe(specialties=>{
      this.specialties =specialties
    })
  }

}

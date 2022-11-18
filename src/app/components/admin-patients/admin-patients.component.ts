import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientResponse } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-admin-patients',
  templateUrl: './admin-patients.component.html',
  styleUrls: ['./admin-patients.component.css']
})
export class AdminPatientsComponent implements OnInit {

  key: string | undefined = ''
  page: number = 0;
  count: number | undefined = undefined;
  size: number = 2;
  x: number | undefined = undefined;

  patients : PatientResponse[] =[]

  constructor(private patientService: PatientService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getListPatient();
  }

  getListPatient() {
    this.route.queryParams.subscribe(params => {
      this.key = params['key'];
      this.page = params['page'];
      this.size = params['size'];
    });

    if(!this.page){
      this.page =0;
    }

    if(!this.size){
      this.size =5;
    }

    this.patientService.getListPatient(this.key,this.page,this.size).subscribe(response =>{
      if(response.page.totalElements == 0){
        this.patients = []
      } else{
        this.patients = response._embedded.patients;
        this.count = response.page.totalPages;
        this.x = response.page.totalPages -1
      }
    })
  }

  deletePatient(id: number){
    if(confirm("Are you sure to delete "+id)) {
      this.patientService.deletePatient(id).subscribe(
        response => {
          alert(response.message)
          this.getListPatient()
        },
        error => alert(error.message)
      )
    }
  }

}

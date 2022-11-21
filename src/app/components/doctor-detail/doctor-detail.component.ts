import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import { User, Doctor } from 'src/app/models/doctor';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.css']
})
export class DoctorDetailComponent implements OnInit {

  doctor: Doctor = new Doctor();

  id: number = 0;
  constructor(private doctorService: DoctorService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log(this.id)
    this.doctorService.getMemberDetail(this.id).subscribe(doctor => {
      this.doctor = doctor
      console.log(this.doctor)
    })
  }

}

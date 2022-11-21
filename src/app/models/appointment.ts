export class AppointmentPost {
    doctor_id:number=0;
    patient_id:number=2;
    date: Date =new Date();
    symptoms:string='';
}

export class Appointment{
    id: number = 0;
    patient:string = "Nguyễn Văn Tiến";
    patient_id:number= 2;
    doctor:string ="Nguyễn Văn A";
    doctor_id:number= 3;
    cost:number= 100000.0;
    date: string ="2022-11-20T20:39:51";
    symptoms: string ="dau bung";
    status:boolean= true;
}
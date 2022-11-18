import { Links, User } from "./doctor";

export class PatientResponse{
    id : number = 0;
    job : string ='';
    user : User = new User();
    _links: Links =new Links();
}
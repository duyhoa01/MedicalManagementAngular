
export class User {
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    sex: boolean = true;
    age: number = 0;
    phoneNumber: string = '';
    status: boolean = true;
    image: string = '';
}

export class Self {
    href: string = '';
}

export class Links {
    self: Self = new Self();
}

export class Doctor {
    id: number = 0;
    user: User = new User();
    experience: string = '';
    rate: number = 0;
    description: string = '';
    specialty: string = '';
    specialty_id: number = 0;
    _links: Links =new Links();
}

export class UserPost{
    password: string = ''
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    sex: boolean = true;
    age: number = 0;
    phoneNumber: string = '';
}

export class DoctorPost {
    user : UserPost = new UserPost();
    experience: string = '';
    description: string = '';
    specialty: number = 0;
}
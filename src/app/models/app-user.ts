export class UserToken {
    email: string = '';
    access_token: string = '';
    refresh_token: string = '';
    firstname:string = '';
    lastname:string = '';
    role: string = '';
    user_id: string = '';
    id: number = 0;
    image: string = '';
}

export class AuthUser {
    email: string = '';
    password: string = '';
}

export class User {
    password: string = '';
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    sex:  boolean = true;
    age: number = 0;
    phoneNumber: string = '';
}

export class Patient {
    user: User = new User();
    job: String = '';
}
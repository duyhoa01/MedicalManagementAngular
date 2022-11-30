export class messageResponse {
    id: number=0;
    message: string ="";
    sender_name:string = "";
    sender: string = "";
    receiver_name: string = "";
    receiver: string = "";
    date: Date = new Date();
    image: string = '';
}

export class messagePost{

    message: string = '';

    image: string = '';

    sender: string = '';

    receiver: string = '';
}
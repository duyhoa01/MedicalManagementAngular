import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserToken } from 'src/app/models/app-user';
import { User } from 'src/app/models/doctor';
import { messageResponse, messagePost } from 'src/app/models/message';
import { AccountService } from 'src/app/services/account.service';
import { MessageService } from 'src/app/services/message.service';
import { StompService } from 'src/app/services/stomp.service';
import { UserService } from 'src/app/services/user.service';
import { DOCUMENT } from '@angular/common'; 

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit {

  username: String = '';
  currentUser: UserToken = new UserToken();
  users: User[] = [];
  messages: messageResponse[] = [];
  text: string = '';
  messResponse: messageResponse = new messageResponse();

  receiver: number = 0;
  receiver_name: string = '';

  _documnet: any;

  constructor(private stompService: StompService,
    public accountService: AccountService,
    private userService: UserService,
    private route: ActivatedRoute,
    private messafeService: MessageService,
    @Inject(DOCUMENT) document: Document) { 
      this._documnet =document;
    }

  ngOnInit(): void {
    this.receiver = this.route.snapshot.params["id"];
    
    this.accountService.currentUser$.forEach((user) => {
      if (user) {
        this.currentUser = user
      }
    })
    this.stompService.subscribe('/user/' + this.currentUser.user_id + '/private', (response: any) => {
      let res = JSON.parse(response.body);
      this.updateInfor(res);
    });
    this.userService.getListUserChat(this.currentUser.user_id).subscribe(response => {
      this.users = response;
      console.log(this.users)
    })
    console.log(this.receiver);
    this.getLisMessage(this.receiver);
    this.getNameReceiverById(this.receiver);
  }

  sendMesssage() {
    let chatMessage: messagePost = {
      sender: this.currentUser.user_id + "",
      receiver: this.receiver + "",
      message: this.text,
      image: ''
    };
    this.messafeService.addMessage(chatMessage).subscribe(
      response => {
        this.messages.push(JSON.parse(response));
        this.stompService.sendPrivateValue("/app/private-message", JSON.parse(response));
      },
      error => {
        alert(error.error.message)
        console.log(error)
      })
  }

  getLisMessage(id: number) {
    this.messafeService.getListMessage(this.currentUser.user_id, id).subscribe(response => {
      if (response.page.totalElements == 0) {
        this.messages = []
      } else {
        this.messages = response._embedded.messages.reverse();;
      }
    })
  }

  checkSend(id: string) {
    if (this.currentUser.user_id == Number(id)) return true;
    return false;
  }

  getNameReceiverById(id:number){
    this.userService.getNameById(id).subscribe(response => {
      this.receiver_name = response.message;
      console.log("name "+response)
    })
  }

  updateInfor(res: any){
    console.log(this.route.snapshot.params["id"]);
    if(this.route.snapshot.params["id"] == Number(res.sender)){
      this.messages.push(res);
    } else{
      this._documnet.getElementById(res.sender).style.color='red';
    }
  }

}

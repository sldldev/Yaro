import {Component, ElementRef, OnInit, ViewChild, AfterViewChecked} from '@angular/core';
import {AuthenticationService} from '../../Services/auth.service';
import {Users} from '../../DataModules/users.model';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import {Observable} from 'rxjs';
import {ChatMessage} from '../../DataModules/chat-message.model';
import {ChatService} from '../../Services/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit, AfterViewChecked {
  @ViewChild('scroller') private feedContainer: ElementRef;
  message: string;
  messageToSend: ChatMessage;
  receiverId: string;
  user: Users | null = null;


  constructor(private route: ActivatedRoute, private authService: AuthenticationService, private chatService: ChatService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.receiverId = params.get('id');
      this.authService.getUserById(this.receiverId).subscribe(albumData => this.user = albumData);
    });
    /*    this.route.params.subscribe(params => {
          console.log(params);
          this.receiverId = params.id;
        });*/
/*    console.log('Id we sending' + this.receiverId);
    this.authService.getUserById(this.receiverId).subscribe(albumData => this.user = albumData);*/
  }

  ngAfterViewChecked() {
    this.scrollToBottom();

  }

  scrollToBottom(): void {
    this.feedContainer.nativeElement.scrollTop = this.feedContainer.nativeElement.scrollHeight;
  }

  sendMessage() {
    this.messageToSend = {
      Id: '',
      senderId: '',
      receiverId: this.user._id,
      senderName: this.authService.getUserName(),
      receiverName: this.user.firstName + ' ' + this.user.lastName,
      body: this.message,
      isRead: false,
      createdAt: ''
    };
    console.log(JSON.stringify(this.messageToSend));
    this.message = '';
    this.chatService.sendMessage(this.messageToSend);
  }

}

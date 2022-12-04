import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewChecked,
  HostListener,
} from '@angular/core';
import { AuthenticationService } from '../../Services/auth.service';
import { Users } from '../../DataModels/users.model';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatMessage } from '../../DataModels/chat-message.model';
import { ChatService } from '../../Services/chat.service';
import { ErrorComponent } from 'src/app/Dialogs/error/error.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss'],
})
export class ChatFormComponent implements OnInit, AfterViewChecked {
  @ViewChild('scroller') private feedContainer: ElementRef;
  message: string = '';
  messageToSend: ChatMessage;
  receiverId: string;
  receiverUser: Users | null = null;


  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private chatService: ChatService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    console.log(`ChatFormComponent.OnInit()`);
    this.route.paramMap.subscribe((params: ParamMap) => {
     
      this. receiverId = params.get('id');

      console.log(`this. receiverId: ${this. receiverId}`);
      if (this.receiverId !== 'main') {
        this.authService.getUserById(this.receiverId)
          .subscribe((userData) =>{
            console.warn(` getUserById returned data: ${userData}`);
            console.dir(userData);
            this.receiverUser = userData;
            
            console.log(`userData:`)
            console.warn(` getUserById returned data: ${userData}`);
          });
      }
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    this.feedContainer.nativeElement.scrollTop =
      this.feedContainer.nativeElement.scrollHeight;
  }

  sendMessage() {
    if(this.message && this.message.length > 0){
      this.messageToSend = {
        id: '',
        senderId: this.authService.getUserID(),
        SenderName: this.authService.getUserName(),
  
        receiverId: this.receiverUser.id, // this.user.objId,
        receiverName: this.receiverUser.firstName + ' ' + this.receiverUser.lastName,
        body: this.message,
        isRead: false,
        dateCreated: '',
      };
      console.log(JSON.stringify(this.messageToSend));
      this.message = '';
      this.chatService.sendMessage(this.messageToSend);
    } else {
      const dialogRef = this.dialog.open(ErrorComponent, {
        // we init dialog to ask user if he sure he want to delete
        // and pass the album name to the dialog
        data: {
          message: 'Message field is empty.\nWrite something to send it.'
        }
      });
    }
    
  }

  // @HostListener('window:keyup', ['$event'])
  // keyEvent(event: KeyboardEvent) {
  //   if(event.key == 'Control + Enter'){
  //     // Your row selection code
  //     console.log(event.key);
  //   }
  // }

  @HostListener('keydown.Control.Enter', ['$event'])
  onKeyDown(e) {
    // optionally use preventDefault() if your combination
    // triggers other events (moving focus in case of Shift+Tab)
    // e.preventDefault();
    console.log(`'Control and Enter' ${e}`);
    this.sendMessage();
  }
}

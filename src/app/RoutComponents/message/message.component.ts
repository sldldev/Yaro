import {Component, Input, OnInit} from '@angular/core';
import {ChatMessage} from '../../DataModels/chat-message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() chatMessage: ChatMessage;
  @Input() userObjId: string;
  
  
  resObjId: string;

  senderName: string;
  messageContent: string;
  timeStamp: string;

  constructor() {
  }

  ngOnInit(chatMessage = this.chatMessage) {
    console.log(this.userObjId);
    console.dir(chatMessage);
    this.senderName = chatMessage.SenderName;
    this.messageContent = chatMessage.body;
    this.timeStamp = chatMessage.dateCreated;
    this.resObjId = chatMessage.receiverId;
  }
  isMyMessage(){
    return this.resObjId===this.userObjId? 'reply-message': '';
  }

}

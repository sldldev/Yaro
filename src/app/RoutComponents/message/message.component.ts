import {Component, Input, OnInit} from '@angular/core';
import {ChatMessage} from '../../DataModules/chat-message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() chatMessage: ChatMessage;
  @Input() userID: string;
  id: string;
  senderName: string;
  messageContent: string;
  timeStamp: string;

  constructor() {
  }

  ngOnInit(chatMessage = this.chatMessage) {
    console.dir(chatMessage);
    this.senderName = chatMessage.senderName;
    this.messageContent = chatMessage.body;
    this.timeStamp = chatMessage.createdAt;
    this.id = chatMessage.receiverId;
  }

}

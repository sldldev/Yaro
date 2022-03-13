import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import {ChatService} from '../../Services/chat.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs';
import {ChatMessage} from '../../DataModules/chat-message.model';

@Component({
  selector: 'app-message-feed',
  templateUrl: './message-feed.component.html',
  styleUrls: ['./message-feed.component.scss']
})
export class MessageFeedComponent implements OnInit{
  receiver: string;
  messages: Observable<ChatMessage[]>;
  @ViewChild('scroller') private feedContainer: ElementRef;

  constructor(private route: ActivatedRoute, private chatService: ChatService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      console.log(params.get('id'));
      this.receiver = params.get('id');
      this.chatService.getConversation(this.receiver);
      this.messages = this.chatService.getMessagetUpdateListener();
    });
  }

}

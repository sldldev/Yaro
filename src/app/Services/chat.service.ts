import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Album} from '../DataModules/album.model';
import {ChatMessage} from '../DataModules/chat-message.model';
import {map, tap} from 'rxjs/operators';
import {host} from '../globals';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messages: ChatMessage[] = []; // albums array
  private message: ChatMessage;
  private unreadMessageSize: number;
  private unreadMessageSizeUpdated = new Subject<number>();
  private messageUpdated = new Subject<ChatMessage[]>();
  public currentlocalhost = 'https://localhost:5001';

  constructor(private http: HttpClient) {
  }

  /**
   * method responsible to get message observable
   */
  getMessagetUpdateListener() {
    return this.messageUpdated.asObservable();
  }

  /**
   * method responsible to get unread message listner
   */
  getUnreadMessageListner() {
    return this.unreadMessageSizeUpdated.asObservable();
  }

  /**
   *
   * @param msg method responsible to send message
   */
  sendMessage(msg: ChatMessage) {
    this.http.post(host + '/api/message/message/', msg)
      .pipe(tap(console.log), map((serverResponse => serverResponse)))
      .subscribe((data) => {
        console.log('Received Data:' + data);
        console.dir(data);
        this.messages.push(data);
        this.messageUpdated.next([...this.messages]);
      });
  }

  /**
   *
   * @param receiverID method responsible to get all messages
   */
  getConversation(receiverID) {
    this.http.get(host + '/api/message/messages/' + receiverID)
      .pipe(tap(console.log), map(serverResponse => serverResponse)) // we re-edit the information to remove the  messages
      .subscribe(files => {
          this.messages = files;
          console.log(JSON.stringify(this.messages));
          this.messageUpdated.next(this.messages);
          this.getUnreadMessageSize();// we return the information trough observable
        }
      );
  }

  /**
   * method responsible to get number of unread messages
   */
  getUnreadMessageSize() {
    this.http.get(host + '/api/message/unread_messages/' + 'something')
      .pipe(tap(console.log), map(serverResponse => serverResponse)) // we re-edit the information to remove the  messages
      .subscribe(files => {
          this.unreadMessageSize = files;
          console.log(JSON.stringify(this.unreadMessageSize));
          this.unreadMessageSizeUpdated.next(this.unreadMessageSize); // we return the information trough observable
        }
      );
  }
}

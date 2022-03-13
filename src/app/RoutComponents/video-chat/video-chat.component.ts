import {Component, OnDestroy, OnInit, ViewChild, ElementRef} from '@angular/core';

import {Subscription} from 'rxjs';
import {ChatMessage, PeerData, SignalInfo, UserInfo} from '../../DataModules/video.model';
import {VideoService} from '../../Services/video.service';
import {RtcService} from '../../Services/rtc.service';


@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.css']
})
export class VideoChatComponent implements OnInit, OnDestroy {

  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  @ViewChild('videoPlayerUser') videoPlayerUser: ElementRef;

  public subscriptions = new Subscription();

  private stream;

  public currentUser: string;

  public dataString: string;

  public userVideo: string;

  public messages: Array<ChatMessage>;

  public mediaError = (): void => {
    console.error(`Can't get user media`);
  };

  constructor(private rtcService: RtcService, private signalR: VideoService) {
  }

  ngOnInit() {
    this.messages = new Array();

    this.subscriptions.add(this.signalR.newPeer$.subscribe((user: UserInfo) => {
      this.rtcService.newUser(user);
      this.signalR.sayHello(this.currentUser, user.connectionId);
    }));

    this.subscriptions.add(this.signalR.helloAnswer$.subscribe((user: UserInfo) => {
      this.rtcService.newUser(user);
    }));

    this.subscriptions.add(this.signalR.disconnectedPeer$.subscribe((user: UserInfo) => {
      this.rtcService.disconnectedUser(user);
    }));

    this.subscriptions.add(this.signalR.signal$.subscribe((signalData: SignalInfo) => {
      this.rtcService.signalPeer(signalData.user, signalData.signal, this.stream);
    }));

    this.subscriptions.add(this.rtcService.onSignalToSend$.subscribe((data: PeerData) => {
      this.signalR.sendSignalToUser(data.data, data.id);
    }));

    this.subscriptions.add(this.rtcService.onData$.subscribe((data: PeerData) => {
      this.messages = [...this.messages, {own: false, message: data.data}];
      console.log(`Data from user ${data.id}: ${data.data}`);
    }));

    this.subscriptions.add(this.rtcService.onStream$.subscribe((data: PeerData) => {
      this.userVideo = data.id;
      this.videoPlayer.nativeElement.srcObject = data.data;
      this.videoPlayer.nativeElement.load();
      this.videoPlayer.nativeElement.play();
    }));
  }


  public onUserSelected(userInfo: UserInfo) {
    console.clear();
    console.log('PRINTI ' + userInfo.userName);
    const peer = this.rtcService.createPeer(this.stream, userInfo.connectionId, true);
    this.rtcService.currentPeer = peer;
  }

  public async saveUsername(): Promise<void> {
    try {
      await this.signalR.startConnection(this.currentUser);
      this.stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
      this.videoPlayerUser.nativeElement.stream(this.stream);
    } catch (error) {
      console.error(`Can't join room, error ${error}`);
    }
  }

  public sendMessage() {
    console.clear();
    console.log(this.dataString);
    this.rtcService.sendMessage(this.dataString);
    this.messages = [...this.messages, {own: true, message: this.dataString}];
    this.dataString = null;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}




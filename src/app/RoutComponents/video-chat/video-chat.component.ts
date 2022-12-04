import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
} from "@angular/core";

import { Observable, Subscription } from "rxjs";
import {
  ChatMessage,
  PeerData,
  SignalInfo,
  UserInfo,
} from "../../DataModels/video.model";
import { VideoService } from "../../Services/video.service";
import { RtcService } from "../../Services/rtc.service";
import { FollowService } from "src/app/Services/follow.service";
import { Users } from "src/app/DataModels/users.model";
import { AuthenticationService } from "src/app/Services/auth.service";

@Component({
  selector: "app-video-chat",
  templateUrl: "./video-chat.component.html",
  styleUrls: ["./video-chat.component.css"],
})
export class VideoChatComponent implements OnInit, OnDestroy {
  @ViewChild("videoPlayer") videoPlayer: ElementRef;
  @ViewChild("videoPlayerUser") videoPlayerUser: ElementRef;

  // public options?: Users[];
  // public users: Observable<Users[]>;

  public subscriptions = new Subscription();

  private stream;

  public userName:string;
  public isOnline:boolean = false;
  //public currentUser: string;

  public dataString: string;

  public userVideo: string;

  public messages: Array<ChatMessage>;

  public mediaError = (): void => {
    console.error(`Can't get user media`);
  }


  constructor(
    private authService:  AuthenticationService,
    private rtcService: RtcService,
    private signalR: VideoService) {}

  ngOnInit() {
    this.userName = this.authService.getUserName();
    this.messages = new Array();


    this.subscriptions.add(
      this.signalR.newPeer$.subscribe((user: UserInfo) => {
        console.log(`rtcService: ${user}`);
        this.rtcService.newUser(user);
        this.signalR.sayHello(this.userName, user.connectionId);
        console.log(`signalR.sayHello: ${this.userName}, ${user.connectionId}`);
      })
    );

    this.subscriptions.add(
      this.signalR.helloAnswer$.subscribe((user: UserInfo) => {
        this.rtcService.newUser(user);
      })
    );

    this.subscriptions.add(
      this.signalR.disconnectedPeer$.subscribe((user: UserInfo) => {
        this.rtcService.disconnectedUser(user);
      })
    );

    this.subscriptions.add(
      this.signalR.signal$.subscribe((signalData: SignalInfo) => {
        this.rtcService.signalPeer(
          signalData.user,
          signalData.signal,
          this.stream
        );
      })
    );

    this.subscriptions.add(
      this.rtcService.onSignalToSend$.subscribe((data: PeerData) => {
        this.signalR.sendSignalToUser(data.data, data.id);
      })
    );

    this.subscriptions.add(
      this.rtcService.onData$.subscribe((peerData: PeerData) => {
        this.messages = [...this.messages, { ownMessage: false, message: peerData.data }];
        console.log(`Data from user ${peerData.id}: ${peerData.data}`);
      })
    );

    this.subscriptions.add(
      this.rtcService.onStream$.subscribe((data: PeerData) => {
        this.userVideo = data.id;
        this.videoPlayer.nativeElement.srcObject = data.data;
        this.videoPlayer.nativeElement.load();
        this.videoPlayer.nativeElement.play();
      })
    );
  }

  public onUserSelected(userInfo: UserInfo) {
    //console.clear();
    console.log("PRINT " + userInfo.userName);
    const otherPeer = this.rtcService.createPeer(
      this.stream,
      userInfo.connectionId,
      true
    );
    this.rtcService.currentPeer = otherPeer;
  }

  public async getOnline(): Promise<void> {
    if(this.isOnline){return;}
    try {
      
      this.isOnline = true;
      console.log(`getOnline: ${this.isOnline}`);
      await this.signalR.startConnection(this.userName);
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      this.videoPlayerUser.nativeElement.srcObject=this.stream;
      
    } catch (error) {
      console.error(`Can't join room, error ${error}`);
      this.isOnline = false;
      console.log(`getOnline: ${this.isOnline}`);
    }
  }

  public sendMessage() {
    //console.clear();
    console.log(this.dataString);
    this.rtcService.sendMessage(this.dataString);
    this.messages = [...this.messages, { ownMessage: true, message: this.dataString }];
    this.dataString = null;
  }
/* 
  public gotMedia (stream) {
    var peer1 = new Peer({ initiator: true, stream: stream })
    var peer2 = new Peer()
  
    peer1.on('signal', data => {
      peer2.signal(data)
    })
  
    peer2.on('signal', data => {
      peer1.signal(data)
    })
  
    peer2.on('stream', stream => {
      // got remote video stream, now let's show it in a video tag
      var video = document.querySelector('video')
  
      if ('srcObject' in video) {
        video.srcObject = stream
      } else {
        video.src = window.URL.createObjectURL(stream) // for older browsers
      }
  
      video.play()
    })
  }
 */
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

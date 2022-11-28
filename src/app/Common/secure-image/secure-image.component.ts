import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {map, switchMap} from 'rxjs/operators';
import {FileService} from '../../Services/files.service';
import { DownloadServiceService } from 'src/app/Services/download-service.service';

@Component({
  selector: 'app-secure-image',
  templateUrl: './secure-image.component.html',
  styleUrls: ['./secure-image.component.scss']
})
export class SecureImageComponent implements OnChanges, OnDestroy {


  @Input() src: string = '';
  imageURL:SafeUrl = '';
  image:Blob
  ngOnChanges(): void {
  
  }

  ngOnInit() {
    console.warn(this.src);
    console.warn('https://localhost:5001/api/Data/-----');
    if(this.isBase64(this.src))
    {
      this.imageURL = this.src;
    }
    //this.imageURL = this.domSanitizer.bypassSecurityTrustUrl(this.src);
    this.loadImage().subscribe(i=>
      {
        
        this.image = i
        this.imageURL = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL( this.image))
      })
}


  isBase64(src: string):boolean {
    return src.startsWith('data:image/webp;base64,');
    //throw new Error('Method not implemented.');
  }

loadImage(): Observable<Blob> {
  return this.httpClient.get(this.src
    ,
     {
  responseType: 'blob'
}
);
}
  constructor(private httpClient: HttpClient, private domSanitizer: DomSanitizer, private downladService: DownloadServiceService,) {
    // this.download(this.src);
  }
  ngOnDestroy(){
    URL.revokeObjectURL(this.imageURL.toString());
    //this.dataUrl.unsubscribe();
  }  
}

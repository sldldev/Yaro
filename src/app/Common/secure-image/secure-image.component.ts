import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {DomSanitizer} from '@angular/platform-browser';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {map, switchMap} from 'rxjs/operators';
import {FileService} from '../../Services/files.service';


@Component({
  selector: 'app-secure-image',
  templateUrl: './secure-image.component.html',
  styleUrls: ['./secure-image.component.scss']
})
export class SecureImageComponent implements OnChanges {


  @Input() src: string;
  private src$ = new BehaviorSubject<any>(this.src);
  //public dataUrl = this.src$.pipe(switchMap(url => this.loadImage(url)));
  public dataUrl = this.src$;

  ngOnChanges(): void {
    this.src$.next(this.src);
  }

  constructor(private httpClient: HttpClient, private domSanitizer: DomSanitizer) {
  }

  private loadImage(url: string): Observable<any> {
    console.log('We are trying to reach :' + url);
    return this.httpClient.get(url, {responseType: 'blob'})
      .pipe(map((e => this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(e)))));
  }
}


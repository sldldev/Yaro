import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FileService} from '../../Services/files.service';
import {Observable} from 'rxjs';

import {AuthenticationService} from '../../Services/auth.service';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  previewUrl: string;
  photoLoad;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  spinner = false;

  constructor(private fileService: FileService, private authService: AuthenticationService) {
  }

  /**
   * Mehtod inits the current displayed avatar with current avatar
   * and inits new photo load with false value.
   */
  ngOnInit() {
    this.previewUrl = this.authService.getAvatar();
    this.photoLoad = false;
  }

  fileChangeEvent(event: any): void {
    console.log('Loading image');
    this.imageChangedEvent = event;
    this.spinner = true;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    this.photoLoad = true;
  }

  cropperReady() {
    // cropper ready
    this.spinner = false;
  }

  loadImageFailed() {
    // show message
  }

  /**
   * method responsible to send the new cropped avatar to the server
   */
  uploadImage() {
    const imageBase64 = this.croppedImage.toString();
    const byteCharacters = atob(imageBase64.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {type: 'image/png'});
    const date = new Date().getTime() / 1000;
    console.log(date);
    const file = new File([blob], this.authService.getUserID() + date + '.png', {type: 'image/png'});
    const fd = new FormData();
    fd.append('File', file);
    console.log(fd.getAll('File'));
    console.dir(fd);
    this.fileService.uploadAvatar(fd).subscribe((response) => {
      console.log('returned');
      console.log(response.url);
      this.photoLoad = false;
      this.previewUrl = response.url;
      localStorage.setItem('avatar', this.previewUrl);
      this.authService.updateAuthStatusListener();
    }); // every file in files array is send one by one
  }

  /**
   * method responsible to cancel avatar change.
   */
  reset() {
    this.ngOnInit();
  }

}

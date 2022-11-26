import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PostService} from '../../Services/post.service';
import {AuthenticationService} from '../../Services/auth.service';
import { ErrorComponent } from 'src/app/Dialogs/error/error.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  userName: string;
  post: string;

  constructor(
    private postService: PostService,
     private authService: AuthenticationService,
     private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  submitPost(form: NgForm) {
    console.log(`submitPost`);
    if(form.value.post && form.value.post > 0){
      this.userName = this.authService.getUserName();
      this.post = form.value.post;
      this.postService.addPost(this.userName, this.post);
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

}

import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PostService} from '../../Services/post.service';
import {AuthenticationService} from '../../Services/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  userName: string;
  post: string;

  constructor(private postService: PostService, private authService: AuthenticationService) {
  }

  ngOnInit() {
  }

  submitPost(form: NgForm) {
    this.userName = this.authService.getUserName();
    this.post = form.value.post;
    this.postService.addPost(this.userName, this.post);
  }

}

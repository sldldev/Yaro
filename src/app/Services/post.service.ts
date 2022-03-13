import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Post} from '../DataModules/post.model';
import {map, tap} from 'rxjs/operators';
import {host} from '../globals';

@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post[] = []; // albums array
  private post: Post;
  private postUpdated = new Subject<Post[]>(); // albumsUpdated is subject we want to observe
  public currentlocalhost = 'https://localhost:5001';

  constructor(private http: HttpClient) {
  }

  /**
   * method responsible to add post
   * @param userName
   * @param post
   */
  addPost(userName, post) {
    const request = this.http.post<{ post: Post }>(host + '/api/posts/post/', {UserName: userName, Post: post})
      .pipe(tap(console.log), map((serverResponse => serverResponse)))
      .subscribe((data) => {
        console.log('Received Data:' + data);
        console.dir(data);
        this.posts.unshift(data);
        this.postUpdated.next([...this.posts]);
        console.dir(this.posts);
      });

  }

  /**
   * method responsible to return postUpdate observable
   */
  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  /**
   * method responsible to retrieve all posts.
   */
  getAllPosts() {
    return this.http.get(host + '/api/posts/post/')
      .pipe(tap(console.log), map(serverResponse => serverResponse)) // we re-edit the information to remove the  messages
      .subscribe(files => {
          this.posts = files;
          console.log(JSON.stringify(this.posts));
          this.postUpdated.next(this.posts); // we return the information trough observable
        }
      );
  }

  /**
   * method responsible to like a spesific post.
   * @param postId
   */
  likePost(postId) {
    return this.http.post(host + '/api/posts/like/', {UserName: 'NONE!', Post: postId})
      .pipe(tap(console.log), map((serverResponse => serverResponse)))
      .subscribe((data) => {
          console.log('Received Data:' + data);
          console.dir(data);
          /*          this.posts.unshift(data);
                    this.postUpdated.next([...this.posts]);
                    console.dir(this.posts);*/
        }
      );
  }

  /**
   * method responsible to comment on spesific post
   * @param comment
   * @param postId
   */
  postComment(comment, postId) {
    return this.http.post(host + '/api/posts/comment/', {Comment: comment, PostID: postId})
      .pipe(tap(console.log), map((serverResponse => serverResponse)))
      .subscribe((data) => {
          console.log('Received Data:' + data);
          console.dir(data);
          /*          this.posts.unshift(data);
                    this.postUpdated.next([...this.posts]);
                    console.dir(this.posts);*/
        }
      );
  }

  /**
   * method responsible to delete spesific post.
   * @param postID
   */
  public deletePost(postID: string) {
    this.http.delete(host + '/api/posts/delete_post/' + postID) // pass album id as parameter
      .subscribe(() => {
        console.log('deleted!');
        const updatePosts = this.posts.filter(post => post.id !== postID); // we remove the album from our list
        this.posts = updatePosts; // init the album list with the filtered list
        this.postUpdated.next([...this.posts]); // and we inform the subject and return new copy of albums array
      });
  }
}

import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AuthInterceptor} from './Interceptors/auth-interceptor';
import {ErrorInterceptor} from './Interceptors/error-interceptor';
import {ErrorComponent} from './Dialogs/error/error.component';
import {ImageDisplayComponent} from './Dialogs/image-display/image-display.component';
import {DeleteAlbumDialogComponent} from './Dialogs/delete-album-dialog/delete-album-dialog.component';
import {UIService} from './Services/ui.service';
import {AuthModule} from './ComponentModuleDependencies/auth.module';
import {MaterialModule} from './ComponentModuleDependencies/material.module';
import {HeaderModule} from './ComponentModuleDependencies/header.module';
import {MessagesModule} from './ComponentModuleDependencies/messages.module';
import {AlbumComponentsModule} from './ComponentModuleDependencies/album.components.module';
import {PostComponent} from './RoutComponents/post/post.component';
import {PostsContainerComponent} from './RoutComponents/posts-container/posts-container.component';
import {UsersComponent} from './RoutComponents/users/users.component';
import {MessageFeedComponent} from './RoutComponents/message-feed/message-feed.component';
import {ChatFormComponent} from './RoutComponents/chat-form/chat-form.component';
import {MessageComponent} from './RoutComponents/message/message.component';
import {FooterComponent} from './Components/footer/footer.component';
import {PageNotFoundComponent} from './Components/page-not-found/page-not-found.component';
import {RegisterComponent} from './Login-Register/register/register.component';
import {SettingsComponent} from './RoutComponents/settings/settings.component';
import {FollowingComponent} from './RoutComponents/following/following.component';
import {FollowersComponent} from './RoutComponents/followers/followers.component';
import {NotificationsComponent} from './RoutComponents/notifications/notifications.component';
import {MessageRecipientComponent} from './RoutComponents/message-recipient/message-recipient.component';
import {PeoplePipe} from './pipes/people-pipe';
import {ImageCropperModule} from 'ngx-image-cropper';
import {DatePipe} from '@angular/common';
import {VideoChatComponent} from './RoutComponents/video-chat/video-chat.component';
import {VideoUserListComponent} from './RoutComponents/video-user-list/video-user-list.component';
import {ShareSelectedDialogComponent} from './Dialogs/share-selected-dialog/share-selected-dialog.component';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatAutocompleteModule} from '@angular/material';
import {MoveSelectedDialogComponent} from './Dialogs/move-selected-dialog/move-selected-dialog.component';
import {NewAlbumDialogComponent} from './Dialogs/new-album-dialog/new-album-dialog.component';


// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostsContainerComponent,
    UsersComponent,
    MessageFeedComponent,
    ChatFormComponent,
    MessageComponent,
    FooterComponent,
    PageNotFoundComponent,
    RegisterComponent,
    SettingsComponent,
    FollowingComponent,
    FollowersComponent,
    NotificationsComponent,
    MessageRecipientComponent,
    PeoplePipe,
    VideoChatComponent,
    VideoUserListComponent,
    ShareSelectedDialogComponent,
    MoveSelectedDialogComponent,
    NewAlbumDialogComponent,

  ],
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    MaterialModule,
    HeaderModule,
    MessagesModule,
    AlbumComponentsModule,
    ImageCropperModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  providers: [UIService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent, ImageDisplayComponent, DeleteAlbumDialogComponent, ShareSelectedDialogComponent, MoveSelectedDialogComponent, NewAlbumDialogComponent],
})
export class AppModule {
}

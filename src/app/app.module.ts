import { BrowserModule } from '@angular/platform-browser';
import {NgModule,  NO_ERRORS_SCHEMA } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './Interceptors/auth-interceptor';
import { ErrorInterceptor } from './Interceptors/error-interceptor';
import { ErrorComponent } from './Dialogs/error/error.component';
import { ImageDisplayComponent } from './Dialogs/image-display/image-display.component';
import { DeleteAlbumDialogComponent } from './Dialogs/delete-album-dialog/delete-album-dialog.component';
import { UIService } from './Services/ui.service';
import { AuthModule } from './ComponentModuleDependencies/auth.module';
import { MaterialModule } from './ComponentModuleDependencies/material.module';
import { HeaderModule } from './ComponentModuleDependencies/header.module';
import { MessagesModule } from './ComponentModuleDependencies/messages.module';
import { AlbumComponentsModule } from './ComponentModuleDependencies/album.components.module';
import { PostComponent } from './RoutComponents/post/post.component';
import { PostsContainerComponent } from './RoutComponents/posts-container/posts-container.component';
import { UsersComponent } from './RoutComponents/users/users.component';
import { MessageFeedComponent } from './RoutComponents/message-feed/message-feed.component';
import { ChatFormComponent } from './RoutComponents/chat-form/chat-form.component';
import { MessageComponent } from './RoutComponents/message/message.component';
import { FooterComponent } from './Components/footer/footer.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';

import { RegisterComponent } from './Login-Register/register/register.component';
import { SettingsComponent } from './RoutComponents/settings/settings.component';
import { FollowingComponent } from './RoutComponents/following/following.component';
import { FollowersComponent } from './RoutComponents/followers/followers.component';
import { NotificationsComponent } from './RoutComponents/notifications/notifications.component';
import { MessageRecipientComponent } from './RoutComponents/message-recipient/message-recipient.component';
import { ImageCropperModule } from 'ngx-image-cropper';
// import { DatePipe } from '@angular/common';
import { VideoChatComponent } from './RoutComponents/video-chat/video-chat.component';
import { VideoUserListComponent } from './RoutComponents/video-user-list/video-user-list.component';
import { ShareSelectedDialogComponent } from './Dialogs/share-selected-dialog/share-selected-dialog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MoveCopySelectedDialogComponent } from './Dialogs/move-selected-dialog/move-selected-dialog.component';
import { NewAlbumDialogComponent } from './Dialogs/new-album-dialog/new-album-dialog.component';
// import { ImageCarouselComponent } from './RoutComponents/image-carousel/image-carousel.component';
// import { GroupsComponent } from './RoutComponents/groups/groups.component';
// import { AGroupComponent } from './RoutComponents/a-group/a-group.component';
// import { FilterByComponent } from './RoutComponents/filter-by/filter-by.component';
import { GroupModule } from './ComponentModuleDependencies/group.module';
import { FilterModuleModule } from './ComponentModuleDependencies/filter-module.module';
import { OptionButtonsService } from './Services/tool-bar-buttons.service';
import { OptionsButtonsModule } from './ComponentModuleDependencies/options-buttons.module';
import { GroupService } from './Services/group.service';
import { GroupServiceFacade } from './Services/groupServiceFacade';
import { AdminControllsComponent } from './RoutComponents/admin-controlls/admin-controlls.component';
import { AdminBackupComponent } from './RoutComponents/admin-backup/admin-backup.component';

import { AdminRestoreComponent } from './RoutComponents/admin-restore/admin-restore.component';
import { AdminUsersComponent } from './RoutComponents/admin-users/admin-users.component';
import { AdminComponentsModule } from './ComponentModuleDependencies/admin.components.module';
//import { SaveItemComponent } from './RoutComponents/save-item/save-item.component';
// import { ImageCarouselComponent } from './RoutComponents/image-carousel/image-carousel.component';
// import { UsersListComponent } from './RoutComponents/users-list/users-list.component';
// import { AddGroupComponent } from './RoutComponents/add-group/add-group.component';
// import { OptionsButtonsComponent } from './RoutComponents/tool-barbuttons/options-buttons.component';

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
    VideoChatComponent,
    VideoUserListComponent,
    ShareSelectedDialogComponent,
    MoveCopySelectedDialogComponent,
    NewAlbumDialogComponent,
    // AdminControllsComponent,
    // AdminBackupComponent,
    // AdminRestoreComponent,
    // AdminUsersComponent,
    
    //SaveItemComponent,
    // ImageCarouselComponent,
    // AGroupComponent,
    // UsersListComponent,
    // AddGroupComponent,
    // OptionsButtonsComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    MaterialModule,
    HeaderModule,
    MessagesModule,
    AdminComponentsModule,
    AlbumComponentsModule,
    ImageCropperModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    GroupModule,
    FilterModuleModule,
    OptionsButtonsModule,
  ],
  providers: [
    GroupService,
    GroupServiceFacade,
    OptionButtonsService,
    UIService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ErrorComponent,
    ImageDisplayComponent,
    DeleteAlbumDialogComponent,
    ShareSelectedDialogComponent,
    MoveCopySelectedDialogComponent,
    NewAlbumDialogComponent,

  ],
})
export class AppModule {}

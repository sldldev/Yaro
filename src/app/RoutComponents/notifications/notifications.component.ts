import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {NotificationService} from '../../Services/notification.service';
import {NotificationModel} from '../../DataModules/notification.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications: Observable<NotificationModel[]>;

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.notificationService.getUserNotification();
    this.notifications = this.notificationService.getPostUpdateListener();
  }

  deleteNotification(notificationID: string) {
    this.notificationService.deleteNotification(notificationID);
  }

  markAsRead(notificationID: string) {
    this.notificationService.markNotificationAsRead(notificationID);
  }

}

/**
 * export the interface of notification
 */
export interface NotificationModel {
  id: string;
  read: boolean;
  viewProfile: boolean;
  senderId: string;
  message: string;
  creationDate: string;
}

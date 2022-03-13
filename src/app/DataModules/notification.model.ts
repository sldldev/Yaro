/**
 * export the interface of notification
 */
export interface NotificationModel {
  id: string;
  read: boolean;
  viewProfile: boolean;
  senderID: string;
  message: string;
  createdAt: string;
}

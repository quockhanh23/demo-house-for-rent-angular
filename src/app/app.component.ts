import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'house-for-rent-angular';
}

export enum ActionNotification {
  createComment = '1',
  createTransactional = '2',
  cancelRental = '3',
  reportHouse = '4',
  reviewHouse = '5'
}

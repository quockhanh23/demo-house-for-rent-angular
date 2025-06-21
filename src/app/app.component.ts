import {Component} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'house-for-rent-angular';
}

export var messageSuccess = "Thao tác thành công!"

export enum ActionNotification {
  createComment = '1',
  createTransactional = '2',
  cancelRental = '3',
  reportHouse = '4',
  reviewHouse = '5'
}

export function triggerSnackbarBtn() {
  window.onload = function () {
    (document.getElementById('snackbarBtn') as HTMLSelectElement).click();
  };
}

export function getSnackbar() {
  let x = document.getElementById("snackbar");
  // @ts-ignore
  x.className = "show";
  setTimeout(function () {
    // @ts-ignore
    x.className = x.className.replace("show", "");
  }, 3000);
}

export function checkTokenValid(error: any, router: Router) {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 0) {
      localStorage.removeItem("token")
      localStorage.removeItem("username")
      localStorage.removeItem("idUser")
      localStorage.removeItem("roles")
      router.navigate(['/login']).then(rs => {
        console.log("checkTokenValid navigate to login: " + rs)
      })
    }
  }
}

import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {

  @Input() message: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}

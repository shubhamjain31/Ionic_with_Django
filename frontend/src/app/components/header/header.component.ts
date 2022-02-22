import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title;
  @Input() isBack;
  constructor() { }

  ngOnInit() {
    this.isBack = JSON.parse(this.isBack);            // convert string to boolean
  }

}

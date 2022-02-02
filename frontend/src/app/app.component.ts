import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  pages = [
    {
      title: 'Login',
      url: '/tabs/tab1',
      icon: 'log-in'
    },
    {
      title: 'Contact',
      url: '/tabs/tab2',
      icon: 'person'
    },
    {
      title: 'About',
      url: '/tabs/tab3',
      icon: 'information-circle'
    }
  ];
  constructor() { }
}

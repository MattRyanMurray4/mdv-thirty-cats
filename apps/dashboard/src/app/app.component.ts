import { Component } from '@angular/core';

@Component({
  selector: 'cats-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'CAT' + '-' + 'App';
  links = [
    { path: '/', icon: 'home', title: 'Login' },
    { path: 'facts', icon: 'view_list', title: 'Cat-Facts' },
  ];
}

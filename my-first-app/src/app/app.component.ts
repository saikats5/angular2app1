import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: [`
    p {
      color: orange;
      font-weight: bold;
    }
  `]
})
export class AppComponent {
  title = 'my-first-app';
}

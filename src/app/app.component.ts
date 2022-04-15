import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'my-angular';

  constructor(private router: Router) {}

  public redirect(path: string) {
    this.router.navigate([path]);
  }
}

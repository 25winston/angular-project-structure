import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  imageProfile = '../../../assets/images/user-profile.jpeg';
  constructor(private router: Router) {}

  ngOnInit(): void {}

  redirect(path: string) {
    this.router.navigate([path]);
  }
}

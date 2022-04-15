import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';

@Component({
  templateUrl: './button-page.component.html',
  styleUrls: ['./button-page.component.scss'],
})
export class ButtonPageComponent implements OnInit {
  text1: string = '';

  constructor() {}

  ngOnInit(): void {}

  changeName(str: string): void {
    this.text1 = str;
  }
}

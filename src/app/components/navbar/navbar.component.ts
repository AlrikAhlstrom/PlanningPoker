import { Component, OnInit } from '@angular/core';
import {CollapseModule} from 'ngx-bootstrap/collapse';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isCollapsed: false;

  constructor() { }

  public collapsed(event: any): void {
    console.log(event);
  }
 
  public expanded(event: any): void {
    console.log(event);
  }
  ngOnInit() {
  }

}

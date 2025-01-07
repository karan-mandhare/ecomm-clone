import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  activeNav: string = 'dashboard';
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navClick(url: string) {
    this.activeNav = url;
    this.router.navigate(['admin', url]);
  }
}

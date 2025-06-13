import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  activeNav: string = 'dashboard';
  constructor(private router: Router) { }

  ngOnInit(): void { }

  navClick(url: string) {
    if (url.length == 0) {
      this.activeNav = 'dashboard';
      this.router.navigate(['admin']);
    } else {
      this.activeNav = url;
      this.router.navigate(['admin', url]);
    }
  }
}

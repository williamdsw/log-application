import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // Fields

  public title = 'log-application';
  public navbarLinks = [
    { text: 'Dashboard', href: 'dashboard' },
    { text: 'Manual Log', href: 'manual-log' },
    { text: 'Batch Log', href: 'batch-log' },
    { text: 'Search Logs', href: 'search-logs' },
  ];
  public showNavbarLinks = true;

  // Hookers

  ngOnInit() {
    this.checkWhatDeviceIs();
  }

  // Helper Functions

  public toggleShowNavbarLinks(): void {
    this.showNavbarLinks = !this.showNavbarLinks;
  }

  public checkWhatDeviceIs(): void {
    const userAgent = navigator.userAgent;
    const mobilePattern = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
    this.showNavbarLinks = !mobilePattern.test(userAgent);
  }
}

import { Component } from '@angular/core';
import { SidebarItem } from './interface/sidebar';
import { DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { Router } from '@angular/router';
import { NotificationService } from '@progress/kendo-angular-notification';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rezervační systém Kavenu';
  username?: string;

  // Sidebar
  public sidebarExpanded = window.innerWidth > 1024 ? true : false
  public sidebarAutoCollapse = window.innerWidth > 1024 ? false : true
  public sidebarItems: SidebarItem[] = []
  isLoggedIn: boolean = false;
  loginWindowOpened: boolean = false;

  constructor(
    protected notificationService: NotificationService,
    protected router: Router
  ) { }

  ngOnInit() {
    this.sidebarItems.push({ text: 'Přehled knihovny', path: '.', selected: false });
    this.sidebarItems.push({ text: 'Přehled vypůjček', path: 'prehled_vypujcek', selected: false });
    this.sidebarItems.push({ text: 'Správa uživatelů', path: 'sprava_uzivatelu', selected: false });
  }

  onSidebarSelect(ev: DrawerSelectEvent): void {
    this.sidebarItems = this.sidebarItems.map(item => {
      if (item.path === ev.item.path) {
        return { ...item, selected: true }
      } else {
        return { ...item, selected: false }
      }
    })
    if (ev.item.path) {
      this.router.navigate([ev.item.path])
    }
    ev.preventDefault()
  }
}

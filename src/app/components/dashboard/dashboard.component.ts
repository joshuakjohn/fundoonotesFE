import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/dataService/data.service';
import { MENU_ICON, REFRESH_ICON, LIST_VIEW_ICON, SETTING_ICON, OTHER_MENU_ICON, SEARCH_ICON, PROFILE_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  email: any = localStorage.getItem('email')
  username: any = localStorage.getItem('fname')
  drawerState: boolean = false
  currentRoute: string = ''
  
  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, public router: Router, private data: DataService) {
    iconRegistry.addSvgIconLiteral('menu-icon', sanitizer.bypassSecurityTrustHtml(MENU_ICON));
    iconRegistry.addSvgIconLiteral('refresh-icon', sanitizer.bypassSecurityTrustHtml(REFRESH_ICON));
    iconRegistry.addSvgIconLiteral('list-icon', sanitizer.bypassSecurityTrustHtml(LIST_VIEW_ICON));
    iconRegistry.addSvgIconLiteral('settings-icon', sanitizer.bypassSecurityTrustHtml(SETTING_ICON));
    iconRegistry.addSvgIconLiteral('other-menu-icon', sanitizer.bypassSecurityTrustHtml(OTHER_MENU_ICON));
    iconRegistry.addSvgIconLiteral('search-icon', sanitizer.bypassSecurityTrustHtml(SEARCH_ICON));
    iconRegistry.addSvgIconLiteral('profile-icon', sanitizer.bypassSecurityTrustHtml(PROFILE_ICON))

  }

  ngOnInit(){
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
      console.log(this.currentRoute)
    });
  }

  handleDrawerClick(click?: string){
    if(click === 'menu')
      this.drawerState = !this.drawerState
    else if(this.drawerState === true)
      this.drawerState = false
  }

  navigateTo(route:string){
    this.router.navigate(['/dashboard', route])
  }

  search(event: any) {
    console.log(event.target.value)
    this.data.outgoingData(event.target.value);
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { of } from 'rxjs';
import { EditLabelComponent } from '../edit-label/edit-label.component';


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        BrowserModule,
        AppRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatSidenavModule,
        MatIconModule,
        MatDialogModule,
        MatButtonToggleModule,
        MatMenuModule,
        MatGridListModule,
        MatProgressSpinnerModule
      ],
      providers: [MatIconRegistry]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component with default values', () => {
    expect(component.email).toBe(localStorage.getItem('email'));
    expect(component.username).toBe(localStorage.getItem('fname'));
    expect(component.drawerState).toBeFalse();
    expect(component.currentRoute).toBe('');
    expect(component.labels).toEqual([]);
  });

  it('should toggle drawerState when handleDrawerClick is called with "menu"', () => {
    component.handleDrawerClick('menu');
    expect(component.drawerState).toBeTrue();
    
    component.handleDrawerClick('menu');
    expect(component.drawerState).toBeFalse();
  });

  it('should close drawer when handleDrawerClick is called without arguments', () => {
    component.drawerState = true;
    component.handleDrawerClick();
    expect(component.drawerState).toBeFalse();
  });

  it('should navigate to the specified route and update currentRoute', () => {
    spyOn(component.router, 'navigate');
    component.navigateTo('notes');
    expect(component.router.navigate).toHaveBeenCalledWith(['/dashboard', 'notes']);
  });

  it('should call DataService.outgoingData with search input', () => {
    const event = { target: { value: 'search query' } };
    spyOn(component.data, 'outgoingData');
    component.search(event);
    expect(component.data.outgoingData).toHaveBeenCalledWith('search query');
  });
  
  it('should clear localStorage and navigate to login page on logout', () => {
    spyOn(component.router, 'navigate');
    component.logout();
    expect(localStorage.getItem('email')).toBeNull();
    expect(component.router.navigate).toHaveBeenCalledWith(['']);
  });
  
  it('should unsubscribe from subscription on destroy', () => {
    spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });
  
});

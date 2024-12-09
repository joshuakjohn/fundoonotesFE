import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconsComponent } from './icons.component';
import { HttpService } from 'src/app/services/http-service/http.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { BrowserModule, By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('IconsComponent', () => {
  let component: IconsComponent;
  let fixture: ComponentFixture<IconsComponent>;
  let httpServiceMock: jasmine.SpyObj<HttpService>;

  beforeEach(async () => {
    httpServiceMock = jasmine.createSpyObj('HttpService', ['deleteApiCall', 'patchApiCall', 'putApiCall']);
    await TestBed.configureTestingModule({
      declarations: [IconsComponent],
      imports: [
        MatIconModule,
        MatDialogModule,
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
        MatProgressSpinnerModule,
      ],
      providers: [
        { provide: HttpService, useValue: httpServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconsComponent);
    component = fixture.componentInstance;
    component.id = '1';
    fixture.detectChanges();
  });

  it('should call the delete API when trashNote is called', () => {
    httpServiceMock.deleteApiCall.and.returnValue(of({}));
    component.trashNote('trash');
    
    expect(httpServiceMock.deleteApiCall).toHaveBeenCalledWith('/api/v1/notes/1/trash', jasmine.any(HttpHeaders));
  });

  it('should call archiveNote when archive button is clicked', () => {
    const archiveButton = fixture.debugElement.query(By.css('button[aria-label="archive button"]')).nativeElement;
    spyOn(component, 'archiveNote');
    
    archiveButton.click();
    fixture.detectChanges();
    
    expect(component.archiveNote).toHaveBeenCalled();
  });
  
  it('should call the archive API when archiveNote is called', () => {
    httpServiceMock.patchApiCall.and.returnValue(of({}));
    component.archiveNote('archive');
    
    expect(httpServiceMock.patchApiCall).toHaveBeenCalledWith('/api/v1/notes/1', '', jasmine.any(HttpHeaders));
  });
  
  it('should call the color API when handleNoteColor is called', () => {
    const colorCode = '#faafa8';
    httpServiceMock.putApiCall.and.returnValue(of({}));
    component.handleNoteColor(colorCode);
    
    expect(httpServiceMock.putApiCall).toHaveBeenCalledWith('/api/v1/notes/1', { color: colorCode }, jasmine.any(HttpHeaders));
  });

  it('should emit updateList when trashNote is called', () => {
    spyOn(component.updateList, 'emit');
    httpServiceMock.deleteApiCall.and.returnValue(of({}));
  
    component.trashNote('trash');
  
    expect(component.updateList.emit).toHaveBeenCalledWith({ _id: '1', action: 'trash' });
  });
  
  it('should emit updateList when archiveNote is called', () => {
    spyOn(component.updateList, 'emit');
    httpServiceMock.patchApiCall.and.returnValue(of({})); 
  
    component.archiveNote('archive');
  
    expect(component.updateList.emit).toHaveBeenCalledWith({ _id: '1', action: 'archive' });
  });

  it('should display trash buttons when action is "trash"', () => {
    component.action = 'trash';
    fixture.detectChanges();
    
    const trashButton = fixture.debugElement.query(By.css('button[aria-label="trash button"]'));
    const collabButton = fixture.debugElement.query(By.css('button[aria-label="collabrator button"]'));
    
    expect(trashButton).toBeTruthy();
    expect(collabButton).toBeTruthy();
  });
  
  it('should display archive buttons when action is "archive"', () => {
    component.action = 'archive';
    fixture.detectChanges();
    
    const archiveButton = fixture.debugElement.query(By.css('button[aria-label="archive button"]'));
    const collabButton = fixture.debugElement.query(By.css('button[aria-label="collabrator button"]'));
    
    expect(archiveButton).toBeTruthy();
    expect(collabButton).toBeTruthy();
  });
  
  it('should display note buttons when action is "notes"', () => {
    component.action = 'notes';
    fixture.detectChanges();
    
    const noteButton = fixture.debugElement.query(By.css('button[aria-label="collabrator button"]'));
    
    expect(noteButton).toBeTruthy();
  });
  
});

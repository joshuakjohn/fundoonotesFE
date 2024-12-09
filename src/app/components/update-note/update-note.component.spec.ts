import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateNoteComponent } from './update-note.component';
import { BrowserModule } from '@angular/platform-browser';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from '../../services/http-service/http.service';
import { of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { IconsComponent } from '../icons/icons.component';

describe('UpdateNoteComponent', () => {
  let component: UpdateNoteComponent;
  let fixture: ComponentFixture<UpdateNoteComponent>;
  let httpService: HttpService;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<UpdateNoteComponent>>;

  const mockData = {
    title: 'Test Note',
    description: 'This is a test note.',
    color: '#ffffff',
    _id: '1',
  };

  beforeEach(async () => {
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [UpdateNoteComponent, IconsComponent],
      imports: [
        HttpClientTestingModule,
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
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: MatDialogRef, useValue: dialogRefMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateNoteComponent);
    component = fixture.componentInstance;
    httpService = TestBed.inject(HttpService);
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<UpdateNoteComponent>>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with data passed via MAT_DIALOG_DATA', () => {
    expect(component.title).toBe(mockData.title);
    expect(component.description).toBe(mockData.description);
    expect(component.color).toBe(mockData.color);
    expect(component.id).toBe(mockData._id);
  });

  it('should update data and close dialog on onNoClick', () => {
    const updatedTitle = 'Updated Title';
    const updatedDescription = 'Updated Description';
    const updatedColor = '#000000';

    component.title = updatedTitle;
    component.description = updatedDescription;
    component.color = updatedColor;

    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    spyOn(httpService, 'putApiCall').and.returnValue(of({}));

    component.onNoClick();

    expect(dialogRefSpy.close).toHaveBeenCalledWith({
      data: {
        title: updatedTitle,
        description: updatedDescription,
        color: updatedColor,
        _id: mockData._id,
      },
      action: component.action,
    });

    expect(httpService.putApiCall).toHaveBeenCalledWith(
      `/api/v1/notes/${mockData._id}`,
      {
        title: updatedTitle,
        description: updatedDescription,
        color: updatedColor,
      },
      header
    );
  });

  it('should handle "archive" or "trash" action and call onNoClick', () => {
    const spyOnNoClick = spyOn(component, 'onNoClick');

    component.handleButtons({ color: '#ff0000', action: 'archive' });
    expect(component.color).toBe('#ff0000');
    expect(component.action).toBe('archive');
    expect(spyOnNoClick).toHaveBeenCalled();

    component.handleButtons({ color: '#00ff00', action: 'trash' });
    expect(component.color).toBe('#00ff00');
    expect(component.action).toBe('trash');
    expect(spyOnNoClick).toHaveBeenCalled();
  });

  it('should not call onNoClick for other actions', () => {
    const spyOnNoClick = spyOn(component, 'onNoClick');

    component.handleButtons({ color: '#ff0000', action: 'pin' });
    expect(component.color).toBe('#ff0000');
    expect(component.action).toBe('pin');
    expect(spyOnNoClick).not.toHaveBeenCalled();
  });
});


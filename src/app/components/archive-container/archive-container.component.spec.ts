import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveContainerComponent } from './archive-container.component';
import { NoteCardComponent } from '../note-card/note-card.component';
import { IconsComponent } from '../icons/icons.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from 'src/app/services/http-service/http.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ArchiveContainerComponent', () => {
  let component: ArchiveContainerComponent;
  let fixture: ComponentFixture<ArchiveContainerComponent>;
  let httpService: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchiveContainerComponent, NoteCardComponent, IconsComponent],
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
        MatProgressSpinnerModule,
        HttpClientTestingModule
      ],
      providers: [HttpService],
    });
    fixture = TestBed.createComponent(ArchiveContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpService = TestBed.inject(HttpService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and filter archived notes on initialization', () => {
  const mockResponse = {
    data: [
      { _id: '1', isArchive: true, isTrash: false },
      { _id: '2', isArchive: false, isTrash: false },
      { _id: '3', isArchive: true, isTrash: true },
    ],
  };
  spyOn(httpService, 'getApiCall').and.returnValue(of(mockResponse));

  component.ngOnInit();

  expect(httpService.getApiCall).toHaveBeenCalledWith(
    '/api/v1/notes',
    jasmine.any(Object) // HttpHeaders
  );
  expect(component.archiveList).toEqual([{ _id: '1', isArchive: true, isTrash: false }]);
  expect(component.loader).toBe('none');
});

it('should remove the note from archiveList on update action', () => {
  component.archiveList = [
    { _id: '1', isArchive: true, isTrash: false },
    { _id: '2', isArchive: true, isTrash: false },
  ];

  component.handleUpdateList({ _id: '1', action: 'archive' });

  expect(component.archiveList).toEqual([{ _id: '2', isArchive: true, isTrash: false }]);
});

it('should display the loader while fetching notes', () => {
  component.loader = 'flex';
  fixture.detectChanges();

  const spinnerElement = fixture.debugElement.nativeElement.querySelector('.spinner');
  expect(spinnerElement.style.display).toBe('flex');
});

it('should show empty archive message when no archived notes are present', () => {
  component.archiveList = [];
  component.loader = 'none';
  fixture.detectChanges();

  const noNoteElement = fixture.debugElement.nativeElement.querySelector('.no_note span');
  expect(noNoteElement.textContent).toContain('Archive is empty');
});

it('should render notes in the archive list', () => {
  // Arrange
  component.archiveList = [
    { _id: '1', title: 'Note 1', isArchive: true },
    { _id: '2', title: 'Note 2', isArchive: true },
  ];
  fixture.detectChanges(); // Trigger DOM update

  // Act
  const noteElements = fixture.debugElement.queryAll(By.css('app-note-card.notecard'));

  // Assert
  expect(noteElements.length).toBe(2); // Expect exactly 2 app-note-card elements
});



it('should call handleUpdateList when updateList event is emitted', () => {
  // Arrange
  component.archiveList = [
    { _id: '1', title: 'Note 1', isArchive: true },
  ];
  fixture.detectChanges(); // Trigger change detection

  spyOn(component, 'handleUpdateList'); // Spy on handleUpdateList

  // Act
  const noteCard = fixture.debugElement.query(By.css('app-note-card'));
  noteCard.triggerEventHandler('updateList', { _id: '1', action: 'trash' });

  // Assert
  expect(component.handleUpdateList).toHaveBeenCalledWith({ _id: '1', action: 'trash' });
});


it('should log errors if API call fails', () => {
  spyOn(httpService, 'getApiCall').and.returnValue(throwError(() => new Error('API Error')));
  spyOn(console, 'log');

  component.ngOnInit();

  expect(console.log).toHaveBeenCalledWith(new Error('API Error'));
});


});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotesContainerComponent } from './notes-container.component';
import { AddNoteComponent } from '../add-note/add-note.component';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of, Subject } from 'rxjs';
import { DataService } from 'src/app/services/dataService/data.service';
import { HttpService } from 'src/app/services/http-service/http.service';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditLabelComponent } from '../edit-label/edit-label.component';

describe('NotesContainerComponent', () => {
  let component: NotesContainerComponent;
  let fixture: ComponentFixture<NotesContainerComponent>;
  let httpService: HttpService;

  const mockNotes = [
    { _id: '1', isArchive: false, isTrash: false, title: 'Note 1' },
    { _id: '2', isArchive: false, isTrash: false, title: 'Note 2' },
  ];

  beforeEach(async () => {
    const dataServiceMock = {
      incomingData: new Subject(),
    };

    const httpServiceMock = {
      getApiCall: jasmine.createSpy('getApiCall').and.returnValue(of({ data: mockNotes })),
    };

    await TestBed.configureTestingModule({
      declarations: [NotesContainerComponent, AddNoteComponent, FilterPipe],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonToggleModule,
        MatMenuModule,
        MatGridListModule,
        MatProgressSpinnerModule
      ],
      providers: [
        { provide: DataService, useValue: dataServiceMock },
        { provide: HttpService, useValue: httpServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotesContainerComponent);
    component = fixture.componentInstance;
    httpService = TestBed.inject(HttpService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch notes on initialization', () => {
    expect(httpService.getApiCall).toHaveBeenCalledWith(
      '/api/v1/notes',
      jasmine.any(Object) // The headers
    );
    expect(component.notesList.length).toBe(2);
    expect(component.loader).toBe('none');
  });

  it('should add a note when handleUpdateList is called with action "add"', () => {
    const newNote = { _id: '3', title: 'New Note', isArchive: false, isTrash: false };
    component.handleUpdateList({ data: newNote, action: 'add' });

    expect(component.notesList.length).toBe(3);
    expect(component.notesList).toContain(newNote);
  });

  it('should remove a note when handleUpdateList is called with action "trash"', () => {
    component.handleUpdateList({ _id: '1', action: 'trash' });

    expect(component.notesList.length).toBe(1);
    expect(component.notesList.some((note) => note._id === '1')).toBe(false);
  });

  it('should show the spinner while loading', () => {
    component.loader = 'flex';
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('.spinner');
    expect(spinner.style.display).toBe('flex');
  });

  it('should display "Add a note to display" when notesList is empty', () => {
    component.loader = 'none';
    component.notesList = [];
    fixture.detectChanges();

    const noNoteMessage = fixture.nativeElement.querySelector('.no_note span');
    expect(noNoteMessage.textContent).toBe('Add a note to display');
  });

  it('should render notes when notesList is not empty', () => {
    component.notesList = mockNotes;
    fixture.detectChanges();

    const noteCards = fixture.nativeElement.querySelectorAll('app-note-card');
    expect(noteCards.length).toBe(0);
  });
});

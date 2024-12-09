import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrashContainerComponent } from './trash-container.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from 'src/app/services/http-service/http.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { of } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { NoteCardComponent } from '../note-card/note-card.component';
import { IconsComponent } from '../icons/icons.component';

describe('TrashContainerComponent', () => {
  let component: TrashContainerComponent;
  let fixture: ComponentFixture<TrashContainerComponent>;
  let httpService: HttpService;

  const mockNotes = [
    { _id: '1', isTrash: true, title: 'Trash Note 1' },
    { _id: '2', isTrash: true, title: 'Trash Note 2' },
    { _id: '3', isTrash: false, title: 'Active Note 1' },
  ];

  beforeEach(async () => {
    const httpServiceMock = {
      getApiCall: jasmine.createSpy('getApiCall').and.returnValue(of({ data: mockNotes })),
    };

    await TestBed.configureTestingModule({
      declarations: [TrashContainerComponent, NoteCardComponent, IconsComponent],
      imports: [
        HttpClientTestingModule,
        MatProgressSpinnerModule,
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
      ],
      providers: [{ provide: HttpService, useValue: httpServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(TrashContainerComponent);
    component = fixture.componentInstance;
    httpService = TestBed.inject(HttpService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch trash notes on initialization', () => {
    expect(httpService.getApiCall).toHaveBeenCalledWith(
      '/api/v1/notes',
      jasmine.any(Object) // The headers
    );
    expect(component.trashList.length).toBe(2);
    expect(component.trashList.every((note) => note.isTrash)).toBeTrue();
    expect(component.loader).toBe('none');
  });

  it('should handleUpdateList to remove a note when action is "trash"', () => {
    component.trashList = [...mockNotes.filter((note) => note.isTrash)];
    const noteIdToRemove = '1';

    component.handleUpdateList({ _id: noteIdToRemove, action: 'trash' });

    expect(component.trashList.length).toBe(1);
    expect(component.trashList.some((note) => note._id === noteIdToRemove)).toBeFalse();
  });

  it('should handleUpdateList to remove a note when action is "delete"', () => {
    component.trashList = [...mockNotes.filter((note) => note.isTrash)];
    const noteIdToRemove = '2';

    component.handleUpdateList({ _id: noteIdToRemove, action: 'delete' });

    expect(component.trashList.length).toBe(1);
    expect(component.trashList.some((note) => note._id === noteIdToRemove)).toBeFalse();
  });

  it('should show the spinner while loading', () => {
    component.loader = 'flex';
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('.spinner');
    expect(spinner.style.display).toBe('flex');
  });

  it('should display "Trash is empty" when trashList is empty', () => {
    component.loader = 'none';
    component.trashList = [];
    fixture.detectChanges();

    const noTrashMessage = fixture.nativeElement.querySelector('.no_note span');
    expect(noTrashMessage.textContent).toBe('Trash is empty');
  });

  it('should render notes when trashList is not empty', () => {
    component.trashList = [...mockNotes.filter((note) => note.isTrash)];
    fixture.detectChanges();

    const noteCards = fixture.nativeElement.querySelectorAll('app-note-card');
    expect(noteCards.length).toBe(2);
  });
});

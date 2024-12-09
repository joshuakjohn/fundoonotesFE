import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteCardComponent } from './note-card.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { UpdateNoteComponent } from 'src/app/components/update-note/update-note.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('NoteCardComponent', () => {
  let component: NoteCardComponent;
  let fixture: ComponentFixture<NoteCardComponent>;
  let dialog: MatDialog;

  const noteDetails = {
    _id: '123',
    title: 'Test Note',
    description: 'This is a test description',
    color: 'red'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteCardComponent, UpdateNoteComponent],
      imports: [MatDialogModule, MatIconModule],
      providers: [MatDialog],
      schemas: [NO_ERRORS_SCHEMA] // To ignore unknown external dependencies
    }).compileComponents();

    fixture = TestBed.createComponent(NoteCardComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);

    component.noteDetails = noteDetails;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the note title and description', () => {
    const title = fixture.debugElement.query(By.css('.text')).nativeElement;
    expect(title.textContent).toContain('Test Note');

    const description = fixture.debugElement.queryAll(By.css('.text'))[1].nativeElement;
    expect(description.textContent).toContain('This is a test description');
  });

  it('should call editNotesDialog when content is clicked', () => {
    spyOn(component, 'editNotesDialog');
    const contentDiv = fixture.debugElement.query(By.css('.content')).nativeElement;
    contentDiv.click();

    expect(component.editNotesDialog).toHaveBeenCalledWith(noteDetails);
  });

  it('should open a dialog when editNotesDialog is called', () => {
    spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of({ data: noteDetails, action: 'edit' })
    } as any);

    component.editNotesDialog(noteDetails);

    expect(dialog.open).toHaveBeenCalledWith(UpdateNoteComponent, {
      height: 'auto',
      width: '600px',
      data: noteDetails
    });
  });

  it('should update noteDetails when dialog is closed with new data', () => {
    const updatedNote = { ...noteDetails, color: 'blue' };
    spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of({ data: updatedNote, action: 'edit' })
    } as any);

    component.editNotesDialog(noteDetails);
    fixture.detectChanges();

    expect(component.noteDetails.color).toBe('blue');
  });

  it('should emit updateList event when note icon action is triggered', () => {
    spyOn(component.updateList, 'emit');
    const event = { _id: '123', color: 'blue', action: 'archive' };
    component.handleNoteIconsClick(event);

    expect(component.updateList.emit).toHaveBeenCalledWith({
      _id: '123',
      action: 'archive'
    });
  });

  it('should update note color when handleNoteIconsClick is triggered', () => {
    const event = { _id: '123', color: 'blue', action: 'archive' };
    component.handleNoteIconsClick(event);

    expect(component.noteDetails.color).toBe('blue');
  });

  it('should handle color change correctly after dialog closes', () => {
    const updatedNote = { ...noteDetails, color: 'green' };
    spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of({ data: updatedNote, action: 'trash' })
    } as any);

    component.editNotesDialog(noteDetails);
    fixture.detectChanges();

    expect(component.noteDetails.color).toBe('green');
  });
});

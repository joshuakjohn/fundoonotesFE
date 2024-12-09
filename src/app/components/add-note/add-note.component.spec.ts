import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNoteComponent } from './add-note.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddNoteComponent', () => {
  let component: AddNoteComponent;
  let fixture: ComponentFixture<AddNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNoteComponent],
      imports: [
        HttpClientModule,
        MatIconModule,
        FormsModule,
        BrowserAnimationsModule,
      ]
    });
    fixture = TestBed.createComponent(AddNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial addnote as true', () => {
    expect(component.addnote).toBeTrue();
  });
  
  it('should have empty title and description initially', () => {
    expect(component.title).toBe('');
    expect(component.description).toBe('');
  });
  
  it('should toggle addnote when addNoteToggle is called', () => {
    component.addNoteToggle('');
    expect(component.addnote).toBeFalse();
    
    component.addNoteToggle('');
    expect(component.addnote).toBeTrue();
  });
  
  it('should call HTTP service to add a note when action is save', () => {
    const httpServiceSpy = spyOn(component['httpService'], 'postApiCall').and.callThrough();
    component.title = 'Test Title';
    component.description = 'Test Description';
  
    component.addNoteToggle('save');
  
    expect(httpServiceSpy).toHaveBeenCalledWith(
      '/api/v1/notes',
      { title: 'Test Title', description: 'Test Description', color: 'no color' },
      jasmine.any(Object)
    );
  });

  it('should not call HTTP service when title or description is empty', () => {
    const httpServiceSpy = spyOn(component['httpService'], 'postApiCall');
    component.title = '';
    component.description = '';
  
    component.addNoteToggle('save');
  
    expect(httpServiceSpy).not.toHaveBeenCalled();
  });

  it('should emit updateList event on successful note addition', () => {
    const updateListSpy = spyOn(component.updateList, 'emit');
    spyOn(component['httpService'], 'postApiCall').and.returnValue({
      subscribe: (callbacks: any) => {
        callbacks.next({ data: { id: 1, title: 'Test', description: 'Test' } });
      },
    } as any);
  
    component.title = 'Test Title';
    component.description = 'Test Description';
    component.addNoteToggle('save');
  
    expect(updateListSpy).toHaveBeenCalledWith({
      data: { id: 1, title: 'Test', description: 'Test' },
      action: 'add',
    });
  });

  it('should reset title and description after adding a note', () => {
    spyOn(component['httpService'], 'postApiCall').and.returnValue({
      subscribe: (callbacks: any) => callbacks.next({}),
    } as any);
  
    component.title = 'Test Title';
    component.description = 'Test Description';
  
    component.addNoteToggle('save');
  
    expect(component.title).toBe('');
    expect(component.description).toBe('');
  });
  
});

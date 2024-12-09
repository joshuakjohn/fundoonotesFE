import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditLabelComponent } from './edit-label.component';
import { BrowserModule } from '@angular/platform-browser';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { By } from '@angular/platform-browser';



describe('EditLabelComponent', () => {
  let component: EditLabelComponent;
  let fixture: ComponentFixture<EditLabelComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<EditLabelComponent>>;

  beforeEach(() => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [EditLabelComponent],
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
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: ['label1', 'label2'] },
      ],
    });
    fixture = TestBed.createComponent(EditLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open with the correct initial labels', () => {
    expect(component.labels).toEqual(['label1', 'label2']);
  });

  it('should not add an empty label', () => {
    const inputElement = fixture.debugElement.query(By.css('input.create_label')).nativeElement;
    inputElement.value = '   ';  // Whitespace-only label
    const addButton = fixture.debugElement.query(By.css('button[mat-icon-button]')).nativeElement;

    addButton.click();
    fixture.detectChanges();

    expect(component.labels.length).toBe(2); // No new label should be added
  });

  it('should cancel the new label input when cancel button is clicked', () => {
    const inputElement = fixture.debugElement.query(By.css('input.create_label')).nativeElement;
    inputElement.value = 'new label';
    const cancelButton = fixture.debugElement.queryAll(By.css('button[mat-icon-button]'))[0].nativeElement;

    cancelButton.click();
    fixture.detectChanges();

    expect(inputElement.value).toBe('');
  });

  it('should remove a label when the remove button is clicked', () => {
    const removeButton = fixture.debugElement.queryAll(By.css('button[mat-icon-button]'))[2].nativeElement;  // targeting the trash icon for first label
    removeButton.click();
    fixture.detectChanges();

    expect(component.labels.length).toBe(1);  // One label should be removed
    expect(component.labels).not.toContain('label1');  // Check that label1 is removed
  });

  it('should close the dialog when Done button is clicked', () => {
    const doneButton = fixture.debugElement.query(By.css('button[mat-button]')).nativeElement;

    doneButton.click();
    fixture.detectChanges();

    expect(dialogRefSpy.close).toHaveBeenCalledWith(component.labels);  // It should close with the updated labels
  });
});

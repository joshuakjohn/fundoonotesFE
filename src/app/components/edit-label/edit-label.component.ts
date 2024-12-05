import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss']
})
export class EditLabelComponent {

  labels: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditLabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.labels = data

  }

  onNoClick(): void {
    this.dialogRef.close(this.labels);
  }

  labelhandle(inputElement: any, action: string, newLabel?: any): void {
    if (action === 'add' && newLabel.trim()) { // Avoid adding empty or whitespace-only labels
      this.labels.push(newLabel.trim());
      inputElement.value = ''
    }

    else if(action === 'cancel'){
      inputElement.value = ''
    }

    else if(action === 'remove'){
      if (inputElement > -1 && inputElement < this.labels.length) {
        this.labels.splice(inputElement, 1); // Remove the label at the specified index
      }
    }

    else if(action === 'edit'){
      if (newLabel.trim()) { // Ensure the value is not empty or whitespace
        this.labels[inputElement] = newLabel.trim();
      }
    }
  }
}

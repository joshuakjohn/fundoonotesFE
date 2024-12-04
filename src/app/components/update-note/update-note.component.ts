import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from '../../services/http-service/http.service';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent{

  @Output() updateList = new EventEmitter

  title: any = ''
  description: any = ''
  color: any = ''
  id: any = ''
  action: any = ''

  constructor(
    public httpService:HttpService,
    public dialogRef: MatDialogRef<UpdateNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title
    this.description = data.description
    this.color = data.color
    this.id = data._id
  }

  onNoClick(): void {
    this.data.title = this.title;
    this.data.description = this.description;
    this.data.color = this.color
    this.dialogRef.close({data: this.data, action: this.action});
    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.httpService.putApiCall(`/api/v1/notes/${this.data._id}`, {title:this.title, description:this.description, color:this.color}, header).subscribe({
      next: (res: any) => {

      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  handleButtons($event: any){
    this.color = $event.color
    this.action = $event.action
    if(this.action === 'archive' || this.action === 'trash')
    this.onNoClick()
  }

}

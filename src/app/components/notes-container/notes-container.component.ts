import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http-service/http.service';


@Component({
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss']
})
export class NotesContainerComponent implements OnInit {

  notesList: any[] = []

  constructor(private httpService: HttpService){

  }

  ngOnInit() {

    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.httpService.getApiCall('/api/v1/notes', header).subscribe({
      next: (res: any) => {
        //this.notesList = res.data.map((note: {title: string, description:string, _id:string}) => ({title:note.title, description:note.description, _id:note._id}))
        this.notesList = res.data.filter((note: any) => note.isArchive === false && note.isTrash === false)
      },
      error: (err) => {
        console.log(err)
      }
    })
    

  }
 
  handleUpdateList($event: any){
    let {title, description, _id, action} = $event
    if(action === 'add'){
      this.notesList.push({title, description})
    }
    else if(action === 'trash' || 'archive'){
      this.notesList = this.notesList.filter((element) => element._id != _id)
    }
    
  }





}

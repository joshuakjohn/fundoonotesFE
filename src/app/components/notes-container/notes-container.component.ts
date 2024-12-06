import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/dataService/data.service';
import { HttpService } from 'src/app/services/http-service/http.service';


@Component({
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss']
})
export class NotesContainerComponent implements OnInit {

  notesList: any[] = [];
  filterNote: any;
  loader:string = 'flex' 

  constructor(private httpService: HttpService, private data: DataService){

  }

  ngOnInit() {

    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.httpService.getApiCall('/api/v1/notes', header).subscribe({
      next: (res: any) => {
        this.notesList = res.data.filter((note: any) => note.isArchive === false && note.isTrash === false)
        this.loader = 'none'
      },
      error: (err) => {
        console.log(err)
      }
    })

    this.data.incomingData.subscribe((response) => {
      console.log("Search in process", response);
      this.filterNote = response;
    })

  }
 
  handleUpdateList($event: any){
    let {data, action} = $event
    if(action === 'add'){
      this.notesList = [...this.notesList, data];
    }
    else if(action === 'trash' || action === 'archive'){
      this.notesList = this.notesList.filter((element) => element._id != $event._id)
    }   
  }




}

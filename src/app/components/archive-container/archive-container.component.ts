import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http-service/http.service';

@Component({
  selector: 'app-archive-container',
  templateUrl: './archive-container.component.html',
  styleUrls: ['./archive-container.component.scss']
})
export class ArchiveContainerComponent {

  archiveList: any[] = []; 
  loader:string = 'flex'

  constructor(public httpService: HttpService){}

  ngOnInit() {

    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.httpService.getApiCall('/api/v1/notes', header).subscribe({
      next: (res: any) => {
        this.archiveList = res.data.filter((note: any) => note.isArchive === true && note.isTrash === false)
        this.loader = 'none'
      },
      error: (err) => {
        console.log(err)
      }
    })
    
  }

  handleUpdateList($event: any){
    let {_id, action} = $event
    if(action === 'archive' || action === 'trash'){
      this.archiveList = this.archiveList.filter((element) => element._id != _id)
    }
  }

}

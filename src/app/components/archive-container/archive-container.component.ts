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

  constructor(public httpService: HttpService){}

  ngOnInit() {

    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.httpService.getApiCall('/api/v1/notes', header).subscribe({
      next: (res: any) => {
        this.archiveList = res.data.filter((note: any) => note.isArchive === true)
      },
      error: (err) => {
        console.log(err)
      }
    })
    

  }
}

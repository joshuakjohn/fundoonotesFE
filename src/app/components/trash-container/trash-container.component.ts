import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http-service/http.service';

@Component({
  selector: 'app-trash-container',
  templateUrl: './trash-container.component.html',
  styleUrls: ['./trash-container.component.scss']
})
export class TrashContainerComponent {

  trashList: any[] = []

  constructor(public httpService: HttpService){}

  ngOnInit() {

    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.httpService.getApiCall('/api/v1/notes', header).subscribe({
      next: (res: any) => {
        this.trashList = res.data.filter((note: any) => note.isTrash === true)
      },
      error: (err) => {
        console.log(err)
      }
    })
    

  }

  handleUpdateList($event: any){
    let {_id, action} = $event
    if(action === 'trash' || action === 'delete'){
      this.trashList = this.trashList.filter((element) => element._id != _id)
    }
  }

}

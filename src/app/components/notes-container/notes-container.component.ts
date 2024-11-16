import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss']
})
export class NotesContainerComponent implements OnInit {

  notesList: any[] = []

  ngOnInit() {

    this.notesList = ['hello', 'world', 'josh']
    //call the api to fetch the data

  }



}

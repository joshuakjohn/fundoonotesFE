import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from 'src/app/services/http-service/http.service';
import { COLLABRATOR_ICON, COLOR_PALATTE_ICON, IMG_ICON, ARCHIVE_ICON, MORE_ICON, DELETE_FOREVER_ICON, RESTORE_ICON, UNARCHIVE_ICON, TRASH_ICON, REMINDER_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent {

  colorArray: Array<any> = [
    { code: '#faafa8', name: 'Tomato' },
    { code: '#f39f76', name: 'OrangeRed'},
    { code: '#fff8b8', name: 'yellow' },
    { code: '#e2f6d3', name: 'greenyellow' },
    { code: '#b4ddd3', name: 'LightSteelBlue' },
    { code: '#d4e4ed', name: 'PaleGoldenRod' },
    { code: '#aeccdc', name: 'Aquamarine' },
    { code: '#d3bfdb', name: 'Bisque' },
    { code: '#f6e2dd', name: 'Silver' },
    { code: '#e9e3d4', name: 'RosyBrown' },
    { code: '#efeff1', name: 'grey' },
  ];

  @Input() id: string = ''
  @Input() action: string = ''

  @Output() updateList = new EventEmitter

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, public httpService: HttpService){
    iconRegistry.addSvgIconLiteral('trash-icon', sanitizer.bypassSecurityTrustHtml(TRASH_ICON));
    iconRegistry.addSvgIconLiteral('color-palatte-icon', sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON));
    iconRegistry.addSvgIconLiteral('img-icon', sanitizer.bypassSecurityTrustHtml(IMG_ICON));
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON));
    iconRegistry.addSvgIconLiteral('more-icon', sanitizer.bypassSecurityTrustHtml(MORE_ICON));
    iconRegistry.addSvgIconLiteral('delete-forever-icon', sanitizer.bypassSecurityTrustHtml(DELETE_FOREVER_ICON));
    iconRegistry.addSvgIconLiteral('restore-icon', sanitizer.bypassSecurityTrustHtml(RESTORE_ICON));
    iconRegistry.addSvgIconLiteral('unarchive-icon', sanitizer.bypassSecurityTrustHtml(UNARCHIVE_ICON));
    iconRegistry.addSvgIconLiteral('reminder-icon', sanitizer.bypassSecurityTrustHtml(REMINDER_ICON));

  }

  trashNote(action: string){
    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.httpService.deleteApiCall(`/api/v1/notes/${this.id}/trash`, header).subscribe({
      next: (res: any) => {
        this.updateList.emit({_id: this.id, action})
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  archiveNote(action: string){
    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.httpService.patchApiCall(`/api/v1/notes/${this.id}`,"", header).subscribe({
      next: (res: any) => {
        this.updateList.emit({_id: this.id, action})
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  handleNoteColor(color: string){
    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.httpService.putApiCall(`/api/v1/notes/${this.id}`, {color}, header).subscribe({
      next: (res: any) => {    
        this.updateList.emit({color})
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  deleteNote(action: string){
    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.httpService.deleteApiCall(`/api/v1/notes/${this.id}`, header).subscribe({
      next: (res: any) => {
        this.updateList.emit({_id: this.id, action})
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { COLLABRATOR_ICON, COLOR_PALATTE_ICON, IMG_ICON, ARCHIVE_ICON, MORE_ICON, DELETE_FOREVER_ICON, RESTORE_ICON, UNARCHIVE_ICON, TRASH_ICON } from 'src/assets/svg-icons';
import { UpdateNoteComponent } from 'src/app/components/update-note/update-note.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent {

  @Input() noteDetails:any = ''

  @Output() updateList = new EventEmitter


  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, public dialog: MatDialog) {
    iconRegistry.addSvgIconLiteral('trash-icon', sanitizer.bypassSecurityTrustHtml(TRASH_ICON));
    iconRegistry.addSvgIconLiteral('collabrator-icon', sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON));
    iconRegistry.addSvgIconLiteral('color-palatte-icon', sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON));
    iconRegistry.addSvgIconLiteral('img-icon', sanitizer.bypassSecurityTrustHtml(IMG_ICON));
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON));
    iconRegistry.addSvgIconLiteral('more-icon', sanitizer.bypassSecurityTrustHtml(MORE_ICON));
    iconRegistry.addSvgIconLiteral('delete-forever-icon', sanitizer.bypassSecurityTrustHtml(DELETE_FOREVER_ICON));
    iconRegistry.addSvgIconLiteral('restore-icon', sanitizer.bypassSecurityTrustHtml(RESTORE_ICON));
    iconRegistry.addSvgIconLiteral('unarchive-icon', sanitizer.bypassSecurityTrustHtml(UNARCHIVE_ICON));
  }

  ngOnInit(){
  }

  handleNoteIconsClick($event: any){
    this.updateList.emit({_id: $event._id, action: $event.action})
  }

  editNotesDialog(note: any){
    let dialogRef = this.dialog.open(UpdateNoteComponent, {
      height: 'auto',
      width: '600px',
      data: note
    }
  );

    dialogRef.afterClosed().subscribe(result => {
      this.noteDetails = {...result, _id: this.noteDetails._id}
      console.log('The dialog was closed');
    });
  }
}
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-client-pop-up',
  templateUrl: './remove-client-pop-up.component.html',
  styleUrls: ['./remove-client-pop-up.component.scss']
})
export class RemoveClientPopUpComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<RemoveClientPopUpComponent>) {}

  ngOnInit(): void { }

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }

}

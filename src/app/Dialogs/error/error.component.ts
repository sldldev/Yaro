/**
 * Imports of used components and modules
 */
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  templateUrl: './error.component.html',
  selector: 'app-error',

})

export class ErrorComponent {
  /**
   * constructor init with injectable Mat dialog data with message of type string
   * @param {{message: string}} data
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}

}

import {NgModule} from '@angular/core';
import {CdkVirtualScrollViewport, ScrollingModule} from '@angular/cdk/scrolling/';
import {CommonModule, DatePipe} from '@angular/common';

@NgModule({
  declarations: [],
  imports: [ ScrollingModule, CommonModule, ], // CdkVirtualScrollViewport
  exports: [ScrollingModule, ] //CdkVirtualScrollViewport
})

export class CdkVirtualScrollModule {
}

import {NgModule} from '@angular/core';
import {CdkVirtualScrollViewport, ScrollingModule} from '@angular/cdk/scrolling/';
import {CommonModule, DatePipe} from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CdkVirtualScrollViewport, ScrollingModule, CommonModule, ],
  exports: [CdkVirtualScrollViewport, ScrollingModule, ]
})

export class CdkVirtualScrollModule {
}

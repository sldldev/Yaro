import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { IFilterOption } from 'src/app/DataModels/filter-option.model';
import { ErrorComponent } from 'src/app/Dialogs/error/error.component';

@Component({
  selector: 'app-filter-by',
  templateUrl: './filter-by.component.html',
  styleUrls: ['./filter-by.component.scss'],
})
export class FilterByComponent implements OnInit, OnDestroy {
  @Input() filterOptions: IFilterOption[] = [{ value: '', label: '' }];

  @Output() newFilterPipeEvent = new EventEmitter<any>();
  @Output() dateSearchedEvent = new EventEmitter<any>();
  @Output() resetDateFilterEvent = new EventEmitter<any>();

  public curentfilterOption: IFilterOption = { value: '', label: '' };
  public filterStr: string | any = '';
  public filterKey = '';

  filtered: boolean;
  startDateSelected: Date = null;
  endDateSelected: Date  = null;
  dialog: any;

  newFilterPipe(filterStr: string) {
    this.newFilterPipeEvent.emit({
      filterStr: this.filterStr,
      filterKey: this.curentfilterOption.value,
    });
  }
  constructor() {}


  ngOnInit() {
    this.curentfilterOption = this.filterOptions[0];
  }

  changeKey(filterKey: string) {
    this.curentfilterOption = this.filterOptions.find(
      (filterOption) => filterOption.value === filterKey
    );
    this.newFilterPipe(this.filterStr);
  }

  dateSearched(filterStr: string) {

    if (this.startDateSelected == null && this.endDateSelected == null){
      return;
    }

    const start = this.startDateSelected ? this.startDateSelected : new Date(0);
    const end = this.endDateSelected ? this.endDateSelected : Date.now();
    this.newFilterPipeEvent.emit({
      filterStr: this.filterStr = {start: start, end: end} ,
      filterKey: this.curentfilterOption.value,
    });
  }

  resetDateFilter() {
    this.startDateSelected = null;
    this.endDateSelected =  null;
    this.filtered = false;
    this.resetDateFilterEvent.emit();
    this.newFilterPipeEvent.emit({
      filterStr: this.filterStr = '' ,
      filterKey: this.curentfilterOption.value,
    });
  }

  ngOnDestroy(): void {
    this.resetDateFilter();
  }
}

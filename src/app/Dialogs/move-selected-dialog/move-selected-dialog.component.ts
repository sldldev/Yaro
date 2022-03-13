import {Component, Inject, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {Album} from '../../DataModules/album.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FileObject} from '../../DataModules/file.model';
import {AlbumService} from '../../Services/album.service';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-move-selected-dialog',
  templateUrl: './move-selected-dialog.component.html',
  styleUrls: ['./move-selected-dialog.component.css']
})
export class MoveSelectedDialogComponent implements OnInit {
  myControl = new FormControl();
  options?: Album[];
  users: Observable<Album[]>;
  something = '';
  private selected;

  constructor(private albumService: AlbumService,
              public dialogRef: MatDialogRef<MoveSelectedDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: FileObject[]) {
  }

  ngOnInit() {
    this.albumService.getAlbums();
    this.users = this.albumService.getAlbumUpdateListener();
    this.users
      .subscribe(
        data => {
          this.options = data;
          // this.users2Show = data.sort(( l, r ) => {
          //   const left = l.lastName + l.firstName;
          //   const right = r.lastName + r.firstName;
          //   return left < right ? -1 : 1;
          // });
        });

    this.users = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): Album[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.AlbumName.toLowerCase().indexOf(filterValue) === 0);
  }

  onShopSelectionChanged(selected: any) {
    this.selected = selected._id;
  }
}

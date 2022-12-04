import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AlbumModel } from '../../DataModels/album.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileObject } from '../../DataModels/fileObject.model';
import { AlbumService } from '../../Services/album.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-move-selected-dialog',
  templateUrl: './move-selected-dialog.component.html',
  styleUrls: ['./move-selected-dialog.component.css'],
})
export class MoveCopySelectedDialogComponent implements OnInit {
  myControl = new FormControl();
  options?: AlbumModel[];
  albumObservable: Observable<AlbumModel[]>;
  //something = '';
  public selected;

  constructor(
    private albumService: AlbumService,
    public dialogRef: MatDialogRef<MoveCopySelectedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { files: FileObject[]; text: string }
  ) {}

  ngOnInit() {
    this.albumService.getAlbums();
    this.albumObservable = this.albumService.getAlbumUpdateListener();
    this.albumObservable.subscribe((albums) => {
      this.options = albums.filter((album)=>{return album.name!=='Recycle Bin'});
      //
      // this.users2Show = data.sort(( l, r ) => {
      //   const left = l.LastName + l.FirstName;
      //   const right = r.LastName + r.FirstName;
      //   return left < right ? -1 : 1;
      // });
    });

    this.albumObservable = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): AlbumModel[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(
      (option) => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  onShopSelectionChanged(selected: any) {
    this.selected = selected; //.objId;
  }
}

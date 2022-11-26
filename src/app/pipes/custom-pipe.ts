import { Pipe, PipeTransform } from "@angular/core";
import { AlbumModel } from "../DataModels/album.model";

@Pipe({
  name: "customPipe",
})
export class CustomPipe implements PipeTransform {
  transform(
    albumList: AlbumModel[],
    searchStrsList: string[],
    key: string[],
    i: number = -1
  ): any {
    if (i !== 0 && i !== -1) {
        console.log("CustomPime return");
      return albumList = this.transform(albumList, searchStrsList, key, i - 1);
    } else if (albumList.length === 0 || searchStrsList.length === 0) {
      return albumList;
    }

    if (i === -1) {
      i = searchStrsList.length - 1;
      console.log("CustomPime -1");
    }

    switch (key[i]) {
      case "name":
        console.log("CustomPime name");
        return albumList = albumList.filter(
          (album) =>
            album.name.toLowerCase().indexOf(
              searchStrsList[i].toLowerCase()
            ) !== -1
        );
        break;
      case "date":
        return albumList = albumList.filter(
          (album: { dateCreated: string }) =>
            album.dateCreated.toLowerCase().indexOf(
              searchStrsList[i].toLowerCase()
            ) !== -1
        );
        break;
      case "info":
        console.log("CustomPime info");
        return albumList = albumList.filter(
          (album: { info: string }) =>
            album.info.toLowerCase().indexOf(
              searchStrsList[i].toLowerCase()
            ) !== -1
        );
        break;
    }
  }
}

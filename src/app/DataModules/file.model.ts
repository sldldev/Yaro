/**
 * export the interface of FileObject
 */
export interface FileObject {
  _id: string;
  url: string;
  AlbumId: string;
  Creator: string;
  FileExtension: string;
  FileName: string;
  Shared: Array<SharedWith>[];
  FileSize: number;
  State: number;
  Show: number;
  exifData: any;
}

export interface SharedWith {
  album: string;
  user: string;

}

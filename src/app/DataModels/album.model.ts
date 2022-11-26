/**
 * interface of Album Data
 */
export interface AlbumModel {
  id: string;
  name: string;
  creator?: string;
  info: string;
  dateCreated: string;
  //files: string[];
}

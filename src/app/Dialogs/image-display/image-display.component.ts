import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FileObject} from 'src/app/DataModules/file.model';
import { log } from 'util';

declare var ol: any;


@Component({
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.scss']
})
export class ImageDisplayComponent implements OnInit {

  public dataImages: FileObject[];
  public currentImage: string;
  public currentIndex: number;
  public exif: any;
  public exifPresent = false;
  public displayGpsLocation = false;
  public latitude;
  public longitude;
  map: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { imageData: FileObject[], currentImage: string }) {
    this.initData(data);
  }

  /**
   * method responsible to init image data for preview
   * @param data
   */
  initData(data) {
    this.dataImages = data.imageData;
    this.currentImage = data.currentImage;
    console.dir(this.dataImages);
    console.log('this data' + this.currentImage);
    this.currentIndex = this.dataImages.findIndex(x => x.url === this.currentImage);
    console.log('The Index is:' + this.currentIndex);
    this.exif = this.dataImages[this.currentIndex].exifData;
    console.dir(this.exif);
    this.handleGpsDisplay()
  }

  /**
   * method responsible to init component and gps map data
   */
  ngOnInit(): void {
    this.handleGpsDisplay()
  }

  handleGpsDisplay(){
    console.log("Handling Gps Display")
    /*    const index = this.exif.findIndex(x => x.name === 'GPS Latitude');
    this.latitude = this.exif[index].value.replace(/[^\d.-]/g, ' ');
    this.latitude = this.parseToLat(this.latitude, 'n');
    this.longitude = this.exif[index + 2].value.replace(/[^\d.-]/g, ' ');
    this.longitude = this.parseToLat(this.longitude, 'e');
    console.log('this is it' + this.latitude + ':' + this.longitude);*/
    const lat = this.exif.findIndex(p => p.name === 'Decimal Latitude');
    const lon = this.exif.findIndex(p => p.name === 'Decimal Longitude');
    console.log(lat);
    // console.log('DD' + this.exif[lat].value + this.exif[lon].value);
    if (lat > 0) {
      this.displayGpsLocation=true;
      log("there are cordinates" + this.displayGpsLocation)


      this.map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          }),
          new ol.layer.Vector({
            source: new ol.source.Vector({
              features: [
                new ol.Feature({
                  geometry: new ol.geom.Point(ol.proj.fromLonLat([+this.exif[lon].value, +this.exif[lat].value])),
                })
              ]
            })
          }),
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([+this.exif[lon].value, +this.exif[lat].value]),
          zoom: 8
        }),
      });
    }

  }

  /**
   * method responsible to preview next photo
   */
  nextPhoto() {
    this.displayGpsLocation=false
    if ((this.currentIndex++) === this.dataImages.length - 1) {
      this.currentIndex = 0;
    }
    this.exif = this.dataImages[this.currentIndex].exifData;
    this.handleGpsDisplay()
  }

  /**
   * method responsible to preview previous photo
   */
  previousPhoto() {
    this.displayGpsLocation=false
    if ((this.currentIndex--) === 0) {
      this.currentIndex = this.dataImages.length - 1;
    }
    this.exif = this.dataImages[this.currentIndex].exifData;
    this.handleGpsDisplay()
  }

  /**
   * show hide exif toggle
   */
  toggleExif() {
    this.exifPresent = !this.exifPresent;
  }

  /**
   * method responsible to change the url distanation request
   * @param url - thumbnail URL
   */
  showPreviw(url: string) {
    return url.replace('.TH', '.PR');

  }

  /**
   * method responsible to parse DMS to DD gps cordinates
   * @param gpsCordinates
   * @param direction
   */
  parseToLat(gpsCordinates, direction) {
    const gps = gpsCordinates.split('  ');
    console.dir(gps);
    const d = gps[0];
    const m = gps[1];
    const s = gps[2];

    let $decimal;
    console.log($decimal);


    $decimal = (s / 3600) + (m / 60) + d;

    return $decimal;
  }
}



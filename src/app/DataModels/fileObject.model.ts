import { Timestamp } from "rxjs/internal/operators/timestamp";

/**
 * export the interface of FileObject
 */
export interface FileObject {
  objId: string;
  // hash64: string;
  url: string;
  albumId: string;
  creator: string;
  fileExtension: string;
  fileName: string;
  shared: Array<SharedWith>[];
  fileSize: number;
  state: number;
  show: number;
  exifData: ExifObject;
  processingType?: number;
}

export interface SharedWith {
  album: string;
  sharedWith: string;
  sharedBy: string;
}

export interface ExifObject
{
  imageHeight: string;
  imageWidth: string;
  dateCreated: Date;
  timeCreated: Date;
  dateTimeOriginal: Date;
  fileModifiedDate: Date;

  // Settings

  noiseReduction: string;
  apertureValue: string;
  exposureTime: string;
  fnumber: string;
  isoSpeedRatings: string;
  qualityFileFormat: string;
  whiteBalance: string;
  iso: string;
  highIsoNoiseReduction: string;
  byline: string;
  saturation: string;
  colourMode: string;
  sharpness: string;
  sceneCaptureType: string;
  whiteBalanceMode: string;
  exposureMode: string;
  exposureProgram: string;
  meteringMode: string;
  shootingMode: string;
  shutterSpeedValue: string;
  cameraHueAdjustment: string;
  afType: string;
  detectedFileTypeName: string;
  digitalVariProgram: string;
  captionAbstract: string;
  class: string;
  easyShootingMode: string;
  flash: string;
  signature: string;
  artist: string;
  copyrightNotice: string;
  copyright: string;
  keywords: string;
  source: string;
  jpegComment: string;

  //Image

  uniqueImageId: string;
  imageExpectednumberOfColumns: string;

  // Camera
  make: string;
  model: string;
  deviceManufacturer: string;
  cameraSerialNumber: string;
  bodySerialNumber: string;
  software: string;
  firmwareVersion: string;
  firmwareRevision: string;
  cameraTemperature: string;

   // Lens

  lens: string;
  lensModel: string;
  focalLength: string;
  lensType: string;

  // GPS TAGS
  sublocation: string;
  gpsAltitudeRef: string;
  gpsAltitude: string;
  gpsLatitudeRef: string;
  gpsLatitude: string;
  gpsLongitudeRef: string;
  gpsLongitude: string;
  //decimal_Latitude: string;
  //decimal_Longitude: string;

  // Video Related
  duration: string;
}

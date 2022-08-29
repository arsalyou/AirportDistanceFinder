export type Point =  {
    lat: number,
    lng: number
}

export type Coordinates = {
    sourceCoordinates?: Point,
    destinationCoordinates?: Point
}


export type AirportDetailType = {
    name?: string,
    points?: Point,
  }

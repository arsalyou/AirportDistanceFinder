export type MsgProps = {
    message: string,
    show: boolean
}

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

export type AirportFieldProps = {
    name: string
    setAirportDetails: (airportDetails: AirportDetailType | null) => void,
}

type country = {
    name: string,
    iso: string
  }
 type state =  {
    name: string,
    abbr: string,
    type: string
  }

export type AirportResponse = {
        name: string,
        city: string,
        iata: string,
        latitude: string,
        longitude: string,
        country: country ,
        state: state
}

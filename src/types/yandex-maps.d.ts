declare global {
  interface Window {
    ymaps: YandexMaps
  }
}

interface YandexMaps {
  ready: (callback: () => void) => void
  Map: new (container: string | HTMLElement, state: MapState, options?: MapOptions) => YandexMap
  Placemark: new (
    coordinates: number[],
    properties?: PlacemarkProperties,
    options?: PlacemarkOptions,
  ) => YandexPlacemark
  geocode: (address: string, options?: any) => Promise<any>
  control: {
    TrafficControl: new (options?: any) => any
  }
}

interface MapState {
  center: number[]
  zoom: number
  controls?: string[]
}

interface MapOptions {
  searchControlProvider?: string
}

interface YandexMap {
  geoObjects: {
    add: (geoObject: any) => void
    remove: (geoObject: any) => void
  }
  controls: {
    add: (control: any) => void
    remove: (control: any) => void
  }
  events: {
    add: (event: string, handler: () => void) => void
    remove: (event: string, handler: () => void) => void
  }
  behaviors: {
    enable: (behavior: string) => void
    disable: (behavior: string) => void
  }
  setBounds: (bounds: number[][], options?: any) => void
}

interface PlacemarkProperties {
  balloonContentHeader?: string
  balloonContentBody?: string
  balloonContentFooter?: string
  hintContent?: string
  iconContent?: string
}

interface PlacemarkOptions {
  iconLayout?: string
  iconImageHref?: string
  iconImageSize?: number[]
  iconImageOffset?: number[]
  balloonPanelMaxMapArea?: number
}

interface YandexPlacemark {
  balloon: {
    open: () => void
    close: () => void
  }
  geometry: {
    getCoordinates: () => number[]
  }
  properties: {
    get: (key: string) => any
    set: (key: string, value: any) => void
  }
}

export {}

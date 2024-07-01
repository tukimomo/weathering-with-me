export interface RawWeatherForecast {
    dt: number,
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number; // unit default: hPa
        sea_level: number; // unit default: hPa
        grnd_level: number; // unit default: hPa
        humidity: number; // percentage
        temp_kf: number
    },
    weather: Array<{
        id: any;
        main: string;
        description: string;
        icon: string;
    }>,
    clouds: {
        all: number // cloudiness
    },
    wind: {
        speed: number;
        deg: number;
        gust: number;
    },
    visibility: number, // unit is meters. maximum is 10km
    pop: number, // probability of precipitation value betwwen 0 and 1. 0 is equal to 1% and 1 is equal to 100%
    sys: {
        pod: string // day or night
    },
    dt_txt: string,
}

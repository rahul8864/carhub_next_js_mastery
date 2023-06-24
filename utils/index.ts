import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
    const { manufacturer, year, fuel, limit, model } = filters;
    const headers = {
        'X-RapidAP1-Key': 'KJwZZIJSFimshuivMSVGaiYzkRomp15f2vKjsnK4bKzuUzVLzA',
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }

    const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/vl/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`, {
        headers: headers,
    });

    // const result = await response.json();

    // const simpleData = [
    //     { city_mpg: 23, class: 'compact car', combination_mpg: 24, cylinders: 4, displacement: 1.6, drive: 'fwd', fuel_type: 'gas', highway_mpg: 26, make: 'toyota', model: 'corolla', transmission: 'a', year: 1993 }
    // ]

    let simpleData = [];
    for (let i = 0; i < 12; i++) {
        simpleData.push({ city_mpg: 23, class: 'compact car', combination_mpg: 24, cylinders: 4, displacement: 1.6, drive: 'fwd', fuel_type: 'gas', highway_mpg: 26, make: 'toyota', model: 'corolla', transmission: 'a', year: 1993 })
    }
    const result = simpleData;

    return result;
}

export const calculatedCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50;
    const mileageFactor = 0.1;
    const ageFactor = 0.05;

    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;

    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

    return rentalRatePerDay.toFixed(0);
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
    const url = new URL('https://cdn.imagin.studio/getimage');

    const { make, year, model } = car;

    url.searchParams.append('customer', 'hrjavascript-mastery');
    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model.split(' ')[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    url.searchParams.append('angle', `${angle}`);

    return `${url}`
}

export const updateSearchParams = (type: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(type, value)

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

    return newPathname;
}
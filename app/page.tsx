"use client"

import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components'
import { fuels, yearsOfProduction, manufacturers } from '@/constants';
import { fetchCars } from '@/utils'
import { useEffect, useState } from 'react';
import Image from 'next/image'

export default async function Home() {

  const [allCars, setAllCars] = useState([
    { city_mpg: 23, class: 'compact car', combination_mpg: 24, cylinders: 4, displacement: 1.6, drive: 'fwd', fuel_type: 'gas', highway_mpg: 26, make: 'toyota', model: 'corolla', transmission: 'a', year: 1993 }
  ]);
  const [loading, setLoading] = useState(false);

  //search states
  const [manufacturer, setManufacturer] = useState('')
  const [model, setModel] = useState('')

  //filter states
  const [fuel, setFuel] = useState('');
  const [year, setYear] = useState(2022);

  // pagination states
  const [limit, setLimit] = useState(10);

  const getCars = async () => {
    setLoading(true);
    try {
      const result = await fetchCars({
        manufacturer: manufacturer || '',
        year: year || 2022,
        fuel: fuel || '',
        limit: limit || 10,
        model: model || ''
      });

      setAllCars(result)
    } catch(error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  // useEffect(() => {
  //   getCars();
  // }, [fuel, year, limit, manufacturer, model])

  // this way issue comming ...
  // const allCars = await fetchCars({
  //   manufacturer: searchParams.manufacturer || '',
  //   year: searchParams.year || 2022,
  //   fuel: searchParams.fuel || '',
  //   limit: searchParams.limit || 10,
  //   model: searchParams.model || ''
  // });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className='home__filters'>
          {/* <SearchBar /> */}
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />
          <div className='home__filter-container'>
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel} />
            <CustomFilter title="year" options={yearsOfProduction} setFilter={setYear} />
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars.map((car , i) => <CarCard key={i} car={car} />)}
            </div>

            {/* <ShowMore pageNumber={(searchParams.limit || 10) / 10} isNext={(searchParams.limit || 10) > allCars.length} /> */}

            {loading && (
              <div className="w-full mt-16 flex-center">
                <Image src='/loader.svg' alt="loader" width={50} height={50} className='object-contain'/>
              </div>
            )}
            <ShowMore pageNumber={limit} isNext={limit > allCars.length} setLimit={setLimit} />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-xl font-bold text-black'>Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  )
}

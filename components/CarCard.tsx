"use client"
import { useState } from 'react'
import Image from  'next/image'
import { CarProps } from '@/types'
import CustomButton from './CustomButton'
import { calculatedCarRent, generateCarImageUrl } from '@/utils'
import CarDetails from './CarDetails'

interface CarCardProps {
  car: CarProps;
}

function CarCard({ car }: CarCardProps) {
  const { city_mpg, drive, make, model, transmission, year } = car;

  const [isOpen, setIsOpen] = useState(false);

  const carRent = calculatedCarRent(city_mpg, year)

  const items = [
    { id: 1, img: 'steering-wheel', name: `${transmission === 'a' ? 'Automatic' : 'Manual'}`, },
    { id: 2, img: 'tire', name: drive.toUpperCase(), },
    { id: 3, img: 'gas', name: `${city_mpg} MPG`, }
  ]
  return (
    <div className='car-card group'>
      <div className='car-card__content'>
        <h2 className='car-card__content-title'>{make} {model}</h2>
      </div>
      <p className='flex mt-6 text-[32px] font-extrabold'>
        <span className='self-start text-[14px] font-semibold'>
          $
        </span>
          {carRent}
        <span className='self-end text-[14px] font-medium'>
          /day
        </span>
      </p>
      <div className='relative object-contain w-full h-40 my-3'>
        <Image src={generateCarImageUrl(car)} fill priority className='object-contain' alt='car model' />
      </div>
      <div className='relative flex w-full mt-2'>
        <div className='flex justify-between w-full group-hover:invisible text-gray'>
          {items.map((item, i) => (
            <div key={i} className='flex flex-col items-center justify-center gap-2'>
              <Image src={`/${item.img}.svg`} width={20} height={20} alt={item.img} />
              <p className='text-[14px]'>{item.name}</p>
            </div>
          ))}
        </div>
        <div className='car-card__btn-container'>
          <CustomButton title="View More" containerStyles='w-full py-[16px] rounded-full bg-primary-blue' textStyles="text-white text-[14px] leading-[17px] font-bold" rightIcon="/right-arrow.svg" handleClick={() => setIsOpen(true)} />
        </div>
      </div>
      <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
    </div>
  )
}

export default CarCard

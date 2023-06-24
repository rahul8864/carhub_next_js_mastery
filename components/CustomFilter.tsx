"use client"

import { useState, Fragment } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { Listbox, Transition } from '@headlessui/react' 
import { CustomFilterProps } from '@/types';
import { updateSearchParams } from '@/utils';

function CustomFilter({ title, options, setFilter }: CustomFilterProps) {
  const [selected, setSelected] = useState(options[0]);

  const router = useRouter();

  // const handleUpdateParams = (e: { title: string, value: string }) => {
  //   const newPathname = updateSearchParams(title, e.value.toLowerCase());
  //   router.push(newPathname);
  // }

  return (
    <div className='w-fit'>
      <Listbox value={selected} onChange={(e) => { setSelected(e); setFilter(e.value) }}>
        <div className='relative z-10 w-fit'>
          <Listbox.Button className="custom-filter__btn">
            <span>{selected.title}</span>
            <Image src="/chevron-up-down.svg" height={20} width={20} className='object-contain ml-4' alt="chevron up down" />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
              <Listbox.Options className="custom-filter__options">
                {options.map((option, index) => (
                  <Listbox.Option key={index} value={option} className={({ active }) => `relative cursor-default select-none py-2 px-4 ${active ? "bg-primary-blue text-white" : "text-gray-900" }`}>
                    {({ selected }) => (
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{option.title}</span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CustomFilter

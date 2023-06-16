import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    handleClick: MouseEventHandler<HTMLButtonElement>
    btnType?:  'submit' | 'submit';
}

export interface SearchManufacturerProps {
    manufacturer: string;
    SearchManufacturer: (manufacturer: string) => void;
}
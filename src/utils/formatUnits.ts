import { UnitType } from '../types/load';

export function formatUnits(value: number, unit: UnitType) {
  const units = {
    meters: 'm',
    centimeters: 'cm',
    grams: 'g',
    kilograms: 'kg',
    tons: 't',
  };

  return `${value} ${units[unit]}`;
}

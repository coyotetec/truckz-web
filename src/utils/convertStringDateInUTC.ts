import { parse } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

export function convertStringDateInUTC(date: string) {
  const dateParsed = parse(date, 'dd/MM/yyyy', new Date());
  return zonedTimeToUtc(dateParsed, 'UTC').toISOString();
}

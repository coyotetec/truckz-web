import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
export function formatDate(date: string) {
  const dateParsed = utcToZonedTime(date, 'Etc/GMT-0');
  return format(dateParsed, 'dd/MM/yyyy');
}

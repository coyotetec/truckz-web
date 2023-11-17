export function formatAddress(
  address: string,
  number: number | undefined,
  district: string,
) {
  const parts: string[] = [];

  if (address) {
    parts.push(address);
  }

  if (number) {
    parts.push(`${number}`);
  }

  if (district) {
    parts.push(district);
  }

  return parts.join(', ');
}

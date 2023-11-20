function removeAccents(str: string) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function formatCamelCase(str: string) {
  const withoutAccents = removeAccents(str);
  return withoutAccents
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s-](.)/g, (_, c) => c.toUpperCase());
}

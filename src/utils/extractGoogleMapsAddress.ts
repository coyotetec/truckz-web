export function extractGoogleMapsAddress(
  components: google.maps.GeocoderAddressComponent[],
) {
  const zipcode =
    components.find((component) => component.types.includes('postal_code'))
      ?.long_name || '';
  const address =
    components.find((component) => component.types.includes('route'))
      ?.long_name || '';
  const number = Number(
    components.find((component) => component.types.includes('street_number'))
      ?.long_name,
  );
  const district =
    components.find((component) =>
      component.types.includes('sublocality_level_1'),
    )?.long_name || '';
  const city =
    components.find((component) =>
      component.types.includes('administrative_area_level_2'),
    )?.long_name || '';
  const state =
    components.find((component) =>
      component.types.includes('administrative_area_level_1'),
    )?.short_name || '';

  return {
    zipcode,
    address,
    ...(number && { number }),
    district,
    city,
    state,
  };
}

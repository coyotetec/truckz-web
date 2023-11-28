import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { useCallback, useMemo } from 'react';

type Route = google.maps.DirectionsResult | null;
interface MapProps {
  onLoadMap: (map: google.maps.Map) => void;
  origin: google.maps.LatLngLiteral | null;
  destination: google.maps.LatLngLiteral | null;
  route: google.maps.DirectionsResult | null;
  setRoute: (route: Route) => void;
}

type DirectionsRequest = google.maps.DirectionsRequest;

export function Map({
  onLoadMap,
  origin,
  destination,
  route,
  setRoute,
}: MapProps) {
  const center = useMemo(
    () => ({
      lat: -2.984747211251879,
      lng: -47.349780304208046,
    }),
    [],
  );
  const options = useMemo(
    () => ({
      clickableIcons: false,
      disableDefaultUI: true,
      zoomControl: false,
      draggable: false,
      draggableCursor: 'default',
    }),
    [],
  );

  const direcetionsServiceOptions = useMemo<DirectionsRequest>(() => {
    return {
      origin: origin || '',
      destination: destination || '',
      travelMode: google.maps.TravelMode.DRIVING,
    };
  }, [origin, destination]);

  const directionsCallback = useCallback(
    (
      result: google.maps.DirectionsResult | null,
      status: google.maps.DirectionsStatus,
    ) => {
      if (result !== null && status === 'OK') {
        setRoute(result);
      } else {
        console.log(result, status);
      }
    },
    [setRoute],
  );

  const directionsRendererOptions = useMemo(() => {
    return {
      directions: route,
    };
  }, [route]);

  return (
    <>
      <GoogleMap
        center={center}
        zoom={10}
        mapContainerStyle={{
          width: '100%',
          height: '13.75rem',
          borderRadius: '0.5rem',
        }}
        onLoad={onLoadMap}
        options={options}
      >
        {origin && destination && (
          <DirectionsService
            options={direcetionsServiceOptions}
            callback={directionsCallback}
          ></DirectionsService>
        )}
        {route && directionsRendererOptions && (
          <DirectionsRenderer
            options={directionsRendererOptions}
          ></DirectionsRenderer>
        )}
      </GoogleMap>
    </>
  );
}

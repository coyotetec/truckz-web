import { useEffect, useState } from 'react';
import { Input } from '../../../../components/Input';
import { ButtonAddress, PickupAndDeliveryContainer } from './styles';
import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api';
import { Map } from '../Map';
import { libs } from './libsGoogle';

export function PickupAndDelivery() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [pickupInput, setPickupInput] =
    useState<google.maps.places.SearchBox | null>(null);
  const [pickUpPoint, setPickUpPoint] = useState<google.maps.LatLngLiteral>();
  const [deliveryInput, setDeliveryInput] =
    useState<google.maps.places.SearchBox | null>(null);
  const [deliveryPoint, setDeliveryPoint] =
    useState<google.maps.LatLngLiteral>();
  const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>(null);
  const [destination, setDestination] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [route, setRoute] = useState<google.maps.DirectionsResult | null>(null);

  const [inputTypePickup, setInputTypePickup] = useState('text');
  const [inputTypeDelivery, setInputTypeDelivery] = useState('text');

  const onChangePickup = () => {
    const places = pickupInput?.getPlaces();
    const place = places?.[0];
    const location = {
      lat: place?.geometry?.location?.lat() || 0,
      lng: place?.geometry?.location?.lng() || 0,
    };
    setPickUpPoint(location);
    setOrigin(null);
    setDestination(null);
    setRoute(null);
    map?.panTo(location);
  };

  const onChangeDelivery = () => {
    const places = deliveryInput?.getPlaces();
    const place = places?.[0];
    const location = {
      lat: place?.geometry?.location?.lat() || 0,
      lng: place?.geometry?.location?.lng() || 0,
    };
    setDeliveryPoint(location);
    setOrigin(null);
    setDestination(null);
    setRoute(null);
    map?.panTo(location);
  };

  useEffect(() => {
    const traceRoute = () => {
      if (pickUpPoint && deliveryPoint) {
        setOrigin(pickUpPoint);
        setDestination(deliveryPoint);
      }
    };
    traceRoute();
  }, [pickUpPoint, deliveryPoint]);

  return (
    <PickupAndDeliveryContainer>
      <h4>Coleta e entrega</h4>

      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}
        libraries={libs}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <StandaloneSearchBox
            onLoad={(ref) => setPickupInput(ref)}
            onPlacesChanged={onChangePickup}
          >
            <Input
              type="text"
              label="Coleta"
              placeholder="Endereço da coleta"
            />
          </StandaloneSearchBox>

          <div className="container-buttons">
            <ButtonAddress isActive>Local Atual</ButtonAddress>
            <ButtonAddress>Locais Salvos</ButtonAddress>
          </div>
          <Input
            type={inputTypePickup}
            placeholder="Data estimada da coleta"
            onFocus={() => setInputTypePickup('date')}
            onBlur={() => setInputTypePickup('text')}
          />
          <StandaloneSearchBox
            onLoad={(ref) => setDeliveryInput(ref)}
            onPlacesChanged={onChangeDelivery}
          >
            <Input
              type="text"
              placeholder="Endereço da entrega"
              label="Entrega"
              wrapperStyle={{ paddingTop: '1rem' }}
            />
          </StandaloneSearchBox>

          <div className="container-buttons">
            <ButtonAddress isActive>Local Atual</ButtonAddress>
            <ButtonAddress>Locais Salvos</ButtonAddress>
          </div>
          <Input
            type={inputTypeDelivery}
            placeholder="Data estimada da entrega"
            onFocus={() => setInputTypeDelivery('date')}
            onBlur={() => setInputTypeDelivery('text')}
          />
        </form>

        {pickUpPoint && deliveryPoint && (
          <>
            <small>Rota da carga</small>
            <Map
              onLoadMap={(map: google.maps.Map) => setMap(map)}
              origin={origin || null}
              destination={destination || null}
              route={route}
              setRoute={setRoute}
            />
          </>
        )}
      </LoadScript>
    </PickupAndDeliveryContainer>
  );
}

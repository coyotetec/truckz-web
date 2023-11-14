import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Input } from '../../../../components/Input';
import { Address, ButtonAddress, PickupAndDeliveryContainer } from './styles';
import { StandaloneSearchBox } from '@react-google-maps/api';
import { Map } from '../Map';
import { AdressesModal } from '../AdressesModal';
import { ISelectedAddress } from '../../../../../types/address';
import { NotePencil } from '@phosphor-icons/react';
import { extractGoogleMapsAddress } from '../../../../../utils/extractGoogleMapsAddress';
import { formatAddress } from '../../../../../utils/formatAdress';
import { MaskDateInput } from '../../../../components/MaskDateInput';
import { formErrorType } from '../../../../../types/global';

interface PickupAndDeliveryProps {
  formErrors: formErrorType;
}

export type PickupAndDeliveryRefType = {
  getData: () => {
    pickupAddress: ISelectedAddress;
    deliveryAddress: ISelectedAddress;
    pickupDate: string;
    deliveryDate: string;
  };
};

export const PickupAndDelivery = forwardRef(
  ({ formErrors }: PickupAndDeliveryProps, ref) => {
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [pickupInput, setPickupInput] =
      useState<google.maps.places.SearchBox | null>(null);
    const [deliveryInput, setDeliveryInput] =
      useState<google.maps.places.SearchBox | null>(null);
    const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>(
      null,
    );
    const [destination, setDestination] =
      useState<google.maps.LatLngLiteral | null>(null);
    const [route, setRoute] = useState<google.maps.DirectionsResult | null>(
      null,
    );

    const [pickupAddressModalVisible, setPickupAddressModalVisible] =
      useState(false);
    const [deliveryAddressModalVisible, setDeliveryAddressModalVisible] =
      useState(false);
    const [pickupAddress, setPickupAddress] =
      useState<ISelectedAddress | null>();
    const [deliveryAddress, setDeliveryAddress] =
      useState<ISelectedAddress | null>();
    const [pickupDate, setPickupDate] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');

    function onChangePickup() {
      const places = pickupInput?.getPlaces();
      const place = places?.[0];

      if (
        place?.name &&
        place?.geometry?.location &&
        place.address_components
      ) {
        setPickupAddress({
          name: place.name,
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
          ...extractGoogleMapsAddress(place.address_components),
        });

        setOrigin(null);
        setDestination(null);
        setRoute(null);
        map?.panTo({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }
    }

    function onChangeDelivery() {
      const places = deliveryInput?.getPlaces();
      const place = places?.[0];
      if (
        place?.name &&
        place?.geometry?.location &&
        place.address_components
      ) {
        setDeliveryAddress({
          name: place.name,
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
          ...extractGoogleMapsAddress(place.address_components),
        });

        setOrigin(null);
        setDestination(null);
        setRoute(null);
        map?.panTo({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }
    }

    useEffect(() => {
      const traceRoute = () => {
        if (pickupAddress && deliveryAddress) {
          setOrigin({
            lat: pickupAddress.latitude,
            lng: pickupAddress.longitude,
          });
          setDestination({
            lat: deliveryAddress.latitude,
            lng: deliveryAddress.longitude,
          });
        }
      };
      traceRoute();
    }, [pickupAddress, deliveryAddress]);

    useImperativeHandle(
      ref,
      () => ({
        getData: () => ({
          pickupAddress,
          deliveryAddress,
          pickupDate,
          deliveryDate,
        }),
      }),
      [pickupAddress, deliveryAddress, pickupDate, deliveryDate],
    );

    return (
      <PickupAndDeliveryContainer>
        <AdressesModal
          visible={pickupAddressModalVisible}
          onCloseModal={() => setPickupAddressModalVisible(false)}
          onSelect={setPickupAddress}
        />
        <AdressesModal
          visible={deliveryAddressModalVisible}
          onCloseModal={() => setDeliveryAddressModalVisible(false)}
          onSelect={setDeliveryAddress}
        />
        <h4>Coleta e entrega</h4>

        <form onSubmit={(e) => e.preventDefault()}>
          {pickupAddress ? (
            <Address>
              <h5>{pickupAddress.name}</h5>
              <small>
                {formatAddress(
                  pickupAddress.address,
                  pickupAddress.number,
                  pickupAddress.district,
                )}
              </small>
              <p>{`${pickupAddress.city}, ${pickupAddress.state}`}</p>
              <NotePencil size={24} onClick={() => setPickupAddress(null)} />
            </Address>
          ) : (
            <>
              <StandaloneSearchBox
                onLoad={(ref) => setPickupInput(ref)}
                onPlacesChanged={onChangePickup}
              >
                <Input
                  type="text"
                  label="Coleta"
                  placeholder="Endereço da coleta"
                  error={formErrors?.pickupAddress}
                />
              </StandaloneSearchBox>

              <ButtonAddress
                type="button"
                onClick={() => setPickupAddressModalVisible(true)}
              >
                Locais Salvos
              </ButtonAddress>
            </>
          )}

          <MaskDateInput
            mask={Date}
            value={pickupDate}
            onChange={(value) => setPickupDate(value)}
            placeholder="Data estimada da coleta"
            error={formErrors?.pickupDate}
          />

          {deliveryAddress ? (
            <Address>
              <h5>{deliveryAddress.name}</h5>
              <small>
                {formatAddress(
                  deliveryAddress.address,
                  deliveryAddress.number,
                  deliveryAddress.district,
                )}
              </small>
              <p>{`${deliveryAddress.city}, ${deliveryAddress.state}`}</p>
              <NotePencil size={24} onClick={() => setDeliveryAddress(null)} />
            </Address>
          ) : (
            <>
              <StandaloneSearchBox
                onLoad={(ref) => setDeliveryInput(ref)}
                onPlacesChanged={onChangeDelivery}
              >
                <Input
                  type="text"
                  placeholder="Endereço da entrega"
                  label="Entrega"
                  wrapperStyle={{ paddingTop: '1rem' }}
                  error={formErrors?.deliveryAddress}
                />
              </StandaloneSearchBox>

              <ButtonAddress
                onClick={() => setDeliveryAddressModalVisible(true)}
              >
                Locais Salvos
              </ButtonAddress>
            </>
          )}
          <MaskDateInput
            mask={Date}
            placeholder="Data estimada da entrega"
            value={deliveryDate}
            onChange={(value) => setDeliveryDate(value)}
            error={formErrors?.deliveryDate}
          />
        </form>

        {pickupAddress && deliveryAddress && (
          <>
            <small className="label-map">Rota da carga</small>
            <Map
              onLoadMap={(map: google.maps.Map) => setMap(map)}
              origin={origin || null}
              destination={destination || null}
              route={route}
              setRoute={setRoute}
            />
          </>
        )}
      </PickupAndDeliveryContainer>
    );
  },
);

PickupAndDelivery.displayName = 'PickupAndDelivery';

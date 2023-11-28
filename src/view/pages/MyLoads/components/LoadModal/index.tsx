import { useCallback, useMemo, useState } from 'react';
import { Modal } from '../../../../components/Modal';
import { ArrowRight, Check, X } from '@phosphor-icons/react';
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
} from '@react-google-maps/api';
import { Container, Content } from './styles';
import { IGetLoadResponse } from '../../../../../types/load';
import { renderLoadTypes } from '../../../../../utils/renderLoadTypes';
import { formatPrice } from '../../../../../utils/formatPrice';
import { formatUnits } from '../../../../../utils/formatUnits';
import boxes from '../../../../../assets/images/boxes.svg';
import { format } from 'date-fns';
import { useTheme } from 'styled-components';
import { Button } from '../../../../components/Button';

interface LoadModalProps {
  loadData: IGetLoadResponse;
  isVisible: boolean;
  onClose: () => void;
}

type DirectionsRequest = google.maps.DirectionsRequest;

export function LoadModal({ loadData, isVisible, onClose }: LoadModalProps) {
  const theme = useTheme();
  const [route, setRoute] = useState<google.maps.DirectionsResult | null>();
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
  const origin = useMemo<google.maps.LatLngLiteral>(
    () => ({
      lat: loadData.pickupAddress.latitude,
      lng: loadData.pickupAddress.longitude,
    }),
    [loadData.pickupAddress.latitude, loadData.pickupAddress.longitude],
  );

  const destination = useMemo<google.maps.LatLngLiteral>(
    () => ({
      lat: loadData.deliveryAddress.latitude,
      lng: loadData.deliveryAddress.longitude,
    }),
    [loadData.deliveryAddress.latitude, loadData.deliveryAddress.longitude],
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
    <Modal
      visible={isVisible}
      onClose={onClose}
      style={{ padding: 0 }}
      closeIconColor={theme.colors.white[100]}
    >
      <Container>
        <img
          className="load-image"
          src={loadData.loadImages[0]}
          alt={loadData.description}
        />
        <Content>
          <div>
            {renderLoadTypes(loadData.type)}
            <p className="title">{loadData.title}</p>
            <h4>{formatPrice(loadData.price)}</h4>
            <h5>Dados da carga</h5>
            <div className="load-data-container">
              <img src={boxes} alt="Caixas" />
              <div>
                <small>
                  <b>Largura: </b>
                  {formatUnits(loadData.width, loadData.dimensionsUnit)}
                </small>
                <small>
                  <b>Altura: </b>
                  {formatUnits(loadData.height, loadData.dimensionsUnit)}
                </small>
                <small>
                  <b>Comprimento: </b>
                  {formatUnits(loadData.length, loadData.dimensionsUnit)}
                </small>
                <small>
                  <b>Peso: </b>
                  {formatUnits(loadData.weight, loadData.weightUnit)}
                </small>
              </div>
            </div>
          </div>
          <div>
            <div className="origin-destination">
              <small className="city">{loadData.pickupAddress.city}</small>
              <ArrowRight size={20} weight="bold" />
              <small className="city">{loadData.deliveryAddress.city}</small>
            </div>
            <GoogleMap
              center={origin}
              zoom={10}
              mapContainerStyle={{
                width: '100%',
                height: '12.5rem',
                borderRadius: '0.5rem',
              }}
              options={options}
            >
              <DirectionsService
                options={direcetionsServiceOptions}
                callback={directionsCallback}
              />
              <DirectionsRenderer options={directionsRendererOptions} />
            </GoogleMap>
            <small className="date">
              {`A ser coletado até ${format(
                new Date(loadData.pickupDate),
                'dd/MM/yyyy',
              )}`}
            </small>
            <small className="date">
              {`A ser entregue até ${format(
                new Date(loadData.deliveryDate),
                'dd/MM/yyyy',
              )}`}
            </small>
          </div>
        </Content>
        <div className="buttons-container">
          <Button>
            <Check size={24} weight="bold" color={theme.colors.white[100]} />
            Finalizar
          </Button>
          <Button className="cancel">
            <X size={24} weight="bold" color={theme.colors.white[100]} />
            Cancelar
          </Button>
        </div>
      </Container>
    </Modal>
  );
}

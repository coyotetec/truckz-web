import { useMemo, useState } from 'react';
import { Modal } from '../../../../components/Modal';
import { ArrowRight, Check, X } from '@phosphor-icons/react';
import { Container, Content } from './styles';
import { IGetLoadResponse } from '../../../../../types/load';
import { renderLoadTypes } from '../../../../../utils/renderLoadTypes';
import { formatPrice } from '../../../../../utils/formatPrice';
import { formatUnits } from '../../../../../utils/formatUnits';
import boxes from '../../../../../assets/images/boxes.svg';
import { format } from 'date-fns';
import { useTheme } from 'styled-components';
import { Button } from '../../../../components/Button';
import { Map } from '../../../NewLoad/components/Map';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface LoadModalProps {
  loadData: IGetLoadResponse;
  isVisible: boolean;
  onClose: () => void;
}

export function LoadModal({ loadData, isVisible, onClose }: LoadModalProps) {
  const theme = useTheme();
  const [route, setRoute] = useState<google.maps.DirectionsResult | null>();
  const [isOpenModalImg, setIsOpenModalImg] = useState(false);
  const [imgToExpand, setImgToExpand] = useState('');

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

  return (
    <Modal
      visible={isVisible}
      onClose={onClose}
      style={{ padding: 0 }}
      closeIconColor={theme.colors.white[100]}
    >
      <Container>
        <Modal
          visible={isOpenModalImg}
          onClose={() => setIsOpenModalImg(!isOpenModalImg)}
          style={{
            padding: 0,
            display: 'flex',
            justifyContent: 'center',
            minWidth: 'auto',
            maxWidth: 'auto',
          }}
          closeIconColor={theme.colors.white[100]}
        >
          <img
            className="load-image-expanded"
            src={imgToExpand}
            alt={loadData.description}
          />
        </Modal>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation]}
        >
          {loadData.loadImages.map((img) => (
            <SwiperSlide key={img}>
              <img
                className="load-image"
                src={img}
                alt={loadData.description}
                onClick={() => {
                  setIsOpenModalImg(!isOpenModalImg);
                  setImgToExpand(img);
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
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
            <Map
              origin={origin}
              destination={destination}
              route={route || null}
              setRoute={setRoute}
            />
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

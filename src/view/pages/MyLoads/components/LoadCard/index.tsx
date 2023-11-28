import { ArrowRight } from '@phosphor-icons/react';
import { Card } from './styles';
import { formatPrice } from '../../../../../utils/formatPrice';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { renderLoadTypes } from '../../../../../utils/renderLoadTypes';

interface LoadCardProps {
  loadImage: string;
  price: number;
  createdAt: string;
  pickupCity: string;
  deliveryCity: string;
  title: string;
  description?: string;
  type: string;
  handleClick: () => void;
}

export function LoadCard({
  loadImage,
  price,
  createdAt,
  pickupCity,
  deliveryCity,
  title,
  type,
  description,
  handleClick,
}: LoadCardProps) {
  const date = new Date(createdAt);

  const dateFormatted = formatDistanceToNow(date, {
    locale: ptBR,
  }).replace('cerca de', 'há');

  return (
    <Card onClick={handleClick}>
      <img src={loadImage} alt={title} />
      <div className="content">
        <h5>{formatPrice(price)}</h5>
        <small>{dateFormatted}</small>

        <div className="local">
          <span>{pickupCity}</span>
          <ArrowRight size={18} />
          <span>{deliveryCity}</span>
        </div>

        <strong>{title || description}</strong>

        <div className="tags">{renderLoadTypes(type)}</div>
        <div className="line"></div>
      </div>
    </Card>
  );
}

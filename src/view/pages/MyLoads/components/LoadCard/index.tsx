import { ArrowRight } from '@phosphor-icons/react';
import { Card } from './styles';
import { formatPrice } from '../../../../../utils/formatPrice';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface LoadCardProps {
  loadImage: string;
  price: number;
  createdAt: string;
  pickupCity: string;
  deliveryCity: string;
  description: string;
  type: string;
}

export function LoadCard({
  loadImage,
  price,
  createdAt,
  pickupCity,
  deliveryCity,
  description,
  type,
}: LoadCardProps) {
  const date = new Date(createdAt);

  const dateFormatted = formatDistanceToNow(date, {
    locale: ptBR,
  }).replace('cerca de', 'há');

  return (
    <Card>
      <img src={loadImage} alt={description} />
      <div className="content">
        <h5>{formatPrice(price)}</h5>
        <small>{dateFormatted}</small>

        <div className="local">
          <span>{pickupCity}</span>
          <ArrowRight size={18} />
          <span>{deliveryCity}</span>
        </div>

        <strong>{description}</strong>

        <div className="tags">
          <span>{type}</span>
        </div>
        <div className="line"></div>
      </div>
    </Card>
  );
}

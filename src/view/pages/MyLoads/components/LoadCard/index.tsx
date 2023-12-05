import { ArrowRight, NotePencil } from '@phosphor-icons/react';
import { Card } from './styles';
import { formatPrice } from '../../../../../utils/formatPrice';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { renderLoadTypes } from '../../../../../utils/renderLoadTypes';
import { useNavigate } from 'react-router-dom';

interface LoadCardProps {
  id: string;
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
  id,
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
  const navigate = useNavigate();

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
      <button onClick={() => navigate(`/loads/update/${id}`)}>
        <NotePencil size={20} />
      </button>
    </Card>
  );
}

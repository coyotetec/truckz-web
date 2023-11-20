import { House, NotePencil } from '@phosphor-icons/react';
import { Card } from './styles';
import { formatAddress } from '../../../../../utils/formatAdress';
import { useNavigate } from 'react-router-dom';

interface AddressCardProps {
  id: string;
  name: string;
  address: string;
  number?: number | undefined;
  district: string;
  city: string;
  state: string;
}

export function AddressCard({
  id,
  address,
  city,
  district,
  name,
  state,
  number,
}: AddressCardProps) {
  const navigate = useNavigate();

  return (
    <Card>
      <header>
        <h5>{name}</h5>
        {name === 'Endereço Principal' && <House weight="fill" size={20} />}
      </header>
      <strong>{formatAddress(address, number, district)}</strong>
      <p>{`${city}, ${state}`}</p>
      <button
        className="editIcon"
        onClick={() => navigate(`/addresses/update/${id}`)}
      >
        <NotePencil size={18} weight="bold" />
      </button>
    </Card>
  );
}

import { House, NotePencil, Trash } from '@phosphor-icons/react';
import { Card } from './styles';
import { IAddressResponse } from '../../../../../types/address';
import { useNavigate } from 'react-router-dom';

interface AddressCardProps {
  data: IAddressResponse;
  onDelete: (address: IAddressResponse) => void;
}

export function AddressCard({ data, onDelete }: AddressCardProps) {
  const navigate = useNavigate();

  return (
    <Card>
      <header>
        <span className="name">{data.name}</span>
        {data.name === 'Endereço Principal' && (
          <House weight="fill" size={20} />
        )}
      </header>
      <strong>
        {data.address}, {data.number || 'S/N'}
      </strong>
      <p>
        {data.city}, {data.state}
      </p>
      <div className="actions">
        <button onClick={() => navigate(`/addresses/update/${data.id}`)}>
          <NotePencil size={18} weight="bold" />
        </button>
        {data.name !== 'Endereço Principal' && (
          <button className="delete" onClick={() => onDelete(data)}>
            <Trash size={18} weight="bold" />
          </button>
        )}
      </div>
    </Card>
  );
}

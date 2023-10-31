import { House, NotePencil } from '@phosphor-icons/react';
import { Card } from './styles';

export function AddressCard() {
  return (
    <Card>
      <div>
        <h4>Endereço principal</h4>
        <House weight="fill" size={24} />
      </div>
      <small>Rua Geraldo Bala, 460</small>
      <small>Paragominas, PA</small>
      <button className="editIcon">
        <NotePencil size={20} />
      </button>
    </Card>
  );
}

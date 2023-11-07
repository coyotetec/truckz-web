import { House, NotePencil } from '@phosphor-icons/react';
import { Card } from './styles';

export function AddressCard() {
  return (
    <Card>
      <header>
        <h5>Endereço principal</h5>
        <House weight="fill" size={20} />
      </header>
      <strong>Rua Geraldo Bala, 460</strong>
      <p>Paragominas, PA</p>
      <button className="editIcon">
        <NotePencil size={18} weight="bold" />
      </button>
    </Card>
  );
}

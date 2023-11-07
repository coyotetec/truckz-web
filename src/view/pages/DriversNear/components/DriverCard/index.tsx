import { Card } from './styles';

import user from '../../../../../assets/images/user-placeholder.png';
import { WhatsappIcon } from '../../../../components/icons/WhatsappIcon';

export function DriverCard() {
  return (
    <Card>
      <img src={user} alt="Foto do usuário" />
      <small>há 8 horas</small>
      <div>
        <strong>João da silva</strong>
        <span>Paragominas, PA</span>
      </div>
      <button>
        <WhatsappIcon />
      </button>
    </Card>
  );
}

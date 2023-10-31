import { Card } from './styles';

import whatsappLogo from '../../../../../assets/icons/whatsapp.svg';
import user from '../../../../../assets/images/user-placeholder.png';

export function DriverCard() {
  return (
    <Card>
      <img src={user} alt="Foto do usuário" />
      <small>há 8 horas</small>
      <div>
        <h4>João da silva</h4>
        <span>Paragominas,PA</span>
      </div>
      <button>
        <img src={whatsappLogo} alt="logo do WhatsApp" />
      </button>
    </Card>
  );
}

import { Card } from './styles';

import user from '../../../../../assets/images/user-placeholder.png';
import { WhatsappIcon } from '../../../../components/icons/WhatsappIcon';
import { IGetDriversNearResponse } from '../../../../../types/driver';
import { Link } from 'react-router-dom';

interface DriverCardProps {
  data: IGetDriversNearResponse;
}

export function DriverCard({ data }: DriverCardProps) {
  return (
    <Card>
      <img src={data.avatarUrl || user} alt="Foto do usuário" />
      <small>há 8 horas</small>
      <div>
        <strong>{data.fullName}</strong>
        <span>
          {data.city}, {data.state}
        </span>
      </div>
      <Link to={`https://wa.me/55${data.whatsappNumber}`} target="_blank">
        <WhatsappIcon />
      </Link>
    </Card>
  );
}

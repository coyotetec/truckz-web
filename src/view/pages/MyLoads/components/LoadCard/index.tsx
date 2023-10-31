import { ArrowRight } from '@phosphor-icons/react';
import { Card } from './styles';
import loads from '../../../../../assets/images/loads.jpg';
import { formatValue } from '../../../../../utils/formatValue';

export function LoadCard() {
  return (
    <Card>
      <img src={loads} alt="" />
      <div className="content">
        <h5>{formatValue(400)}</h5>
        <small>há 30 min.</small>

        <div className="local">
          <span>Paragominas, PA</span>
          <ArrowRight size={18} weight="bold" />
          <span>Castanhal, PA</span>
        </div>

        <strong>Caixas de papelão</strong>

        <div className="tags">
          <span>Carga Completa</span>
          <span>Complemento</span>
        </div>
        <div className="line"></div>
      </div>
    </Card>
  );
}

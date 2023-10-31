import { ArrowRight } from '@phosphor-icons/react';
import { Card } from './styles';
import loads from '../../../../../assets/images/loads.jpg';
import { formatValue } from '../../../../../utils/formatValue';

export function LoadCard() {
  return (
    <Card>
      <img src={loads} alt="" />
      <div className="content">
        <h4>{formatValue(400)}</h4>
        <small>há 30min</small>

        <div className="local">
          <span>City1</span>
          <ArrowRight size={18} />
          <span>City2</span>
        </div>

        <strong>Caixas de papelão</strong>
        <div className="tags">
          <span>Tag</span>
          <span>Tag</span>
          <span>Completa</span>
          <span>Complemento</span>
        </div>
        <div className="line"></div>
      </div>
    </Card>
  );
}
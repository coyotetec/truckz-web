import { ArrowRight } from '@phosphor-icons/react';
import { Card } from './style';
import loads from '../../../assets/loads.jpg';

export function LoadCard() {
  return (
    <Card>
      <img src={loads} alt="" />
      <div className="content">
        <h4>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(400)}
        </h4>
        <small>há 30min</small>

        <div className="local">
          <span>City1</span>
          <ArrowRight size={18} />
          <span>City2</span>
        </div>

        <strong>Caixas de papelão</strong>
        <div className="tags">
          <p>Tag</p>
          <p>Tag</p>
          <p>Completa</p>
          <p>Complemento</p>
        </div>
        <div className="line"></div>
      </div>
    </Card>
  );
}

import { useMemo, useState } from 'react';
import { ArrowLeft, Check } from '@phosphor-icons/react';
import { Container, FormAddress } from './styles';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { MaskInput } from '../../components/MaskInput';
import { statesOptions } from '../../../utils/statesOptions';
import { citiesOptions } from '../../../utils/citiesOptions';
import { Button } from '../../components/Button';
import { addressSchema } from './schemas';
import { formErrorType } from '../../../types/global';
import { formatZodErrors } from '../../../utils/formatZodErrors';
import { createAddress } from '../../../services/addresses';
import { Loader } from '../../components/Loader';

export function NewAddress() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [district, setDistrict] = useState('');
  const [reference, setReference] = useState('');
  const [state, setState] = useState('_');
  const [city, setCity] = useState('_');
  const cities = useMemo(() => (state ? citiesOptions[state] : []), [state]);
  const [formErrors, setFormErrors] = useState<formErrorType>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    const addressDataValidation = addressSchema.safeParse({
      name,
      zipcode,
      address,
      number,
      district,
      reference,
      state,
      city,
    });

    if (!addressDataValidation.success) {
      setIsLoading(false);
      return setFormErrors(formatZodErrors(addressDataValidation.error));
    }

    await createAddress(addressDataValidation.data);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/addresses');
    }, 1000);
  }

  return (
    <Container>
      <Loader visible={isLoading} />
      <header>
        <ArrowLeft
          size={32}
          weight="bold"
          onClick={() => navigate('/addresses')}
        />
        <div>
          <h1>Novo Endereço</h1>
          <p>Preencha os dados e crie um novo endereço</p>
        </div>
      </header>
      <FormAddress onSubmit={handleSubmit}>
        <Input
          name="name"
          label="Nome"
          placeholder="Nome do Endereço"
          value={name}
          onChange={({ target }) => setName(target.value)}
          error={formErrors?.name}
        />
        <MaskInput
          mask={'00000-000'}
          name="zipcode"
          label="CEP"
          placeholder="CEP do endereço"
          value={zipcode}
          onChange={(value) => setZipcode(value)}
          error={formErrors?.zipcode}
        />
        <Input
          name="address"
          label="Endereço"
          placeholder="Endereço do local"
          value={address}
          onChange={({ target }) => setAddress(target.value)}
          error={formErrors?.address}
        />
        <div className="number-district">
          <Input
            name="number"
            label="Número"
            placeholder="Número"
            wrapperStyle={{ width: '50%' }}
            value={number}
            onChange={({ target }) => setNumber(target.value)}
            error={formErrors?.number}
          />
          <Input
            name="district"
            label="Bairro"
            placeholder="Bairro"
            wrapperStyle={{ width: '50%' }}
            value={district}
            onChange={({ target }) => setDistrict(target.value)}
            error={formErrors?.district}
          />
        </div>
        <Input
          name="reference"
          label="Referência"
          placeholder="Referência caso haja"
          value={reference}
          onChange={({ target }) => setReference(target.value)}
          error={formErrors?.reference}
        />
        <div className="state-city">
          <Select
            name="state"
            label="Estado"
            value={state}
            placeholder="UF"
            options={statesOptions}
            onChange={({ target }) => {
              setState(target.value);
              setCity('_');
            }}
          />
          <Select
            name="city"
            label="Cidade"
            value={city}
            placeholder="Cidade"
            options={cities}
            onChange={({ target }) => setCity(target.value)}
            wrapperStyle={{ flex: 1 }}
          />
        </div>
        {(formErrors?.state || formErrors?.city) && (
          <span className="error">{formErrors?.state || formErrors?.city}</span>
        )}
      </FormAddress>
      <Button type="submit" onClick={handleSubmit}>
        <Check size={24} weight="bold" />
        Criar Endereço
      </Button>
    </Container>
  );
}

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Input } from '../Input';
import { MaskInput } from '../MaskInput';
import { Select } from '../Select';
import { FormAddress } from './styles';
import { citiesOptions } from '../../../utils/citiesOptions';
import { formErrorType } from '../../../types/global';
import { statesOptions } from '../../../utils/statesOptions';
import { IAddressResponse } from '../../../types/address';
import { formatCamelCase } from '../../../utils/formatCamelCase';
import axios from 'axios';

interface AddressFormProps {
  formErrors: formErrorType;
}

export type AddressFormRefType = {
  getData: () => {
    name: string;
    zipcode: string;
    address: string;
    number: string;
    district: string;
    reference: string;
    state: string;
    city: string;
  };
  setData: (address: IAddressResponse) => void;
};

export const AddressForm = forwardRef<AddressFormRefType, AddressFormProps>(
  ({ formErrors }, ref) => {
    const [name, setName] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [district, setDistrict] = useState('');
    const [reference, setReference] = useState('');
    const [state, setState] = useState('_');
    const [city, setCity] = useState('_');
    const cities = useMemo(() => (state ? citiesOptions[state] : []), [state]);
    const numberInputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        getData: () => ({
          name,
          zipcode,
          address,
          number,
          district,
          reference,
          state,
          city,
        }),
        setData: ({
          name,
          zipcode,
          address,
          number,
          district,
          reference,
          state,
          city,
        }: IAddressResponse) => {
          setName(name);
          zipcode && setZipcode(zipcode);
          setAddress(address);
          number && setNumber(String(number));
          setDistrict(district);
          reference && setReference(reference);
          setState(state);
          setCity(formatCamelCase(city));
        },
      }),
      [name, zipcode, address, number, district, reference, state, city],
    );

    useEffect(() => {
      async function getAddressByZipcode(zipcode: string) {
        const zipcodeFormatted = zipcode.replace('-', '');

        if (zipcodeFormatted.length === 8) {
          const { data } = await axios(
            `https://viacep.com.br/ws/${zipcodeFormatted}/json/`,
          );

          setAddress(data.logradouro);
          setDistrict(data.bairro);
          setState(data.uf);
          setCity(formatCamelCase(data.localidade));
          numberInputRef && numberInputRef.current?.focus();
        }
      }
      getAddressByZipcode(zipcode);
    }, [zipcode, numberInputRef]);

    return (
      <div>
        <FormAddress onSubmit={(e) => e.preventDefault()}>
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
              refInput={numberInputRef}
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
              onChange={(value) => {
                setState(value);
                setCity('_');
              }}
            />
            <Select
              name="city"
              label="Cidade"
              value={city}
              placeholder="Cidade"
              options={cities}
              onChange={(value) => setCity(value)}
              wrapperStyle={{ flex: 1 }}
            />
          </div>
          {(formErrors?.state || formErrors?.city) && (
            <span className="error">
              {formErrors?.state || formErrors?.city}
            </span>
          )}
        </FormAddress>
      </div>
    );
  },
);

AddressForm.displayName = 'AddressForm';

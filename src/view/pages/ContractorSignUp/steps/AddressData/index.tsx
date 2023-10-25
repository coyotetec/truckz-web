import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { statesOptions } from '../../../../../utils/statesOptions';
import { Input } from '../../../../components/Input';
import { MaskInput } from '../../../../components/MaskInput';
import { Select } from '../../../../components/Select';
import { citiesOptions } from '../../../../../utils/citiesOptions';
import { formErrorType } from '../../../../../types/global';

export interface IAddressData {
  zipcode: string;
  address: string;
  number: string;
  district: string;
  reference: string;
  state: string | undefined;
  city: string | undefined;
}

interface AddressDataProps {
  value: IAddressData;
  errors: formErrorType;
}

export type addressDataRefType = {
  getData: () => IAddressData;
};

export const AddressData = forwardRef<addressDataRefType, AddressDataProps>(
  ({ value, errors }, ref) => {
    const [data, setData] = useState<IAddressData>(value);
    const cities = useMemo(
      () => (data.state ? citiesOptions[data.state] : []),
      [data.state],
    );

    function handleDataChange(field: keyof IAddressData, value: string) {
      setData((prevState) => ({ ...prevState, [field]: value }));
    }

    useImperativeHandle(ref, () => ({
      getData() {
        return data;
      },
    }));

    return (
      <>
        <MaskInput
          name="zipcode"
          label="CEP"
          placeholder="CEP do endereço"
          mask="00000-000"
          value={data.zipcode}
          onChange={(value) => handleDataChange('zipcode', value)}
          error={errors?.zipcode}
        />
        <Input
          name="address"
          label="Endereço"
          placeholder="Endereço do local"
          value={data.address}
          onChange={(e) => handleDataChange('address', e.target.value)}
          error={errors?.address}
        />
        <div className="grouped">
          <MaskInput
            name="number"
            label="Número"
            placeholder="Número"
            wrapperStyle={{ flex: 1 }}
            mask={Number}
            scale={0}
            value={data.number}
            onChange={(value) => handleDataChange('number', value)}
            error={errors?.number}
          />
          <Input
            name="district"
            label="Bairro"
            placeholder="Bairro"
            wrapperStyle={{ flex: 1 }}
            value={data.district}
            onChange={(e) => handleDataChange('district', e.target.value)}
            error={errors?.district}
          />
        </div>
        <Input
          name="reference"
          label="Referência (opcional)"
          placeholder="Referência caso haja"
          value={data.reference}
          onChange={(e) => handleDataChange('reference', e.target.value)}
          error={errors?.reference}
        />
        <div className="grouped">
          <Select
            name="state"
            label="Estado"
            placeholder="UF"
            wrapperStyle={{ width: 140 }}
            options={statesOptions}
            value={data.state}
            onChange={(e) => {
              handleDataChange('state', e.target.value);
              handleDataChange('city', '_');
            }}
          />
          <Select
            name="city"
            label="Cidade"
            placeholder="Cidade"
            wrapperStyle={{ flex: 1 }}
            options={cities}
            value={data.city}
            onChange={(e) => handleDataChange('city', e.target.value)}
          />
        </div>
        {(errors?.state || errors?.city) && (
          <span className="error">{errors?.state || errors?.city}</span>
        )}
      </>
    );
  },
);

AddressData.displayName = 'AddressData';

import { forwardRef, useImperativeHandle, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Dropzone } from '../../../../components/Dropzone/index.tsx';
import { Input } from '../../../../components/Input/index.tsx';
import { Select } from '../../../../components/Select/index.tsx';
import { DataLoadContainer, PreviewImages } from './styles.ts';
import xCircle from '../../../../../assets/icons/xCircle.svg';
import { MaskInput } from '../../../../components/MaskInput/index.tsx';
import { formErrorType } from '../../../../../types/global';

interface IDimensionsData {
  lengthLoad: string;
  width: string;
  height: string;
}

interface LoadDataProps {
  formErrors: formErrorType;
}

export type LoadDataRefType = {
  getData: () => {
    images: File[];
    title: string;
    dimensionsUnit: string;
    height: string;
    width: string;
    length: string;
    weight: string;
    weightUnit: string;
    description: string;
    price: string;
    fullLoad: boolean;
    complementLoad: boolean;
  };
};

const weightOptions = [
  { value: 'grams', label: 'Gramas' },
  { value: 'kilograms', label: 'Kilogramas' },
  { value: 'tons', label: 'Toneladas' },
];
const dimensionOptions = [
  { label: 'Metros', value: 'meters' },
  { label: 'Centímetros', value: 'centimeters' },
];

const curreuncyMaskOptions = {
  mask: '$num',
  num: {
    mask: Number,
    scale: 2,
    signed: true,
    thousandsSeparator: '.',
    padFractionalZeros: true,
    normalizeZeros: false,
    mapToRadix: ['.'],
    min: 0,
    max: 999999999999,
  },
};

export const LoadData = forwardRef<LoadDataRefType, LoadDataProps>(
  ({ formErrors }: LoadDataProps, ref) => {
    const [images, setImages] = useState<File[]>([]);
    const [title, setTitle] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [fullLoad, setFullLoad] = useState(false);
    const [complementLoad, setComplementLoad] = useState(false);
    const [dimensionsUnit, setDimensionsUnit] = useState<string>('meters');
    const [dimensions, setDimensions] = useState<IDimensionsData>({
      lengthLoad: '',
      width: '',
      height: '',
    });
    const [weight, setWeight] = useState<string>('');
    const [weightUnit, setWeightUnit] = useState<string>('kilograms');
    const [description, setDescription] = useState<string>('');

    function handleDimensionsChange(
      field: keyof IDimensionsData,
      value: string,
    ) {
      setDimensions((prevState) => ({ ...prevState, [field]: value }));
    }

    useImperativeHandle(
      ref,
      () => ({
        getData: () => ({
          images,
          title,
          dimensionsUnit,
          height: dimensions.height,
          width: dimensions.width,
          length: dimensions.lengthLoad,
          weight,
          weightUnit,
          description,
          price,
          fullLoad,
          complementLoad,
        }),
      }),
      [
        images,
        title,
        dimensionsUnit,
        dimensions,
        weight,
        weightUnit,
        description,
        price,
        fullLoad,
        complementLoad,
      ],
    );

    return (
      <DataLoadContainer>
        <h4>Dados da Carga</h4>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            name="title"
            label="Título (Max. 24 caracteres)"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="Título da carga"
            error={formErrors?.title}
          />
          <MaskInput
            mask={'R$ num'}
            label="Preço"
            blocksOptions={curreuncyMaskOptions}
            placeholder="Preço"
            value={price}
            onChange={(value) => setPrice(value)}
            error={formErrors?.price}
          />

          <div className="load-type">
            <label>
              <input
                type="checkbox"
                value="full"
                checked={fullLoad === true}
                onChange={() => setFullLoad(!fullLoad)}
              />
              Carga completa
            </label>
            <label>
              <input
                type="checkbox"
                value="complement"
                checked={complementLoad === true}
                onChange={() => setComplementLoad(!complementLoad)}
              />
              Complemento
            </label>
            {formErrors?.fullLoad && (
              <span className="error">{formErrors.fullLoad}</span>
            )}
          </div>

          <div className="load-dimensions">
            <MaskInput
              label="Dimensões"
              placeholder="Comp."
              value={dimensions.lengthLoad}
              mask={Number}
              scale={2}
              min={0}
              max={999.99}
              radix=","
              onChange={(value) => handleDimensionsChange('lengthLoad', value)}
              error={formErrors?.['dimensions.lengthLoad']}
            />
            <MaskInput
              placeholder="Larg."
              mask={Number}
              value={dimensions.width}
              scale={2}
              min={0}
              max={999.99}
              radix=","
              onChange={(value) => handleDimensionsChange('width', value)}
              error={formErrors?.['dimensions.width']}
            />
            <MaskInput
              placeholder="Alt."
              mask={Number}
              value={dimensions.height}
              scale={2}
              min={0}
              max={999.99}
              radix=","
              onChange={(value) => handleDimensionsChange('height', value)}
              error={formErrors?.['dimensions.height']}
            />
          </div>
          <Select
            value={dimensionsUnit}
            onChange={({ target }) => setDimensionsUnit(target.value)}
            options={dimensionOptions}
          />
          <div className="weight-load">
            <MaskInput
              placeholder="Peso da carga"
              label="Peso"
              value={weight}
              mask={Number}
              scale={2}
              min={0}
              max={999.99}
              radix=","
              onChange={(value) => setWeight(value)}
              error={formErrors?.weight}
            />
            <Select
              wrapperStyle={
                formErrors?.weight
                  ? { marginTop: '0px' }
                  : { marginTop: '22px' }
              }
              placeholder="Kg"
              value={weightUnit}
              onChange={({ target }) => setWeightUnit(target.value)}
              options={weightOptions}
            />
          </div>
          <label>Descrição / Observações</label>
          <textarea
            placeholder="Descrição ou observações"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          ></textarea>
          <label>Fotos da carga</label>
          <Dropzone
            message="Clique aqui ou arraste as fotos da carga"
            onDrop={(files) => {
              const mappedFiles = files.map((file) => {
                const newFile = new File(
                  [file.slice(0, file.size, file.type)],
                  uuid(),
                  { type: file.type },
                );

                return newFile;
              });

              setImages((prevState) => [...prevState, ...mappedFiles]);
            }}
          />
          <PreviewImages>
            {images?.map((image) => (
              <>
                <div key={image.name}>
                  <img
                    src={URL.createObjectURL(image)}
                    alt={image.name}
                    key={image.name}
                  />
                  <img
                    src={xCircle}
                    alt="Ícone com X para remover imagem"
                    className="icon"
                    onClick={() =>
                      setImages(
                        images.filter(({ name }) => name !== image.name),
                      )
                    }
                  />
                </div>
              </>
            ))}
          </PreviewImages>
        </form>
      </DataLoadContainer>
    );
  },
);

LoadData.displayName = 'LoadData';

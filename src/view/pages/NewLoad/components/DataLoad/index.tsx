import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Dropzone } from '../../../../components/Dropzone';
import { Input } from '../../../../components/Input';
import { Select } from '../../../../components/Select';
import { DataLoadContainer, PreviewImages } from './styles.ts';
import xCircle from '../../../../../assets/icons/xCircle.svg';

export function DataLoad() {
  const [images, setImages] = useState<File[]>([]);

  return (
    <DataLoadContainer>
      <h4>Dados da Carga</h4>
      <form>
        <Input
          label="Título (Max. 24 caracteres)"
          type="text"
          placeholder="Título da carga"
        />
        <div className="dimensions-load">
          <Input label="Dimensões" placeholder="Comp." />
          <Input placeholder="Larg." />
          <Input placeholder="Alt." />
        </div>
        <Select placeholder="Metros" />
        <div className="weight-load">
          <Input placeholder="Peso da carga" label="Peso" />
          <Select placeholder="kg" />
        </div>
        <label>Descrição / Observações</label>
        <textarea placeholder="Descrição ou observações"></textarea>
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
              <div>
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
                    setImages(images.filter(({ name }) => name !== image.name))
                  }
                />
              </div>
            </>
          ))}
        </PreviewImages>
      </form>
    </DataLoadContainer>
  );
}

import { forwardRef, useImperativeHandle, useState } from 'react';
import { Dropzone } from '../../../../components/Dropzone';
import { ImagePreviewContainer } from './styles';
import placeholder from '../../../../../assets/images/placeholder.png';
import { formErrorType } from '../../../../../types/global';

export type logoImageType = File | null;

interface LogoImageProps {
  value: logoImageType;
  errors: formErrorType;
}

export type logoImageRefType = {
  getData: () => logoImageType;
};

export const LogoImage = forwardRef<logoImageRefType, LogoImageProps>(
  ({ value, errors }, ref) => {
    const [image, setImage] = useState<logoImageType>(value);
    const [preview, setPreview] = useState<string | null>(
      value ? URL.createObjectURL(value) : null,
    );

    useImperativeHandle(ref, () => ({
      getData() {
        return image;
      },
    }));

    return (
      <>
        <Dropzone
          message="Arraste seu arquivo aqui, ou clique para selecionar"
          accept={{
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg', '.jpg'],
          }}
          maxFiles={1}
          onDrop={(files) => {
            setImage(files[0] || null);
            setPreview(URL.createObjectURL(files[0]));
          }}
        />
        {errors?.logo && (
          <span className="error" style={{ marginTop: -12 }}>
            {errors?.logo}
          </span>
        )}
        <strong>Pré Visualização</strong>
        <ImagePreviewContainer>
          <img
            className="square"
            src={preview || placeholder}
            onLoad={() => (preview ? URL.revokeObjectURL(preview) : null)}
            alt="Previsualização da logo"
          />
          <img
            className="rect"
            src={preview || placeholder}
            onLoad={() => (preview ? URL.revokeObjectURL(preview) : null)}
            alt="Previsualização da logo"
          />
        </ImagePreviewContainer>
      </>
    );
  },
);

LogoImage.displayName = 'LogoImage';

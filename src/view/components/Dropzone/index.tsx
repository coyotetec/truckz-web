import ReactDropzone, { Accept } from 'react-dropzone';
import { Container } from './styles';

interface DropzoneProps {
  message?: string;
  accept?: Accept;
  maxFiles?: number;
  onDrop: (files: File[]) => void;
  containerStyle?: React.CSSProperties;
}

export function Dropzone({
  message,
  accept,
  maxFiles,
  onDrop,
  containerStyle,
}: DropzoneProps) {
  return (
    <ReactDropzone onDrop={onDrop} accept={accept} maxFiles={maxFiles}>
      {({ getRootProps, getInputProps }) => (
        <Container style={containerStyle}>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>{message || 'Clique ou arraste os arquivos'}</p>
          </div>
        </Container>
      )}
    </ReactDropzone>
  );
}

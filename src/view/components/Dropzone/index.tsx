import ReactDropzone, { Accept } from 'react-dropzone';
import { Container } from './styles';

interface DropzoneProps {
  message?: string;
  accept?: Accept;
  maxFiles?: number;
  onDrop: (files: File[]) => void;
}

export function Dropzone({ message, accept, maxFiles, onDrop }: DropzoneProps) {
  return (
    <ReactDropzone onDrop={onDrop} accept={accept} maxFiles={maxFiles}>
      {({ getRootProps, getInputProps }) => (
        <Container>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>{message || 'Clique ou arraste os arquivos'}</p>
          </div>
        </Container>
      )}
    </ReactDropzone>
  );
}

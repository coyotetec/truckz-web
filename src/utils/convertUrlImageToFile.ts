import axios from 'axios';

function blobToFile(blob: Blob, fileName: string) {
  const file = new File([blob], fileName, { type: blob.type });
  return file;
}

export async function convertUrlImageToFile(images: string[]) {
  const files = await Promise.all(
    images.map(async (imageUrl) => {
      const id = imageUrl.split('/').pop();
      const imgResponse = await axios.get(imageUrl, {
        responseType: 'blob',
      });
      return id && blobToFile(imgResponse.data, id);
    }),
  );
  return files.filter((file): file is File => file instanceof File);
}

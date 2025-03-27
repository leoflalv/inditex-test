import { ChangeEvent, useRef } from 'react';

import styles from './ImageUpload.module.css';

interface ImageUploadProps {
  onFileSelect: (file: File) => void;
  isUploading?: boolean;
  error?: Error | null;
  imageUrl?: string;
}

const ImageUpload = ({ onFileSelect, isUploading, error, imageUrl }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.container}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className={styles.fileInput}
      />
      <div className={styles.uploadArea} onClick={handleClick}>
        {imageUrl ? (
          <img src={imageUrl ? imageUrl : ''} alt="Preview" className={styles.preview} />
        ) : (
          <div className={styles.placeholder}>
            {isUploading ? 'Uploading...' : 'Click to upload image'}
          </div>
        )}
      </div>
      {error && <div className={styles.error}>{error.message}</div>}
    </div>
  );
};

export default ImageUpload;

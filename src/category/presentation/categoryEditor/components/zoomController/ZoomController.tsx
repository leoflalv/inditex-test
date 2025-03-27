import Button from '../../../../../shared/presentation/ui/button';
import { useCategoryManager } from '../../context/categoryManagerContext';

import styles from './ZoomController.module.css';

const ZoomController = () => {
  const { zoom, increaseZoom, decreaseZoom, isEditMode } = useCategoryManager();

  const disableIncreaseZoom = zoom >= 100;
  const disableDecreaseZoom = zoom <= 40;

  if (!isEditMode) {
    return null;
  }

  return (
    <div className={styles.zoomControls}>
      <Button onClick={increaseZoom} title="Zoom in" size="small" disabled={disableIncreaseZoom}>
        +
      </Button>
      <span className={styles.zoomValue}>{zoom}%</span>
      <Button size="small" onClick={decreaseZoom} title="Zoom out" disabled={disableDecreaseZoom}>
        −
      </Button>
    </div>
  );
};

export default ZoomController;

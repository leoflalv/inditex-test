import { CloseIcon } from '../../../assets/icons';
import Button, { ButtonProps } from '../ui/button/Button';

import styles from './RemoveButton.module.css';

const RemoveButton = (props: ButtonProps) => (
  <Button
    title="Remove element"
    variant="contained"
    size="small"
    color="error"
    className={styles.removeButton}
    {...props}
  >
    <CloseIcon size={12} />
  </Button>
);

export default RemoveButton;

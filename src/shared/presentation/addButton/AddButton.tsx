import Button, { ButtonProps } from '../ui/button/Button';

import styles from './AddButton.module.css';

const AddButton = (props: ButtonProps) => (
  <Button
    title="Add element"
    variant="contained"
    size="small"
    className={styles.addButton}
    {...props}
  >
    +
  </Button>
);

export default AddButton;

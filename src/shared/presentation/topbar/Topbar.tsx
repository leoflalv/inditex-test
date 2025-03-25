import { EditIcon, ZaraIcon } from '../../../assets/icons';
import IconButton from '../iconButton';

import styles from './Topbar.module.css';

const TopBar = () => (
  <div className={styles.topbar}>
    <ZaraIcon size={70} />
    <IconButton icon={<EditIcon />} />
  </div>
);

export default TopBar;

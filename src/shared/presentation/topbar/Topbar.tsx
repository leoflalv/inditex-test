import styles from './Topbar.module.css';

const TopBar = () => (
  <div className={styles.topbar}>
    <div >
      <div style={{ backgroundColor: 'red', height: '10px', width: '10px' }} />
    </div>
    <button>
      Click Me
    </button>
  </div>
);

export default TopBar;

import Category from './pages/Category';
import Template from './shared/presentation/template';

import styles from './App.module.css';

const App = () => (
  <div className={styles.mainContainer}>
    <Template >
      <Category />
    </Template>
  </div>
)

export default App;

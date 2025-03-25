import CategoryEditor from './category/presentation/categoryEditor';
import Template from './shared/presentation/template';

import styles from './App.module.css';

const App = () => (
  <div className={styles.mainContainer}>
    <Template>
      <CategoryEditor />
    </Template>
  </div>
);

export default App;

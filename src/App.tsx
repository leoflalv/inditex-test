import CategoryEditor from './category/presentation/categoryEditor';
import { ProductModalProvider } from './products/presentation/context/ProductModalContext';
import Template from './shared/presentation/template';

import styles from './App.module.css';

const App = () => (
  <div className={styles.mainContainer}>
    <Template>
      <ProductModalProvider>
        <CategoryEditor />
      </ProductModalProvider>
    </Template>
  </div>
);

export default App;

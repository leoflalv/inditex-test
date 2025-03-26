import CategoryEditor from './category/presentation/categoryEditor';
import Template from './shared/presentation/template';
import { ModalProvider } from './shared/presentation/ui/modal';

import styles from './App.module.css';

const App = () => (
  <div className={styles.mainContainer}>
    <Template>
      <ModalProvider>
        <CategoryEditor />
      </ModalProvider>
    </Template>
  </div>
);

export default App;

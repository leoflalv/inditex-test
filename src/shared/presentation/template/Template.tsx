import TopBar from '../topbar';

import styles from './Template.module.css';

interface TemplateProps {
  children: React.ReactNode;
}

const Template = ({ children }: TemplateProps) => (
  <div className={styles.container}>
    <TopBar />
    <main className={styles.content}>{children}</main>
  </div>
);

export default Template;

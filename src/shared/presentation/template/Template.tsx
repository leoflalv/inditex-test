import TopBar from "../topbar";

import styles from './Template.module.css';

interface TemplateProps {
  children: React.ReactNode;
}

const Template = ({ children }: TemplateProps) => (
  <div className={styles.container}>
    <TopBar />
    <div className={styles.content}>
      {children}
    </div>
  </div>
);

export default Template;

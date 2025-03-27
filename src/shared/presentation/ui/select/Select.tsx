import classNames from 'classnames';

import styles from './Select.module.css';

export interface SelectItem {
  value: string;
  label: string;
}

interface SelectProps {
  value?: string;
  items: SelectItem[];
  onChange: (value: string) => void;
  classes?: string;
}

const Select = ({ value, items, onChange, classes }: SelectProps) => (
  <select
    value={value ?? items[0].value}
    onChange={(e) => onChange(e.target.value)}
    className={classNames(styles.select, classes)}
  >
    {items.map((item) => (
      <option key={item.value} value={item.value}>
        {item.label}
      </option>
    ))}
  </select>
);

export default Select;

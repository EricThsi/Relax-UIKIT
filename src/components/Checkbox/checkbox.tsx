import React, { FC, ReactChild, InputHTMLAttributes, useState, ReactChildren } from 'react';
import classnames from 'classnames';

import './checkbox.scss';

interface IBaseCheckboxProps {
  className?: string;
  name?: string;
  checked?: boolean;
  value?: InputValue;
  disabled?: boolean;
  children?: ReactChild | ReactChildren;
  onChange?: (value: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type CheckboxProps = IBaseCheckboxProps & InputHTMLAttributes<HTMLInputElement>;

const Checkbox: FC<CheckboxProps> = (props: CheckboxProps) => {
  const {
    className,
    name,
    checked = false,
    value,
    disabled = false,
    children,
    onChange,
    ...restProps
  } = props;

  const [checkedState, setCheckedState] = useState(checked);

  const wrapperClasses = classnames('rx-checkbox', className);
  const checkboxClasses = classnames('rx-checkbox__input', {
    'is-checked': checkedState,
    'is-disabled': disabled,
  });

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedState(!checkedState);
    onChange && onChange(!checkedState, evt);
  };

  return (
    <label className={wrapperClasses}>
      <span className={checkboxClasses}>
        <input
          className="rx-checkbox__checkbox"
          type="checkbox"
          name={name}
          checked={checkedState}
          disabled={disabled}
          onChange={handleChange}
          data-testid="test-checkbox"
          value={value}
          {...restProps}
        />
        <span className="rx-checkbox__inner" />
      </span>
      <span className="rx-checkbox__label">{children}</span>
    </label>
  );
};

export default Checkbox;

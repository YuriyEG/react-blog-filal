/* eslint-disable */
import React, { useState } from 'react';
import { Button, Checkbox } from 'antd';

const Check = ({descript}) => {
  const [checked, setChecked] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const toggleChecked = () => {
    setChecked(!checked);
  };

  const toggleDisable = () => {
    setDisabled(!disabled);
  };

  const onChange = (e) => {
    console.log('checked = ', e.target.checked);
    setChecked(e.target.checked);
  };

  // const label = `${checked ? 'Checked' : 'Unchecked'}-${disabled ? 'Disabled' : 'Enabled'}`;
  const label = descript;

  return (
    <p style={{ marginBottom: '20px' }}>
      <Checkbox checked={checked} disabled={disabled} onChange={onChange} style={{ color: 'rgba(89, 89, 89, 1)'}}>
        {label}
      </Checkbox>
    </p>
  );
};

export default Check;

import React, { useState } from 'react';
import { Checkbox } from 'antd';

const Check = ({ descript }) => {
  const [checked, setChecked] = useState(true);
  const [disabled, setDisabled] = useState(false);

  /* eslint-disable */
  const toggleChecked = () => {
    setChecked(!checked);
  };

  const toggleDisable = () => {
    setDisabled(!disabled);
  };

  const onChange = (e) => {
    setChecked(e.target.checked);
  };

  /* eslint-enable */

  const label = descript;

  return (
    <p style={{ marginBottom: '20px' }}>
      <Checkbox checked={checked} disabled={disabled} onChange={onChange} style={{ color: 'rgba(89, 89, 89, 1)' }}>
        {label}
      </Checkbox>
    </p>
  );
};

export default Check;

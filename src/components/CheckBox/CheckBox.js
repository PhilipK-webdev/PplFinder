import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import * as S from "./style";

const CheckBox = ({ isChecked, onChange, label, value }) => {
  const handleChange = (e) => {
    onChange && onChange(e);
  };
  return (
    <S.CheckBox>
      <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            onChange={handleChange}
            color="primary"
            value={value}
          />}
        label={label}
        labelPlacement="top"
      />
    </S.CheckBox>
  );
};

export default CheckBox;

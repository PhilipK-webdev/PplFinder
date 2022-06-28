import React from "react";
import * as S from "./style";

const Text = ({ size = "14px", children, bold }) => {
  return (
    <S.Text size={size} bold={bold}>
      {children}
    </S.Text>
  );
};

export default Text;

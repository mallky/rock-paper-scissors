import React from 'react';
import styled from 'styled-components';

interface IButton {
  onClick: () => void;
  label: string;
}

const ButtonContainer = styled.button`
  border-radius: 4px;
  border: 1px black solid;
  background-color: white;
  font-size: 16px;
`;

export const Button: React.FunctionComponent<IButton> = ({ onClick, label }) => {
  return <ButtonContainer onClick={onClick}>{label}</ButtonContainer>;
};

import React from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button';

interface IPopup {
  onClose: () => void;
  winnerName: string;
}

const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupLayer = styled(FlexCenter)`
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const PopupContainer = styled(FlexCenter)`
  width: 50%;
  height: 50%;
  background: white;
  border: 1px solid black;
  font-size: 26px;
  flex-direction: column;
`;

export const Popup: React.FunctionComponent<IPopup> = ({ onClose, winnerName }) => {
  return (
    <PopupLayer onClick={onClose}>
      <PopupContainer>
        <span>And winner is {winnerName}!</span>
        <Button label={'Close'} onClick={onClose} />
      </PopupContainer>
    </PopupLayer>
  );
};

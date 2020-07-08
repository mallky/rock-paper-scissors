import React from 'react';
import { CurrentUserStore } from '../../services/currentUserStore/CurrentUserStore';
import { Title } from '../../RootApp';

interface IHeader {
  currentUserStore: CurrentUserStore;
}

export const Header: React.FunctionComponent<IHeader> = ({ currentUserStore }) => {
  return (
    <React.Fragment>
      <Title>Rock, Paper or Scissors</Title>
      <Title>WS STATUS: {currentUserStore.wsStatus}</Title>
      <Title>{`Hi, ${currentUserStore.name} - make choice and press Send button!`}</Title>
    </React.Fragment>
  );
};

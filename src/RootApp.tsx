import React, { FunctionComponent, useCallback } from 'react';
import styled from 'styled-components';
import { useStores } from './hooks/hooks';
import { useObserver } from 'mobx-react';
import { Button } from './components/Button/Button';
import { Popup } from './components/Popup/Popup';
import { Header } from './components/Header/Header';
import { AuthHeader } from './components/Header/AuthHeader';
import { UserChoice } from './components/Choice/UserChoice';
import { OpponentChoice } from './components/Choice/OpponentChoice';

export interface IApp {
  color: string;
}

export const Title = styled.h1`
  font-size: 1.5em;
  color: black;
  text-align: center;
`;

export const RootComponent = styled.div`
  color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const RootApp: FunctionComponent<IApp> = ({ color }) => {
  const { currentUserStore, iconService } = useStores();

  const onChangePopup = useCallback(
    (value: boolean) => currentUserStore.changeShowResult(value),
    [],
  );
  const onClosePopup = useCallback(() => onChangePopup(false), []);
  const onBlur = useCallback((e) => currentUserStore.setName(e.target.value), []);
  const onOnceAgain = useCallback(() => currentUserStore.onceAgain(), []);

  return useObserver(() => {
    if (!currentUserStore.name) {
      return <AuthHeader onBlur={onBlur} />;
    }

    return (
      <React.Fragment>
        <Header currentUserStore={currentUserStore} />

        <UserChoice currentUserStore={currentUserStore} color={color} iconService={iconService} />
        <OpponentChoice currentUserStore={currentUserStore} iconService={iconService} />

        {currentUserStore.showResult && (
          <Popup onClose={onClosePopup} winnerName={currentUserStore.winnerName} />
        )}

        {currentUserStore.showOpponentAnswer && (
          <Button label={'Once again'} onClick={onOnceAgain} />
        )}
      </React.Fragment>
    );
  });
};

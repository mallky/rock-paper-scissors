import React, { FunctionComponent, useCallback } from 'react';
import styled from 'styled-components';
import Choose from './components/Choose/Choose';
import { useStores } from './hooks/hooks';
import { useObserver } from 'mobx-react';
import { Button } from './components/Button/Button';
import { Popup } from './components/Popup/Popup';

export interface IApp {
  color: string;
}

const Title = styled.h1`
  font-size: 1.5em;
  color: black;
  text-align: center;
`;

const RootComponent = styled.div`
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
  const onSendChoice = useCallback(
    () => currentUserStore.sendUserChoice(currentUserStore.userChoice),
    [currentUserStore.userChoice],
  );
  const onBlur = useCallback((e) => currentUserStore.setName(e.target.value), []);

  return useObserver(() => {
    if (!currentUserStore.name) {
      return (
        <React.Fragment>
          <Title>Please enter your name</Title>
          <input type={'text'} onBlur={onBlur} />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Title>Rock, Paper or Scissors</Title>
        <Title>WS STATUS: {currentUserStore.wsStatus}</Title>
        <Title>{`Hi, ${currentUserStore.name} - make choice and press Send button!`}</Title>
        <RootComponent color={color}>
          {currentUserStore.userChoice && (
            <React.Fragment>
              <h2>Your choice: </h2>
              <Choose
                key={currentUserStore.userChoice}
                id={currentUserStore.userChoice}
                icon={iconService.getIconById(currentUserStore.userChoice)}
                store={currentUserStore}
              />
            </React.Fragment>
          )}
          {!currentUserStore.userChoice &&
            iconService.ICONS.map((icon: Record<string, any>) => {
              const key = Object.keys(icon)[0];
              return <Choose key={key} id={key} icon={icon[key]} store={currentUserStore} />;
            })}
        </RootComponent>

        <RootComponent color={'green'}>
          {currentUserStore.showOpponentAnswer && (
            <React.Fragment>
              <h2>{currentUserStore.opponentName}'s choice: </h2>
              <Choose
                key={currentUserStore.opponentChoice}
                id={currentUserStore.opponentChoice}
                icon={iconService.getIconById(currentUserStore.opponentChoice)}
                store={currentUserStore}
                disabled
              />
            </React.Fragment>
          )}
        </RootComponent>

        {!currentUserStore.isYourChoiceSent && (
          <Button label={'Send your choice'} onClick={onSendChoice} />
        )}

        {currentUserStore.showResult && (
          <Popup onClose={onClosePopup} winnerName={currentUserStore.winnerName} />
        )}
      </React.Fragment>
    );
  });
};

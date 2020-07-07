import React, { FunctionComponent, useCallback } from 'react';
import styled from 'styled-components';
import Choose from './components/Choose/Choose';
import { useStores } from './hooks/hooks';
import { useObserver } from 'mobx-react';
import { Button } from './components/Button/Button';
import { Simulate } from 'react-dom/test-utils';
import input = Simulate.input;

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
  const { currentUserStore, partnerStore, iconService } = useStores();
  const onStart = useCallback(() => currentUserStore.sendUserName(currentUserStore.getActiveId), [
    currentUserStore.getActiveId,
  ]);
  const onGet = useCallback(() => partnerStore.fetchData(currentUserStore.name), [
    currentUserStore.name,
  ]);
  const onBlur = useCallback((e) => currentUserStore.setName(e.target.value), []);

  return useObserver(() => {
    if (!currentUserStore.name) {
      return (
        <>
          <Title>Please enter your name</Title>
          <input type={'text'} onBlur={onBlur} />
        </>
      );
    }

    return (
      <React.Fragment>
        <Title>Rock, Paper or Scissors</Title>
        <Title>{`Hi, ${currentUserStore.name} - make choice and press Start button!`}</Title>
        <RootComponent color={color}>
          {currentUserStore.getActiveId && <h2>Your choice: </h2>}
          {currentUserStore.getActiveId && (
            <Choose
              key={currentUserStore.getActiveId}
              id={currentUserStore.getActiveId}
              icon={iconService.getIconById(currentUserStore.getActiveId)}
              store={currentUserStore}
            />
          )}
          {!currentUserStore.getActiveId &&
            iconService.ICONS.map((icon: Record<string, any>) => {
              const key = Object.keys(icon)[0];
              return <Choose key={key} id={key} icon={icon[key]} store={currentUserStore} />;
            })}
        </RootComponent>

        <RootComponent color={'green'}>
          {partnerStore.getActiveId && <h2>Your partner choice: </h2>}
          {
            <Choose
              key={partnerStore.getActiveId}
              id={partnerStore.getActiveId}
              icon={iconService.getIconById(partnerStore.getActiveId)}
              store={partnerStore}
            />
          }
        </RootComponent>

        <Button label={'Start'} onClick={onStart} />
        <Button label={'Get Opponent choice'} onClick={onGet} />
      </React.Fragment>
    );
  });
};

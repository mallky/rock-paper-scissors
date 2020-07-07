import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import Choose from './components/Choose/Choose';
import { scissors } from 'react-icons-kit/feather/scissors';
import { handPaperO } from 'react-icons-kit/fa/handPaperO';
import { handRockO } from 'react-icons-kit/fa/handRockO';

import { Context } from './index';

export interface IApp {
  color: string;
}

const ICONS: Record<string, any>[] = [{ handRockO }, { scissors }, { handPaperO }];

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
  const [activeId, changeActiveId] = useState<string>('');

  return (
    <Context.Provider value={{ activeId, changeActiveId }}>
      <Title>Rock, Paper or Scissors - choose your destiny!</Title>
      <RootComponent color={color}>
        {ICONS.map((icon: Record<string, any>) => {
          const key = Object.keys(icon)[0];
          return <Choose key={key} id={key} icon={icon[key]} />;
        })}
      </RootComponent>
    </Context.Provider>
  );
};

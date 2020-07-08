import React, { FunctionComponent } from 'react';
import Choose from '../Choose/Choose';
import { RootComponent } from '../../RootApp';
import { CurrentUserStore } from '../../services/currentUserStore/CurrentUserStore';
import { IconService } from '../../services/iconService/IconService';
import { useObserver } from 'mobx-react';

export interface IUserChoice {
  color: string;
  currentUserStore: CurrentUserStore;
  iconService: IconService;
}

export const UserChoice: FunctionComponent<IUserChoice> = ({
  color,
  currentUserStore,
  iconService,
}) => {
  return useObserver(() => (
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
  ));
};

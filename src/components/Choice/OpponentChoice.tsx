import React, { FunctionComponent } from 'react';
import Choose from '../Choose/Choose';
import { RootComponent } from '../../RootApp';
import { CurrentUserStore } from '../../services/currentUserStore/CurrentUserStore';
import { IconService } from '../../services/iconService/IconService';

export interface IOpponentChoice {
  currentUserStore: CurrentUserStore;
  iconService: IconService;
}

export const OpponentChoice: FunctionComponent<IOpponentChoice> = ({
  currentUserStore,
  iconService,
}) => {
  return (
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
  );
};

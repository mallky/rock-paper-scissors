import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RootApp } from './RootApp';
import { CurrentUserStore } from './services/currentUserStore/CurrentUserStore';
import { PartnerStore } from './services/partherStore/PartnerStore';
import { IconService } from './services/iconService/IconService';

interface IStoreContext {
  currentUserStore: CurrentUserStore;
  partnerStore: PartnerStore;
  iconService: IconService;
}

export const StoresContext = React.createContext<IStoreContext>({
  currentUserStore: new CurrentUserStore(''),
  partnerStore: new PartnerStore(),
  iconService: new IconService(),
});

ReactDOM.render(<RootApp color={'gold'} />, document.getElementById('root'));

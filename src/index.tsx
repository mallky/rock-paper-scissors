import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RootApp } from './RootApp';

interface IDefaultContext {
	activeId: string;
	changeActiveId?: (id: string) => void;
}
export const Context = React.createContext<IDefaultContext>({
  activeId: '',
});

ReactDOM.render(<RootApp color={'gold'} />, document.getElementById('root'));

import * as React from 'react';
import { StoresContext } from '../index';

export const useStores = () => {
  return React.useContext(StoresContext);
};

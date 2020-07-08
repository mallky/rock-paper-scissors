import React, { FunctionComponent } from 'react';
import { Title } from '../../RootApp';

export interface IAuthHeader {
  onBlur: (e: any) => void;
}

export const AuthHeader: FunctionComponent<IAuthHeader> = ({ onBlur }) => {
  return (
    <React.Fragment>
      <Title>Please enter your name</Title>
      <input type={'text'} onBlur={onBlur} />
    </React.Fragment>
  );
};

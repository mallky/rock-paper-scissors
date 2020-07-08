import React, { useCallback } from 'react';
import { Icon } from 'react-icons-kit';
import styled from 'styled-components';
import { CurrentUserStore } from '../../services/currentUserStore/CurrentUserStore';

interface IChoose {
  icon: any;
  id: string;
  store: CurrentUserStore;
  disabled?: boolean;
}

interface IWrapper {
  readonly isActive: boolean;
}

const Wrapper = styled.div<IWrapper>`
  border-radius: 4px;
  border: 1px black solid;
  width: 100px;
  height: 100px;
  font-size: 20px;
  justify-content: center;
  align-items: center;
  display: flex;
  background: ${(props) => (props.isActive ? 'black' : 'gray')};
  margin: 10px;

  &:hover {
    background: black;
  }
`;

const ICON_SIZE = 62;

const Choose: React.FunctionComponent<IChoose> = ({ icon, id, store, disabled }) => {
  const onClickHandler = useCallback(() => {
    if (disabled) {
      return;
    }
    store.changeUserChoice(id);
    store.sendUserChoice(id);
  }, [store, id, disabled]);

  if (!icon && !id && !store.userChoice) {
    return null;
  }

  return (
    <Wrapper isActive={disabled ? false : store.userChoice === id} onClick={onClickHandler}>
      <Icon icon={icon} size={ICON_SIZE} />
    </Wrapper>
  );
};

export default Choose;

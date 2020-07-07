import React, { useCallback } from 'react';
import { Icon } from 'react-icons-kit';
import styled from 'styled-components';
import { PartnerStore } from '../../services/partherStore/PartnerStore';
import { CurrentUserStore } from '../../services/currentUserStore/CurrentUserStore';

interface IChoose {
  icon: any;
  id: string;
  store: PartnerStore | CurrentUserStore;
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

const Choose: React.FunctionComponent<IChoose> = ({ icon, id, store }) => {
  const onClickHandler = useCallback(() => store.changeId(id), [store, id]);

  if (!icon && !id && !store.getActiveId) {
    return null;
  }

  return (
    <Wrapper isActive={store.getActiveId === id} onClick={onClickHandler}>
      <Icon icon={icon} size={62} />
    </Wrapper>
  );
};

export default Choose;

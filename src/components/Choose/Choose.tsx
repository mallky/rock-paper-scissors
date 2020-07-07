import React, { useCallback, useContext } from 'react';
import { Icon } from 'react-icons-kit';
import styled from 'styled-components';
import { Context } from '../../index';

interface IChoose {
  icon: string;
  id: string;
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

const Choose: React.FunctionComponent<IChoose> = ({ icon, id }) => {
  const { activeId, changeActiveId } = useContext(Context);
  const onClickHandler = useCallback(() => changeActiveId(id), [changeActiveId, id]);

  return (
    <Wrapper isActive={activeId === id} onClick={onClickHandler}>
      <Icon icon={icon} size={62} />
    </Wrapper>
  );
};

export default Choose;

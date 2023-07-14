import styled from 'styled-components';

export const UlStyle = styled.ul`
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(calc(50% - 2px), 1fr));
  grid-template-rows: 1fr auto;
  grid-column-gap: 2px;
  grid-row-gap: 2px;
`;
export const LiStyle = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

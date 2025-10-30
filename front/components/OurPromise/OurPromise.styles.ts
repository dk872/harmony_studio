import styled from 'styled-components';

export const PromiseContainer = styled.div`
  background-color: var(--main); padding: 40px 20px; margin: 40px auto; border-radius: 8px; 
  box-shadow: 0 4px 15px rgba(var(--grey-rgba), 0.1); text-align: center; max-width: 1200px;
`;

export const PromiseTitle = styled.h2`
  font-family: 'MonteCarlo', cursive; font-size: 36px; color: var(--accent); margin-bottom: 20px;
`;

export const PromiseList = styled.ul`
  list-style: none; padding: 0; margin: 0;
`;

export const PromiseItem = styled.li`
  font-family: 'Montserrat', sans-serif; font-weight: 300; font-size: 16px; color: var(--grey); margin-bottom: 15px; text-align: left;

  &:last-child {
    margin-bottom: 0;
  }
`;

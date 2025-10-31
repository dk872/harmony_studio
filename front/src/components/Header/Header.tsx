import React from 'react';
import { HeaderContainer, Logo, Nav, NavLink } from './Header.styles';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  isAuthenticated: boolean; // Authentication prop
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <Logo onClick={() => navigate('/')}>HarmonyStudio</Logo>
      <Nav>
        <NavLink onClick={() => navigate('/')}>Home</NavLink>
        {isAuthenticated ? (
          <NavLink onClick={() => navigate('/profile')}>My profile</NavLink>
        ) : (
          <Button
            width='120px'
            height='30'
            borderRadius='25'
            variant='filled'
            color='accent'
            fontSize='16'
            fontWeight='500'
            onClick={() => navigate('/login')}
          >
            Sign up
          </Button>
        )}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
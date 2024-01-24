import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import Logo from './Logo';

const UserHeader = ({ userInfo, logoutHandler }) => (
  <>
    <NavDropdown title={userInfo.name} id='username'>
      <LinkContainer to='/profile'>
        <NavDropdown.Item>Profile</NavDropdown.Item>
      </LinkContainer>
      <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
    </NavDropdown>
  </>
);

const AdminHeader = ({ userInfo, logoutHandler }) => (
  <>
  <LinkContainer to='/admin-dashboard'>
        <Nav.Link><FaSignInAlt />Admin Dashboard</Nav.Link>
      </LinkContainer>
  <LinkContainer to='/student'>
        <Nav.Link><FaSignInAlt /> Student</Nav.Link>
  </LinkContainer>
  <LinkContainer to='/admin-teacher'>
        <Nav.Link><FaSignInAlt /> Teacher</Nav.Link>
  </LinkContainer>
    <NavDropdown title={userInfo.name} id='username'>      
      <LinkContainer to='/profile'>
        <NavDropdown.Item>Profile</NavDropdown.Item>
      </LinkContainer>
      <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
    </NavDropdown>
  </>
);

const DefaultHeader = () => (
  <>
    <LinkContainer to='/login'>
      <Nav.Link>
        <FaSignInAlt /> Sign In
      </Nav.Link>
    </LinkContainer>
    <LinkContainer to='/about'>
      <Nav.Link>
        <FaSignOutAlt /> About
      </Nav.Link>
    </LinkContainer>
  </>
);

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <Logo /> LITTLE-FOX
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {userInfo ? (
                <>
                  {userInfo.role === 'student' && (
                    <UserHeader userInfo={userInfo} logoutHandler={logoutHandler} />
                  )}
                  {userInfo.role === 'admin' && (
                    <AdminHeader userInfo={userInfo} logoutHandler={logoutHandler} />
                  )}
                </>
              ) : (
                <DefaultHeader />
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
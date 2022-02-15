import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Modal from '../modal/modal'
import logo from "../../../Acecidade.png"
import './menu.css'
import { Box, Button, Image } from '@skynexui/components';
import Colors from '../../theme/Colors'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Nav, Container } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import { AuthContex } from "../../../providers/auth";
import { ModalContex } from "../../../providers/modal.js"



const tamanhoMinimoDeTela = 700

export default function Menu() {
  return (
    <NavBar />
  )
}


function NavBar() {
  const query = useMediaQuery(`(min-width:${tamanhoMinimoDeTela}px)`);


  return (
    <>
      <Box on
        styleSheet={{
          backgroundColor: {
            lg: 'white',
            md: 'white',
            sm: 'white',
            xl: 'white',
            xs: 'white'
          },
          'box-shadow': '0 0 5px rgba(237, 134, 0, 0.6)',
          borderBottom: ` rgba(237, 134, 0, 0.6) solid 1px`,
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
          color: Colors.Azul_Menu,
          height: '90px',
          padding: '16px 16px 16px 25px ',
        }}
        tag="header"
      >

        {query ? <Pc /> : <Mobilee /* setModalVisivel={setModalVisivel} ModalVisivel={ModalVisivel} */ />}
      </Box>
    </>
  )
}

function Pc() {
  const navigate = useNavigate()
  const { user } = React.useContext(AuthContex)
  const { modalIsAtive, setModalIsAtive } = React.useContext(ModalContex)

  return (
    <>
      <Image className="logo" src={logo} alt="logo com um homem segurando muletas e ao seu redor simbolos representando os pcds" onClick={() => {
        navigate('/')
      }} />
      <Box styleSheet={{
        color: Colors.Azul_Menu,
        display: 'flex',
        'justify-content': 'space-between',
      }}
        tag='div'
      >

        <Box styleSheet={{
          color: Colors.Azul_Menu,
          display: 'flex',
          'justify-content': 'space-between',
        }}
          tag="nav"
        >


          <ButtunLink nome='Home' href='/' />
          <ButtunLink nome='Contatos' href='/contatos' />
          <ButtunLink nome='Locais' href='/locais' />
          <ButtunLink nome='Acessibilidade' href='/acessibilidade' />
          <ButtunLink nome='Quem Somos' href='/quemSomos' />


        </Box>
      </Box>
      {user.isLoggedIn ? <Btn name={user.name} fotoPerfil={user.profilePic} /> : <Button
        label="Entre ou Cadastre-se"
        onClick={
          () => { setModalIsAtive(true) }
        }
        rounded="full"
        size="xl"
        styleSheet={{
          disabled: {},
          focus: {},
          hover: {
            'box-shadow': '0 0 5px rgba(237, 134, 0, 0.3),     0 0 15px rgba(237, 134, 0, 0.3),     0 0 25px rgba(237, 134, 0, 0.3),     0 0 45px rgba(237, 134, 0, 0.3),     0 0 25px rgba(237, 134, 0, 0.3) inset'
          }
        }}
        variant="secondary"
      />}

      {modalIsAtive ? <Modal onClose={() => setModalIsAtive(false)} /> : null}

    </>
  )
}



function ButtunLink({ href = '/', nome = "trocar" }) {

  const paginaAtual = useLocation()

  var styleHoverLink = 'style-link hover'
  if (paginaAtual.pathname === href) {
    styleHoverLink += ' btn-border-bottom'
  }
  return (<Link to={href}><span ><p className={styleHoverLink}>{nome}</p></span></Link>)
}


function Mobilee() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

function Btn({ name = "test", fotoPerfil = 'semimg' }) {
  return (
    <button className='btn-menu'><img className='img-login' src={fotoPerfil} alt='foto peril' />{name}</button>
  )
}
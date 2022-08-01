import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import LinkContainer from "react-router-bootstrap/LinkContainer";

export default function Header() {
  const [categoryies, setCategoryies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const result = await axios.get(
          "http://localhost:1337/api/categories"
        );
        setCategoryies(result.data.data);
        setLoading(false);
      }
      catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchData();
  }
    , []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <span className="text-danger font-weight-bold h3">
            KİTA<span className='text-white h5'>ki</span>P
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Kitaplar</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/addbook">
              <Nav.Link>Kitap Ekle</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Katagoriler" id="collasible-nav-dropdown">
              {categoryies.map((category, index) => (
                <div key={index}>
                  <LinkContainer key={category.id} to={`/category/${category.id}`}>
                    <NavDropdown.Item>{category.attributes.name}</NavDropdown.Item>
                  </LinkContainer>
                  {categoryies.length === index + 1 ? null : <NavDropdown.Divider />}
                </div>
              ))}
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="https://linktr.ee/muffafa" target="_blank">muffafa</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

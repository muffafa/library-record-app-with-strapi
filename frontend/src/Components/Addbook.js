import React from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState,useEffect } from "react";

export default function Addbook({book, category, handleChange, addBook }) {
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
    return <div></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Container className={"w-75 mt-5 border border-secondary"}>
        <Form style={{ padding: "20px" }}>
          <FloatingLabel
            controlId="floatingInput"
            label="Kitap Adı"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="Kitap Adı" onChange={handleChange} value={book.bookName} name="bookName" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Yazar"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="Yazar" onChange={handleChange} value={book.author} name="author" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Kaç Adet Var"
            className="mb-3"
          >
            <Form.Control type="number" placeholder="Kaç Adet Var" onChange={handleChange} value={book.quantity} name="quantity" />
          </FloatingLabel>
          <Form.Select className="mb-3" label="Kategori" placeholder="Kategori" onChange={handleChange} value={category.name} name="category">
            {
              categoryies.map((category, index) => (
                <option key={index} value={category.id}>{category.attributes.name}</option>
              ))
            }
          </Form.Select>
          <Form.Group controlId="formComments">
            <Form.Label>Yorum</Form.Label>
            <Form.Control as="textarea" rows="3" onChange={handleChange} value={book.comments} name="comments" />
          </Form.Group>
          <Button className={"mt-3 w-100"} variant="dark" type="submit" onClick={addBook}>
            Ekle
          </Button>
        </Form>
      </Container>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

export default function Category() {
  const { id } = useParams();
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:1337/api/categories/${id}?populate=*`);
        setResult(res.data.data.attributes.books.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchData();
    getCategoryName(id);
  }
    , [id]);

  const [categoryName, setCategoryName] = useState("");

  const getCategoryName = async (id) => {
    try {
      const res = await axios.get(`http://localhost:1337/api/categories/${id}`);
      setCategoryName(res.data.data.attributes.name);
    } catch (error) {
      setError(error);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      {
        (result.length !== 0) ?
          <Container className="justify-content-center mt-5 mb-5">
            <div className="row justify-content-start">
              {result.map((item) => (
                <div className="col-md-4" key={item.id}>
                  <Card key={item.id} className="mt-5">
                    <Card.Header>ID: {item.id}</Card.Header>
                    <Card.Body>
                      <Card.Title>Kitap Adı: {item.attributes.bookName}</Card.Title>
                      <Card.Text>Yazarı: {item.attributes.author}</Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item>Kategorisi: {categoryName}</ListGroup.Item>
                      <ListGroup.Item>Adedi: {item.attributes.quantity}</ListGroup.Item>
                    </ListGroup>
                    <Card.Footer className="text-muted">
                      {(item.attributes.comments) ? `Yorum: ${item.attributes.comments}` : "Yorum yok..."}
                    </Card.Footer>
                  </Card>
                </div>
              ))}
            </div>
          </Container>
          :
          <Container className="justify-content-center mt-5 mb-5">
            <Card className="border-danger">
              <Card.Body>
                <Card.Title className="text-center ">
                  <h1>Kategoriye ait kitap bulunamadı!</h1>
                </Card.Title>
              </Card.Body>
            </Card>
          </Container>
      }
    </div>
  )
}

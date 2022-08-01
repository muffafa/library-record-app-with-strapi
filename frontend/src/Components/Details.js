import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

export default function Details() {
    const { id } = useParams();
    const [result, setResult] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:1337/api/books/${id}/?populate=*`);
                setResult(res.data.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error</div>;
    }
    return (
        <div>
            <Container className="justify-content-center mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <Card>
                            <Card.Header>ID: {result.id}</Card.Header>
                            <Card.Body>
                                <Card.Title>Kitap Adı: {result.attributes.bookName}</Card.Title>
                                <Card.Text>Yazarı: {result.attributes.author}</Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>Kategorisi: {result.attributes.category.data.attributes.name}</ListGroup.Item>
                                <ListGroup.Item>Adedi: {result.attributes.quantity}</ListGroup.Item>
                            </ListGroup>
                            <Card.Footer className="text-muted">
                                {(result.attributes.comments) ? `Yorum: ${result.attributes.comments}` : "Yorum yok..."}
                            </Card.Footer>
                        </Card>
                    </div>
                </div>
            </Container>
        </div>
    );
}

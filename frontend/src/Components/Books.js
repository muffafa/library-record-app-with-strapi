import React, { useState } from "react";
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/esm/Button'
import LinkContainer from "react-router-bootstrap/LinkContainer";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

export default function Books({ books, deleteBook, lendBook, backBook }) {

    const [show, setShow] = useState(false);
    const [bookId, setBookId] = useState(0);
    const [msg, setMsg] = useState("");

    const handleClose = () => setShow(false);
    const handleShow =
        (bookId) => {
            setBookId(bookId);
            handleMsg(bookId);
            setShow(true);
        }

    const handleMsg = (bookId) => {
        const book = books.find(book => book.id === bookId);
        setMsg(
            `"${book.attributes.bookName}" isimli kitabı silmek istediğinize emin misiniz?`
            );
    }

    const closeModalAndDeleteBook = () => {
        deleteBook(bookId);
        handleClose();
    }

    if (books.length === 0) {
        return (
            <Container className="justify-content-center mt-5 mb-5">
                <Card className="border-danger">
                    <Card.Body>
                        <Card.Title className="text-center ">
                            <h1>Lütfen sisteme kitap ekleyiniz...</h1>
                        </Card.Title>
                    </Card.Body>
                </Card>
            </Container>
        )
    }

    return (
        <div>
            <Container className='mt-5'>
                <Table hover responsive variant="dark">
                    <thead>
                        <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>Kitap Adı</th>
                            <th scope='col'>Yazar</th>
                            <th scope='col'>Kaç Adet Var</th>
                            <th scope='col'>Kategori</th>
                            <th scope='col' colSpan={"4"}>İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <tr key={index}>
                                <td>{book.id}</td>
                                <td data-togle='tooltip' data-placement='top' title={book.attributes.comments}>{book.attributes.bookName}</td>
                                <td>{book.attributes.author}</td>
                                <td>{book.attributes.quantity}</td>
                                <td>{book.attributes.category.data.attributes.name}</td>
                                <td>
                                    <Button onClick={() => handleShow(book.id)}
                                        variant="danger">Sil</Button>
                                </td>
                                <td>
                                    <Button onClick={() => lendBook(book.id)}
                                        variant="warning" >Ödünç Ver</Button>
                                </td>
                                <td>
                                    <Button onClick={() => backBook(book.id)}
                                        variant="success" >İade Et</Button>
                                </td>
                                <td>
                                    <LinkContainer to={`/details/${book.id}`}>
                                        <Button variant="info">Detay</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Silme İşlemini Onayla</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{
                        msg}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button onClick={closeModalAndDeleteBook} variant="danger">
                            Sil
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    )
}

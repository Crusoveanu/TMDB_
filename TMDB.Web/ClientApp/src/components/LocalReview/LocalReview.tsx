import React, { useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { Form } from 'react-bootstrap';
import Swal from 'sweetalert2'

import './localReview.css'

const LocalReview = (props) => {
    const sessionUserId = sessionStorage.getItem("userId");
    const [showDiv, setShowDiv] = useState(false);
    const [inputReivew, setInputReview] = useState('');
    const handleShowDiv = () => {
        setShowDiv(true);
    }
    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
        };

        const response = await fetch('comment/CreateComment?commentJson=' +
            JSON.stringify(
                {
                    movieId: props.movieId, userComment: inputReivew
                })
            + '&userEmail=' + sessionUserId, requestOptions)

        const data = await response.json();

        if (data.message != "success") {
            Swal.fire({
                title: 'Nu s-a putut adauga comentariul',
                icon: 'error'
            });
        }
        else {
            Swal.fire({
                title: 'Comentariu adaugat',
                icon: 'success'
            });
        }
    }
    const handleCancel = () => {
        setShowDiv(false);
        setInputReview('');
    }
    const handleInputChange = (event) => {
        setInputReview(event.target.value);
    }

    return (
        <>
            {(sessionUserId && sessionUserId != "undefined") ? (
                <p onClick={handleShowDiv} className="writeReview__button">
                    <a className="writeReview__button_a">
                        <AiFillEdit></AiFillEdit>
                        Scrie un review local
                    </a>
                </p>
            ) : (
                <div>
                    <h3>* Nu puteți să adăugați review-uri.</h3>
                        <p style={{color: 'red'}}>Pentru aceasta, vă rugăm să vă logați sau înregistrați dacă nu aveți un cont.</p>
                </div>
            )}
            {showDiv && (
                <Form onSubmit={handleOnSubmit}>
                    <textarea style={{ resize: 'none' }}
                        onChange={handleInputChange}
                        rows={8}
                        cols={80}
                        name="review"
                        placeholder="scrie un review..." />
                    <div>
                        <input className="btn btn-primary" type="submit" value="Postează" />
                        <input className="btn btn-primary" onClick={handleCancel} type="submit" value="Anulare" />
                    </div>
                </Form>
            )}
        </>
    )
}
export default LocalReview

import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

function LoadingComponent() {
    return (
        <div className='col-md-12 pt-3 pb-3'>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <span className='ms-2'> Cargando ... </span>
        </div>
    );
}

export default LoadingComponent;
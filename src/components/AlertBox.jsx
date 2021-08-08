import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';

const AlertBox = ({ alertType }) => (
    <>
        {
            alertType === 'success'
                ? (
                    <Alert variant='success' className='mx-auto mt-2'>
                        Message sent!
                    </Alert>
                )
                :
                (
                    <Alert variant='warning' className='mx-auto mt-2'>
                        Only registered users can send messages. <Link to={{
                            pathname: `/login`
                        }}>Please sign up or log in.</Link>
                    </Alert>
                )
        }
    </>
);

AlertBox.propTypes = {
    alertType: string.isRequired,
}

export default AlertBox;
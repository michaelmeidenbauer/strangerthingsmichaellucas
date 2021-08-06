import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';

const Loading = ({ contentType }) => {
    const loadingStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        width: '100vw',
        height: '100vh',
        margin: 'auto'
    };
    if (contentType) {
        return (
            <div style={loadingStyle}>
                <h1>Loading {contentType}...</h1><Spinner animation="border" role="status" />
            </div>
        )
    }
    return (
        <div style={loadingStyle}>
            <h1>Loading...</h1><Spinner animation="border" role="status" />
        </div>
    )
};


Loading.propTypes = {
    contentType: PropTypes.string,
};

Loading.defaultProps = {
    contentType: null
}

export default Loading;
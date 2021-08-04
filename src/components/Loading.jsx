import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({ contentType }) => {
    if (contentType) {
        return (
            <h1>Loading {contentType}...</h1>
        )
    }
    return (
        <h1>Loading...</h1>
    )
};


Loading.propTypes = {
    contentType: PropTypes.string,
};

Loading.defaultProps = {
    contentType: null
}

export default Loading;
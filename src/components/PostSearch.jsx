import React, { useState } from 'react';
import { string, func, shape, arrayOf } from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

const PostSearch = ({ allPosts, updateDisplayPosts }) => {
    const [searchTerm, updateSearchTerm] = useState('');

    const searchHandler = (event) => {
      event.preventDefault();

      const results = allPosts.filter((post) => {
        const doesTitleMatch = post.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const doesDescriptionMatch = post.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        return doesTitleMatch || doesDescriptionMatch;
      });

      if (searchTerm) updateDisplayPosts(results);
      else updateDisplayPosts(allPosts);
    };

    return (
        <Form onSubmit={searchHandler} className="mt-1 mb-2">
            <Row className="w-50 mx-auto">
                    <Form.Control className="mt-1 mb-2" type="text" value={searchTerm} placeHolder="Search posts" onChange={event => updateSearchTerm(event.target.value)} />
            </Row>
            <Row className="w-25 mx-auto">
                <Button type="submit" className="btn-primary mb-1">Search</Button>
                <Button type="button" className="btn-secondary" onClick={() => {
                        updateDisplayPosts(allPosts);
                        updateSearchTerm('');
                    }}>Clear search</Button>
            </Row>
        </Form>

    )
};

PostSearch.propTypes = {
    allPosts: arrayOf(shape({
        title: string.isRequired,
        description: string.isRequired,
    })).isRequired,
    updateDisplayPosts: func.isRequired,
}

export default PostSearch;
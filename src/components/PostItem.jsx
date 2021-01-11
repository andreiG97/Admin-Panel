import React from 'react';

function PostItem(props) {
    const { title } = props;
    return(
        <div>
            <h2>{title}</h2>

        </div>
    );
}

export default PostItem;
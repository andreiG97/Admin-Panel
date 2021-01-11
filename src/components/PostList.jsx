import React from 'react';
import PostItem from './PostItem';

class PostList extends React.Component {
    
    render(){
    const posts = this.props.posts

        return(
            <div>
                {
                    posts.map((post, index) => {
                        return(
                            <PostItem
                            title={post.title}
                            key={index}
                            />
                        );
                    })
                }
            </div>
        );
    }

}

export default PostList;
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, Route, withRouter, Switch } from 'react-router-dom'
import PropTypes from 'prop-types';

import '../App.css';
import Posts from './post/Posts'
import PostInfo from './post/PostInfo'
import PostNew from './post/PostNew'
import PostEdit from './post/PostEdit'
import CommentNew from './comment/CommentNew'
import CommentEdit from './comment/CommentEdit'
import { fetchCategories, sortPost } from '../actions/index'

class App extends Component {
    static propTypes = {
        categories: PropTypes.array,
        posts: PropTypes.array,
    }

    componentDidMount() {
        this.props.fetchCategories()
    }

    render() {
        const { sortPost, categories } = this.props
    return (
        <div className="App">
            <div className="App-header-1">
                <h2>READABLE PROJECT</h2>
            </div>

            <div className="menu">
                <div className="linksBar">
                    <Link className="home" to="/">
                        <button>Home</button>
                    </Link>
                    <Link className="new-post" to="/new">
                        <button>New Post</button>
                    </Link>
                </div>
                <div className="categoryBar">
                    Select Category:
                    {categories && categories.map(category => (
                        <Link key={category.name} to={`/${category.path}`}>
                            <button>{category.name}</button>
                        </Link>
                    ))}
                </div>

                <div className="sortBar">
                    Sort:
                    <button onClick={() => sortPost("voteScore")}>
                        Vote Score
                    </button>
                    <button onClick={() => sortPost("timestamp")}>
                        Time Stamp
                    </button>
                </div>
            </div>

            <Switch>
                <Route exact path="/" component={Posts} />
                <Route exact path="/new" component={PostNew} />
                <Route exact path="/:category" component={Posts} />
                <Route exact path="/:category/:postId" component={PostInfo} />
                <Route path="/:category/:postId/edit" component={PostEdit} />
                <Route path="/:category/:postId/comment" component={CommentNew} />
                <Route path="/:category/:postId/:commentId/edit" component={CommentEdit} />
            </Switch>

        </div>
    );
  }
}

function mapStateToProps({ categories }) {
    return {
        categories: categories
    }
}

export default withRouter(connect(mapStateToProps, {
    fetchCategories,
    sortPost
})(App))
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../redux/features/postsSlice'

const App = ({fetchPosts, isLoading, posts}) => {
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts])
  return (
    <div>{posts && JSON.stringify(posts)}</div>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchPosts: (query) => dispatch(fetchPosts(query))
})

const mapStateToProps = state => ({
  isLoading: state.posts.isLoading,
  posts: state.posts.posts
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
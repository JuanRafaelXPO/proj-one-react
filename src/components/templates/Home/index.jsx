import { Component } from 'react';

import './styles.css';

import { loadPosts } from '../../../utils/load-posts';
import { Posts } from '../../Post';
import { Button } from '../../Button';
import { TextInput } from '../../TextInput';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 5,
    searchValue: '',
  }

  async componentDidMount() {
    this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePost = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ?
      posts.filter(post => {
        return post.title.toLowerCase().includes(
          searchValue.toLocaleLowerCase()
        );
      })
      : posts

    return (
      <section className='container'>
        <div className='search-container'>
          {
            !!searchValue && (
              <>
                <h1>Search Value: {searchValue}</h1>
              </>
            )
          }

          <TextInput searchValue={searchValue} handleChange={this.handleChange} />
        </div>

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <p>Não existe posts com essa sua busca =(</p>
        )}

        <div className='button-container'>
          {!searchValue && (
            <Button
              text='Carregar mais posts'
              actionFn={this.loadMorePosts}
              disabled={noMorePost}
            />
          )}
        </div>
      </section>
    );
  }
}

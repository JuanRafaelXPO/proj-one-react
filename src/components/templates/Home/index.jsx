import { useCallback, useEffect, useState } from 'react';

import './styles.css';

import { loadPosts } from '../../../utils/load-posts';
import { Posts } from '../../Post';
import { Button } from '../../Button';
import { TextInput } from '../../TextInput';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const noMorePost = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue ?
    posts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      );
    })
    : posts;

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, [])

  useEffect(() => {
    console.log(new Date().toLocaleDateString('pt-br'));
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  }

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

        <TextInput searchValue={searchValue} handleChange={handleChange} />
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
            actionFn={loadMorePosts}
            disabled={noMorePost}
          />
        )}
      </div>
    </section>
  )
}

// export class Home3 extends Component {
//   state = {
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postsPerPage: 5,
//     searchValue: '',
//   }

//   async componentDidMount() {
//     
//   }

//   render() {
//     const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
//     const noMorePost = page + postsPerPage >= allPosts.length;

//     const filteredPosts = !!searchValue ?
//       posts.filter(post => {
//         return post.title.toLowerCase().includes(
//           searchValue.toLocaleLowerCase()
//         );
//       })
//       : posts

//     return (
//       
//     );
//   }
// }

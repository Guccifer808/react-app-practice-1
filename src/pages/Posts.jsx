import React, {useEffect, useRef, useState} from 'react';
import PostService from "../API/PostService";
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/pages";
import Button from "../components/UI/button/Button";
import PostForm from "../components/PostForm";
import MyModal from "../components/UI/MyModal/MyModal";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Loader from "../components/UI/Loader/Loader";
import Pagination from "../components/UI/pagination/Pagination";
//import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";
import { useObserver } from './../hooks/useObserver';


//       Axios
// Получаем объект с сервера, где 100 постов и передаём данные объекта в setPosts
//useState / изменение состояния это async процесс, важно отлавливать и управлять этим

function Posts() {
  //Posts
  const [posts, setPosts] = useState([]);
  // Filter posts
  const [filter, setFilter] = useState({ sort: "", query: "" });
  //MyModal
  const [modal, setModal] = useState(false);
  //Sort posts
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  // useState with all posts
  const [totalPages, setTotalPages] = useState(0);
  //States for limit and page number
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  //Добавляем пагинацию через отрисовку массива. Ушел в Pagination.jsx
  //Inf posts loading 
  const lastElement = useRef();

  // Loader before loading the posts list + hooks for it
  const [fetchPosts, isPostsLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers["x-total-count"];
      setTotalPages(getPageCount(totalCount, limit));
    })

  // useEffect(callback, [deps])
  // Если пустой масив зависимостей - useEffect отработает 1 раз
  //По открытию страницы сразу подгружаем посты

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage( page + 1);
  })

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  //Create Post
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  //Функция обатного вызова для удаления постов
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  // Pagination
  const changePage = (page) => {
    setPage(page);
  };

  return (
    <div className="App">
      {/*<Button onClick={fetchPosts}> GET AXIOS</Button>*/}
      <Button style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Create Post
      </Button>         
      <br style={{ margin: '15' }} />
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <PostFilter filter={filter} setFilter={setFilter} />
      <MySelect
      value={limit}
      onChange={setLimit}
      options={value => setLimit(value)} 
      defaultValue="Amount of elements on the page"
      // eslint-disable-next-line react/jsx-no-duplicate-props
      options={[
        {value: 5, name: '5'},
        {value: 10, name: '10'},
        {value: 25, name: '25'},
        {value: -1, name: 'All Posts'},
      ]}
      />
      {/* Условная отрисовка */}
      {postError && <h1>Error ${postError}</h1>}
      <PostList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title="JS List"
        />
        <div ref={lastElement} style={{height: '20px', background: 'red'}}/>
      {isPostsLoading && 
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Loader />
        </div>
}
      
        <Pagination
          page={page}
          changePage={changePage}
          totalPages={totalPages}
      />
    </div>
  );
}

export default Posts;

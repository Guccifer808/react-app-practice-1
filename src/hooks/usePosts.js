import { useMemo } from "react";

export const useSortedPosts = (posts, sort) => {

//useMemo hook. Запоминает и кэширует пока не изменятся deps, зависимости/массив зависимостей
// useMemo(function, deps)
  const sortedPosts = useMemo(() => {
    if (sort) {
      return [...posts].sort((a, b) =>
        a[sort].localeCompare(b[sort])
      );
    }
    return posts;
  }, [sort, posts]);

  return sortedPosts;
};


export const usePosts = (posts, sort, query) => {
    const sortedPosts = useSortedPosts(posts, sort);

  //Sort & search by Query
    const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
);
}, [query, sortedPosts]);

return sortedAndSearchedPosts;
};

export default usePosts;
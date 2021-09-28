import axios from 'axios';
import {
  setIsFetchingActionCreator,
  setIsFetchingErrorCreator,
  setReposActionCreator,
} from '../reducers/repos-reducer';

export const getRepos = (searchQuery, currentPage, perPage) => {
  if (searchQuery === '') {
    searchQuery = 'stars:%3E1';
  }
  return async (dispatch) => {
    try {
      dispatch(setIsFetchingActionCreator(true));
      const response = await axios.get(
        `https://api.github.com/ssearch/repositories?q=${searchQuery}
       &sort=stars&per_page=${perPage}&page=${currentPage}`
      );
      dispatch(setReposActionCreator(response.data));
    } catch (e) {
      dispatch(setIsFetchingErrorCreator(true));
      dispatch(setIsFetchingActionCreator(false));
      setTimeout(() => {
        dispatch(setIsFetchingErrorCreator(false));
      }, 2000);
    }
  };
};

export const getCurrentRepo = async (username, repoName, setRepo) => {
  const response = await axios.get(
    `https://api.github.com/repos/${username}/${repoName}`
  );
  setRepo(response.data);
};

export const getCotributors = async (username, repoName, setContributors) => {
  const response = await axios.get(
    `https://api.github.com/repos/${username}/${repoName}/contributors?page=1&per_page=10`
  );
  setContributors(response.data);
};

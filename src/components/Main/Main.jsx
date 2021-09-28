import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRepos } from "../../actions/repos";
import { setCurrentPageActionCreator } from "../../reducers/repos-reducer";
import { createPages } from "../../utils/pagesCreator";
import './Main.less'
import Repo from "./Repo/Repo";


const Main = (props) => {
   const dispatch = useDispatch()
   const repos = useSelector(state => state.repos.items)
   const isFetching = useSelector(state => state.repos.isFetching)
   const currentPage = useSelector(state => state.repos.currentPage)
   const perPage = useSelector(state => state.repos.perPage)
   const isFetchingError = useSelector(state => state.repos.isFetchingError)
   const totalCount = useSelector(state => state.repos.totalCount)

   const [searchValue, setSearchValue] = useState('')
   const pageCount = Math.ceil(totalCount / perPage)
   const pages = []
   createPages(pages, pageCount, currentPage)


   useEffect(() => {
      dispatch(getRepos(searchValue, currentPage, perPage))
   }, [currentPage])

   function searchHandler() {
      dispatch(setCurrentPageActionCreator(1))
      dispatch(getRepos(searchValue, currentPage, perPage))
   }
   return (

      <div >
         {isFetchingError &&
            <div class="alert alert-danger" role="alert">
               Ошибка! Повторите попытку.
            </div>
         }
         <div className='search'>
            <input value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }}
               type="text" placeholder="Input repo name" className="search-input" />
            <button onClick={() => searchHandler()} className="search-btn">Search</button>
         </div>
         {
            isFetching === false
               ? repos.map((repo, index) => <Repo key={index} repo={repo} />)
               : <div className='fetching'></div>}

         <div className="pages">
            {pages.map((page, index) =>
               <span key={index} className={currentPage == page
                  ? 'current-page'
                  : 'page'} onClick={() => { dispatch(setCurrentPageActionCreator(page)) }}>{page}</span>
            )}
         </div>
      </div>
   )
}

export default Main
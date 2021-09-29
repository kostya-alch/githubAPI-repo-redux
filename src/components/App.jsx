import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './App.less'
import Card from "./Card/Card";
import Error from "./Main/Error";
import Main from "./Main/Main";


const App = (props) => {
   const dispatch = useDispatch()


   return (
      <div>
         <BrowserRouter ter>
            <div className="container">
               <Switch>
                  <Route exact path='/' component={Main} />
                  <Route path="/card/:username/:reponame" component={Card} />
                  <Route path="/error" component={Error} />
                  <Redirect to='/' />
               </Switch>
            </div>
         </BrowserRouter>
      </div>
   )
}

export default App
import React from "react"
import {BrowserRouter as Router, Route} from "react-router-dom";


import Join  from "./components/Join/Join"
import Chat from "./components/Chat/Chat"

//line 8: new user will be greeted on the join page (our home page)
//line 9: if the user is logged in he will  be redirected to the Chat page
const App=()=>{
    return(<Router>
        <Route path="/" exact component={Join}></Route>   
        <Route path="/chat" component={Chat}></Route>

    </Router>)
}
export default App;
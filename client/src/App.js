import { Route } from 'react-router-dom';
import './App.css';
import { BrowserRouter, Router, Switch} from 'react-router-dom';
import Landing from './components/LANDING/Landing';
import Home from './components/HOME/Home';
import Detail from './components/DETAIL/Detail';
import Form from './components/FORM/Form';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing}/> 
          <Route exact path="/home" component={Home}/>
          <Route exact path="/dogs/:id" component={Detail}/> 
          <Route exact path="/form" component={Form}/>
          <Route exact path="/form/:id" component={Form}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

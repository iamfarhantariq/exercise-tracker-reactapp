import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import NavBar from './components/NavBar';
import ExercisesList from './components/ExercisesList';
import EditExercise from './components/EditExercise'
import CreateExercise from './components/CreateExercise';
import CreateUser from './components/CreateUser';


function App() {
  return (
    <Router>
      <div className='container'>
        <NavBar />
        <br />
        <Route path='/' exact component={ExercisesList} />
        <Route path='/edit/:id' component={EditExercise} />
        <Route path='/create' component={CreateExercise} />
        <Route path='/user' exact component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;

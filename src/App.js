import logo from './logo.svg';
import './App.css';
import Home from './Home';
import React, { Component } from "react";
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import CompanyList from './CompanyList';
import CompanyEdit from './CompanyEdit';

function App() {
  return (
    <div className="App">
      
      <Router>
      <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/companies' exact={true} component={CompanyList}></Route>
          <Route path='/companies/:id' exact={true} component={CompanyEdit}></Route>

      </Switch>
      </Router>
    </div>
  );
}

 export default App;

// import React, { Component } from 'react';
// import './App.css';
// import Home from './Home';
// import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
// import CompanyList from './CompanyList';
// import EditComponent from './CompanyEdit';

// class App extends Component {
//   render() {
//     return (
//       <Router>
//         <Routes>
//           <Route path='/' exact={true} element={Home}/>
//           {/* <Route path='/companies' exact={true} element={CompanyList}/>
//           <Route path='/companies/:id' element={EditComponent}/> */}
//         </Routes>
//       </Router>
//     )
//   }
// }

// export default App;
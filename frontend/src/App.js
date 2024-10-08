import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './static/css/style.css'
import Header from './components/header.jsx'
import NavBar from './components/navBar.jsx';
import Main from './main/main.jsx';


const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={
          <>
            <Header />
            <NavBar />
            <Main />
          </>
        }/>

      </Routes>
    </Router>
  );
}

export default App;

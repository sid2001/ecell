import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import './App.css'
import Main from './components/Main'
import Home from './components/Home';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/scanPlant' element = {<Main />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

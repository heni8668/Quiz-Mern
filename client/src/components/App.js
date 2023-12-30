import '../styles/App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Main from './Main';
import Quiz from './Quiz';
import Result from './Result';
import { CheckUserExist } from '../helper/helper';


function App() {
  return (
    <BrowserRouter>
       <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/quiz' element={<CheckUserExist><Quiz /></CheckUserExist>} />
          <Route path='/result' element={<CheckUserExist><Result /></CheckUserExist>} />
       </Routes>
    </BrowserRouter>
  );
}

export default App;

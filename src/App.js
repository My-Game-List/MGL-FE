import './App.css';
import Home from './pages/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import OneGame from './pages/OneGame';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchGame from './pages/SearchGame';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import Yourlist from './pages/Yourlist';
import Signup from './pages/Signup';
import EditProfile from './pages/EditProfile';
import Profile from './pages/Profile';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
            integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
            crossOrigin="anonymous"
          />
          <Routes>
            <Route path='/login' exact element={<LoginForm />} />
            <Route path="/" element={<Home />} />
            <Route path='/search/:name' element={<SearchGame />} />
            <Route path="/OneGame/:id" element={<OneGame />} />
            <Route path='/yourList/:userid' element={<Yourlist />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/EditProfile/:userid' element={<EditProfile />} />
            <Route path='/profile/:userid' element={<Profile />} />
          </Routes>

          <script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin="anonymous"></script>
          <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js" crossOrigin="anonymous"></script>
          <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossOrigin="anonymous"></script>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default (App);

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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/login' exact element={<LoginForm />} />
            <Route path='/search/:name' element={<SearchGame />} />
            <Route path="/OneGame/:id" element={<OneGame />} />
            <Route path='/yourList/:userid' element={<Yourlist />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/EditProfile/:userid' element={<EditProfile />} />
            <Route path='/profile/:userid' element={<Profile />} />
          
            {/* no routes */}
            <Route path="*" element={<div>404 No Page Found</div>} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default (App);

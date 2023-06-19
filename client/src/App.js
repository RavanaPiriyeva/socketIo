import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import Home from './pages/Home';
import { getUsers } from './store/userSlice';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { routes } from './routes/routes';

function App() {
  const { user, loading } = useSelector(state => state.userReducer);

  let dispatch = useDispatch()

  useEffect(() => {

    dispatch(getUsers())

  }, [user])
  return (
    <>
     <Routes>
        {routes &&
          routes.map((item) => {
            return <Route path={item.path} element={item.element} />;
          })}
      </Routes>
    </>

  );
}

export default App;

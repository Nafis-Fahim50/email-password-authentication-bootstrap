import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Main from './components/Main';
import RegisterReactBootstarp from './components/RegisterReactBootstarp';

function App() {
const router = createBrowserRouter([
  {
    path: '/', element: <Main></Main>,
    children:[
      {
        path: '/', element:<RegisterReactBootstarp></RegisterReactBootstarp>
      },
      {
        path: '/signup', element:<RegisterReactBootstarp></RegisterReactBootstarp>
      },
      {
        path: '/login', element: <Login></Login>
      },
    ]
  }
])
  
  return (
    <div className="">
      
      <RouterProvider
      router={router}></RouterProvider>
      
    </div>
  );
}

export default App;

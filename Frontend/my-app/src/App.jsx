import Todo from './components/Homework/Todo.jsx'
import FetchApiProduct from './components/FetchApiProduct.jsx'
import { BrowserRouter, createBrowserRouter, Routes, Route } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import MasterLayout from './components/Layouts/MasterLayout.jsx';
import NotFound from './pages/NotFound.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import ListUser from './pages/users/ListUser.jsx';
import UserDetail from './pages/users/UserDetail.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import Counter from './pages/Counter.jsx';
import AboutDetail from './pages/AboutDetail.jsx'
// const router = createBrowserRouter([
//   {
//     path: "/",
//     Component: FetchApiProduct,
//   },
//   {
//     path: "/todo",
//     Component: Todo,
//   },
// ]);

function App() {
  return (
    <div className='app-container'>
        {/* <RouterProvider router={router} /> */}
        <BrowserRouter>
          <Routes>

            <Route element={<MasterLayout />}>
              <Route path="/" element={<Home />}></Route>
              <Route path="/about" element={<About />}>
                <Route path='/detail' element={<AboutDetail />}></Route>
              </Route>
              <Route path="/products/:productId" element={<ProductDetail />}></Route>
              <Route path="/users" element={<ListUser />}></Route>
              <Route path="/users/:id" element={<UserDetail />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/counter" element={<Counter />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Route>

          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App

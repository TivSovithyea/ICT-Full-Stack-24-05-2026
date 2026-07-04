import Todo from './components/Homework/Todo.jsx'
import FetchApiProduct from './components/FetchApiProduct.jsx'
import { BrowserRouter, createBrowserRouter, Routes, Route } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import MasterLayout from './components/Layouts/MasterLayout.jsx';
import NotFound from './pages/NotFound.jsx';
import ProductDetail from './pages/ProductDetail.jsx';

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
    <div>
        {/* <RouterProvider router={router} /> */}
        <BrowserRouter>
          <Routes>

            <Route element={<MasterLayout />}>
              <Route path="/" element={<Home />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/products/:productId" element={<ProductDetail />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Route>

          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App

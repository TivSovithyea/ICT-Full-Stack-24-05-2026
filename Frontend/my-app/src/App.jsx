import Todo from './components/Homework/Todo.jsx'
import FetchApiProduct from './components/FetchApiProduct.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

const router = createBrowserRouter([
  {
    path: "/",
    Component: FetchApiProduct,
  },
  {
    path: "/todo",
    Component: Todo,
  },
]);

function App() {
  return (
    <div>
        <RouterProvider router={router} />
    </div>
  )
}

export default App

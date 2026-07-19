import React from 'react'
import Button from './components/ui/Button'
import Card from './components/ui/Card'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MasterLayout from './components/layout/MasterLayout';
import Products from './pages/Products';
import Profile from './pages/Profile';
import Home from './pages/Home';

function App() {
  return (
    <div>

      {/* Common Utility Classes */}
      {/* <div className="p-4 bg-gray-100 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Logo</h1>
        <button className="bg-blue-500 text-white px-3 py-1 rounded">Login</button>
      </div> */}

      {/* Flex Box */}

      {/* <div className="flex justify-between items-end bg-gray-200 p-4 gap-3">
        <div className="bg-red-300 p-4">Box 1</div>
        <div className="bg-blue-300 p-4">Box 2</div>
        <div className="bg-green-300 p-4">Box 3</div>
      </div> */}

      {/* Flex Box Vertical*/}

      {/* <div className="flex flex-col items-center bg-gray-200 p-4 gap-3">
        <div className="bg-red-300 p-4">Box 1</div>
        <div className="bg-blue-300 p-4">Box 2</div>
        <div className="bg-green-300 p-4">Box 3</div>
      </div> */}

      {/* Grid System */}

      {/* <div className="grid grid-cols-4 gap-4 p-4">
        <div className="bg-yellow-300 p-4 col-span-2">Item 1</div>
        <div className="bg-pink-300 p-4">Item 2</div>
        <div className="bg-purple-300 p-4">Item 3</div>
      </div> */}

      {/* Grid Responsive */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        <div className="bg-yellow-300 p-4">Item 1</div>
        <div className="bg-pink-300 p-4">Item 2</div>
        <div className="bg-purple-300 p-4">Item 3</div>
      </div> */}

      {/* Reusable Component */}

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        <Button onClick={() => alert('Btn Clicked')} children={'Click Me'}></Button>

        <Card title={"Iphone 15 Pro"} description="Testing" ></Card>
      </div> */}

      <BrowserRouter>
        <Routes>
          <Route element={<MasterLayout></MasterLayout>}>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path={"/products"} element={<Products></Products>}></Route>
            <Route path={"/profile"} element={<Profile></Profile>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
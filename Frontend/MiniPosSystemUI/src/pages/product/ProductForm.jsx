import api from '@/services/api';
import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/toast"
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from '@/components/ui/spinner';
import { TiArrowBackOutline } from "react-icons/ti";
import { MdOutlineSaveAlt } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ProductForm = () => {
  const [Loading,setLoading] = useState(false);
  const {id} = useParams();
  const navigate = useNavigate();
  const isEditeMode = Boolean(id);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  
  const [categoryData, setCategoryData] = useState([]);
  const [brandData, setBrandData] = useState([]);

  const [form,setForm] = useState({
    name: "",
    category_id: "",
    brand_id: "",
    price: "",
    stock: "",
    description: "",
  });

  function handleImageChange(event) {
    const file = event.target.files?.[0] ?? null;
    setImageFile(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : '');
  }

  const getDependencies = async () => {
    try {
      const [catRes, brandRes] = await Promise.all([
        api.get('categories?per_page=99999999'),
        api.get('brands?per_page=99999999') 
      ]);

      setCategoryData(catRes.data?.data?.data || catRes.data?.data || []);
      setBrandData(brandRes.data?.data?.data || brandRes.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async() =>{
    try{
      setLoading(true);
      const res = await api.get(`products/${id}`)
      const result = res.data?.data ?? res.data;
      setForm({
        name: result.name || '',
        category_id: result.category_id || '',
        brand_id: result.brand_id || '',
        price: result.price !== undefined && result.price !== null ? result.price : '',
        stock: result.stock !== undefined && result.stock !== null ? result.stock : '',
        description: result.description || '',
      });
    }
    catch(error){
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    getDependencies();
    if(isEditeMode){
      getData();
    }
  },[id,isEditeMode])

  const handleReset = () =>{
    setForm({
      name: "",
      category_id: "",
      brand_id: "",
      price: "",
      stock: "",
      description: "",
    });
  }

  const handleInput = (e) =>{
    const {name, value} = e.target;
    setForm((pre) => ({...pre,[name]:value}));
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      setLoading(true);
      
      // const payload = {
      //   name: form.name,
      //   description: form.description,
      //   category_id: form.category_id ? Number(form.category_id) : null,
      //   brand_id: form.brand_id ? Number(form.brand_id) : null,
      //   price: form.price === "" ? 0 : parseFloat(form.price),
      //   stock: form.stock === "" ? 0 : parseInt(form.stock, 10),
      // };

      const formData = new FormData();
      formData.append('name', form.name.trim());
      formData.append('description', form.description.trim());
      formData.append('category_id', form.category_id);
      formData.append('brand_id', form.brand_id);
      formData.append('price', form.price);
      formData.append('stock', form.stock);

      if (imageFile) {
        formData.append('image', imageFile);
      }

      let res;
      if(isEditeMode){
        res = await api.put(`products/${id}`, formData);
      }
      else{
        res = await api.post('products', formData);
      }

      if (toast && toast.add) {
        const ids = toast.add({
          description: res.data?.message || "Saved successfully" ,
          actionProps: {
            children: "Undo",
            onClick() {
              toast.close(ids)
            },
          },
        });
      }

      handleReset();
      navigate('/products')
    }
    catch(error){
      console.log(error);
      if (toast && toast.add) {
        toast.add({
          description: error.response?.data?.message || "An error occurred",
        });
      }
    }
    finally{
      setLoading(false);
    }
  }
    
  return (
    <div>
      <div className="flex justify-between items-center bg-blend-darken p-4 mb-3 bg-blue-500/80 dark:bg-blue-500/20 rounded-sm">
        <div className="text-2xl text-white dark:text-white/60">
          {isEditeMode ? "Update Product" : "Create Product"}
        </div>
        <button 
          onClick={()=>navigate('/products')}
          className="flex items-center duration-300 gap-2 bg-white dark:bg-black/30 rounded-xs hover:bg-pink-300 cursor-pointer text-blue-500/80 hover:text-white dark:text-white/60 dark:hover:text-white px-2 py-1"
        >
          <span className='text-xl font-bold'><TiArrowBackOutline /></span>
          <span>Back</span>
        </button>
      </div>

      <div className="bg-white dark:bg-white/[0.02] dark:text-white/50 rounded-sm mx-auto mt-10 p-6 shadow-sm border-2">
        <form onSubmit={handleSubmit}>
          <Field>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <div>
                <FieldLabel htmlFor="name">Product Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInput}
                  placeholder="Input product name"
                  className="rounded-sm mb-4 py-5"
                  required
                />
              </div>

              <div>
                <FieldLabel htmlFor="category_id">Category</FieldLabel>
                <Select 
                  value={form.category_id !== "" && form.category_id !== null && form.category_id !== undefined ? String(form.category_id) : ""}
                  onValueChange={(val) => {setForm((pre) => ({...pre, category_id: val}))}}
                >

                  <SelectTrigger className="w-full rounded-sm mb-4 py-5">
                    {/* <SelectValue placeholder="Select Category" /> */}
                    <SelectValue placeholder="Select Category">
                      {form.category_id ?
                        categoryData.find((e) => e.id == form.category_id).name
                        :
                        "Select Category"
                      }
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup >
                      {categoryData.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.id + ' - ' + item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>

                </Select>
              </div>
              
              <div>
                <FieldLabel htmlFor="brand_id">Brand</FieldLabel>
                <Select 
                  value={form.brand_id !== "" && form.brand_id !== null && form.brand_id !== undefined ? String(form.brand_id) : ""}
                  onValueChange={(val) => {setForm((pre) => ({...pre,brand_id: Number(val)}))}}
                >
                  <SelectTrigger className="w-full rounded-sm mb-4 py-5">
                    {/* <SelectValue placeholder="Select Category" /> */}
                    <SelectValue placeholder="Select Brand">
                      {form.brand_id ?
                        brandData.find((e) => e.id == form.brand_id).name
                        :
                        "Select Brand"
                      }
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup >
                      {brandData.map((item) => (
                        <SelectItem key={item.id} value={String(item.id)}>
                          {item.id + ' - ' + item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>


              <div>
                <FieldLabel htmlFor="price">Price</FieldLabel>
                <Input
                  id="price"
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleInput}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="rounded-sm mb-4 py-5"
                  required
                />
              </div>

              <div>
                <FieldLabel htmlFor="stock">Stock</FieldLabel>
                <Input
                  id="stock"
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleInput}
                  placeholder="0"
                  min="0"
                  className="rounded-sm mb-4 py-5"
                  required
                />
              </div>
              <div>
                <Field>
                  <FieldLabel htmlFor="picture">Picture</FieldLabel>
                  <Input accept="image/*" onChange={handleImageChange}  type="file" />
                  <FieldDescription>Select a picture to upload.</FieldDescription>
                </Field>
              </div>
              <div></div>
              <div>
                {/* <div>Hello</div> */}
                <img src={previewUrl} alt="Upload file" className="w-20 h-20"/>
              </div>
            </div>

            <div className="mt-4">
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <textarea 
                id="description"
                name="description"
                rows={4}
                value={form.description}
                onChange={handleInput}
                placeholder="Input description" 
                className="w-full border rounded-sm p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </Field>

          <div className='flex gap-2'>
            <Button 
              type="submit" 
              disabled={Loading} 
              className="bg-blue-500/80 text-white dark:bg-blue-500/40 dark:text-white/60 hover:bg-blue-700 duration-300 px-4 py-2 rounded-sm flex justify-center items-center gap-2 mt-5 cursor-pointer font-medium disabled:opacity-50"
            >
              <span className='text-xl'>{isEditeMode ? <BiSolidEdit /> : <MdOutlineSaveAlt />}</span>
              {isEditeMode ? "Update" : "Create"} {Loading && <Spinner />}
            </Button>

            <Button
              onClick={handleReset}
              type="reset" 
              className="border-2 duration-300 px-4 py-2 rounded-sm flex justify-center items-center gap-2 mt-5 cursor-pointer font-medium disabled:opacity-50 text-black border-gray-200 hover:bg-gray-100 dark:text-white/60 dark:border-slate-600 dark:hover:bg-slate-700"
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductForm;
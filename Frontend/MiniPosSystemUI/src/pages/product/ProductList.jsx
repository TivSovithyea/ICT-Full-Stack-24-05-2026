import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@base-ui/react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/toast";
import NoImage from "../../assets/images.png";

const ProductList = () => {

    const [product, setProduct] = useState([]);
    const [Loading,setLoading] = useState(false);
    const [pagination,setPagination] = useState({
        currentPage:1,
        lastPage:1,
        from:0,
        to:0,
        total:0,
    });

    const navigate = useNavigate();
    const onAddNew = () => {
        navigate('/products/form')
    }
    

    const fetchData = async (page = 1) => {
        try {
            setLoading(true);
            const res = await api.get(`products?page=${page}&per_page=5`);
            const result = res.data.data;
            setProduct(result.data);
            setPagination({
                currentPage: result.current_page,
                lastPage: result.last_page,
                from: result.from,
                to: result.to,
                total: result.total
            });

        } catch (err) {
            console.log(err);
        }
        finally{
            setLoading(false);
        } 
    };

    const handleDelete = async(id) => {
        try{
            setLoading(true)
            const res = await api.delete(`products/${id}`);
            const idx = toast.add({
                title: "Event created",
                description: res.data.message,
                actionProps: {
                    children: "Undo",
                    onClick() {
                        toast.close(idx)
                    },
                },
                timeout: 3000
            })
            fetchData(pagination.currentPage);

            console.log(res)

        }
        catch(error){
            console.log(error)
        }
        finally{
            setLoading(false);
        }
        }

  

  useEffect(() => {
    fetchData(pagination.currentPage);
  },[]);


    return (
        <div>
            <div>
                <div className="flex justify-end mb-3">
                    <Button 
                        onClick={onAddNew}
                        className='bg-blue-500 text-white px-2 rounded-lg py-1 hover:bg-blue-700'
                    >
                        Add New
                    </Button>
                </div>
                {Loading ? (
                    <div className="text-center flex justify-center items-center mt-30">
                        <div className="flex w-full max-w-sm flex-col gap-2">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <div className="flex gap-4" key={index}>
                                    <Skeleton className="h-4 flex-1" />
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-4 w-20" />
                                </div>
                            ))}
                        </div>  
                    </div>
                ) :(
                    <div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">ID</TableHead>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Stock</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead className='text-center'>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                
                            <TableBody>
                                {product.map((items,index) => (
                                    <TableRow key={items.id}>
                                        <TableCell className="font-medium">{index+1}</TableCell>
                                        <TableCell><img src={items.image ? `http://localhost:8000/storage/${items.image}` : NoImage } className="w-20 h-20" /></TableCell>
                                        <TableCell>{items.name}</TableCell>
                                        <TableCell>{items.category.name}</TableCell>
                                        <TableCell>{items.price}</TableCell>
                                        <TableCell>{items.stock}</TableCell>
                                        <TableCell>{items.description}</TableCell>
                        
                                        <TableCell className= 'flex justify-center items-center'>
                                            <div className="flex items-center gap-2 text-center">
                                                <button 
                                                    onClick={()=>navigate(`/products/form/${items.id}`)}
                                                    className="bg-green-500 py-1 px-3 rounded-sm cursor-pointer text-white"
                                                >
                                                    Edit
                                                </button>
                                            
                                                <button 
                                                    onClick={()=>handleDelete(items.id)}
                                                    className="bg-red-500 text-white py-1 px-3 rounded-sm cursor-pointer"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </TableCell>
                    
                                    </TableRow>
                                ))}
                            </TableBody>
                
                            
                        </Table>
                
                        <div className="flex justify-between mx-5 mt-4">
                
                            <span>
                            {
                                pagination.total > 0 ? `showing ${pagination.from}-${pagination.to} of ${pagination.total}` : " 0 category"
                            }
                            </span>
                
                            <div className="flex justify-between">
                            <button
                                type="button"
                                disabled={Loading || pagination.currentPage <= 1}
                                onClick={() => fetchData(pagination.currentPage - 1)}
                                className="border border-slate-300 dark:border-slate-700 rounded-md px-3 py-1.5 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                Previous
                            </button>
                
                            <button
                                disabled = {Loading || pagination.currentPage >= pagination.lastPage }
                                onClick={() => fetchData(pagination.currentPage + 1)}
                                className="border-1 rounded-sm px-2 py-1"
                            >
                                Nex
                            </button>
                
                            </div>
                
                        </div>
            
                    </div>
            
                ) }
                
                
        
                
        
            </div>
        </div>
    )
}

export default ProductList
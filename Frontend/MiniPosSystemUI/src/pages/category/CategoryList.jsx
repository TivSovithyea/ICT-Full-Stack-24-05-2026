import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import api from '@/services/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/toast';

function CategoryList() {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        from: 0,
        to: 0,
        total: 0,
    });

    const fetchData = async (page = 1) => {
        try {
            setLoading(true);
            const response = await api.get(`categories?page=${page}&per_page=30`);
            const result = response.data.data;
            setCategories(result.data);
            setPagination({
                currentPage: result.current_page,
                lastPage: result.last_page,
                from: result.from,
                to: result.to,
                total: result.total
            });

        } catch(error) {
            console.log(error);
        } finally {
            console.log(pagination);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(pagination.currentPage);
    }, []);

    const onAddNew = () => {
        navigate('/categories/create');
    };

    const onDelete = async (id) => {
        try {
            setLoading(true);
            const response = await api.delete(`categories/${id}`);
            const idToast = toast.add({
                title: "Success",
                description: response.data.message,
                type: 'success',
                actionProps: {
                    onClick() {
                        toast.close(idToast)
                    },
                },
                timeout: 3000
            })
            fetchData(pagination.currentPage);

        } catch(error) {
            console.log(error);
        } finally {
            console.log(pagination);
            setLoading(false);
        }
    };

    return (
        <div>

            <div className='text-3xl mb-4'>
                List Categories
            </div>

            <div className="flex justify-end mb-3">
                <Button
                    className="bg-blue-500 hover:bg-blue-700 text-white hover:text-white"
                    onClick={() => onAddNew()}
                >
                    Add New
                </Button>
            </div>

            {!loading ?
                <div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Id</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Total Product</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((category, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>{category.description}</TableCell>
                                    <TableCell>{category.products_count}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => navigate(`/categories/edit/${category.id}`)}>Edit</Button>
                                        <Button onClick={() => onDelete(category.id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
                        <span>
                            {pagination.total > 0
                                ? `Showing ${pagination.from}-${pagination.to} of ${pagination.total}`
                                : "0 categories"}
                        </span>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={loading || pagination.currentPage <= 1}
                                onClick={() => fetchData(pagination.currentPage - 1)}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={loading || pagination.currentPage >= pagination.lastPage}
                                onClick={() => fetchData(pagination.currentPage + 1)}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            :
                <div>
                    <div className="flex w-full max-w-sm flex-col gap-2">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div className="flex gap-4" key={index}>
                                <Skeleton className="h-4 flex-1" />
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                        ))}
                    </div>
                </div>
            }

        </div>
    )
}

export default CategoryList
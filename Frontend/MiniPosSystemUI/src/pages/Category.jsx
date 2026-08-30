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

function Category() {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await api.get('categories');
            console.log(response.data);
            setCategories(response.data.data.data);
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>

            <div className='text-3xl mb-4'>
                List Categories
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
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell className="font-medium">{category.id}</TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>{category.description}</TableCell>
                                    <TableCell>{category.products_count}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
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

export default Category
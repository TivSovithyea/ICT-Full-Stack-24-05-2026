import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import api from '@/services/api';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/toast"
import { Spinner } from '@/components/ui/spinner';

function CategoryCreate() {

    const [form, setForm] = useState({
        name: "",
        description: ""
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState();

    function handleInputChange(event) {
        const { name, value } = event.target;
        setForm(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const submit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            
            const response = await api.post('categories', form);

            const id = toast.add({
                title: "Success",
                description: response.data.message,
                type: 'success',
                actionProps: {
                    onClick() {
                        toast.close(id)
                    },
                },
                timeout: 3000
            })
            navigate('/categories');
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

  return (
    <div>

        <div className='text-3xl mb-4'>
            Create Category
        </div>

        <div className="w-6/12">
            <form onSubmit={(event) => submit(event)}>
                <div>
                    <Field>
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <Input id="name" name="name" type="text" placeholder="Name" value={form.name} onChange={handleInputChange} />
                    </Field>
                </div>
                <div className="mt-3">
                    <Field>
                        <FieldLabel htmlFor="description">Description</FieldLabel>
                        <Input id="description" name="description" type="text" placeholder="Description" value={form.description} onChange={handleInputChange}  />
                    </Field>
                </div>

                <div className="mt-3">
                    <Button type="submit" disabled={loading}>Create{loading ? <Spinner data-icon="inline-start" /> : ""}</Button>
                </div>
            </form>
        </div>

    </div>
  )
}

export default CategoryCreate
import Input from '../Elements/Input';
import Button from '../Elements/Button';
import Label from '../Elements/Label';
import request from '../../utils/request';
import { useState } from 'react';
import fdtojson from '../../utils/fdtojson';
import NavBar from '../Elements/Navbar';

function AddEditCar ({ prefill, onDone }) {
  console.log(prefill)
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const body = fdtojson(e.target);
            const res = await request(prefill ? `car/${prefill?._id}` : `car`, {
                method: prefill ? "PUT" : "POST",
                body,
            });
            if (!res.error) {
              onDone?.(res);
              alert(prefill ? "Car updated" : "Car added");
            }
            else if (res.error) {
                alert(res.error);
            }
        } 
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }

  return (
      <>
      <NavBar />
    <div className="mt-20 mb-6 flex w-100 flex-col h-screen my-auto items-center bgimg bg-cover">
      <form className='w-1/3' onSubmit={handleSubmit}>
            <>
                <Label>
                  Title
                </Label>
                <Input 
                  name="title"
                  defaultValue={prefill?.title}
                />
            </>

            <>
                <Label>
                  Model
                </Label>
                <Input 
                  name="make"
                  defaultValue={prefill?.make}
                />
            </>

            <>
                <Label>
                  Year
                </Label>
                <Input 
                  name="year"
                  type="number"
                  defaultValue={prefill?.year}
                />
            </>
             

            <>
                <Label>
                  Price
                </Label>
                <Input 
                  name="price"
                  type="number"
                  defaultValue={prefill?.price}
                />
            </>

            
            <>
                <Label>
                  Image URL
                </Label>
                <Input 
                  name="image"
                  defaultValue={prefill?.image}
                />
            </>

        <Button 
          type="submit"
          loading={loading}
        >
           { prefill ? "Update Car": "Add Car" }
        </Button>
      </form>
    </div>
    </>
  );
}

export default AddEditCar;

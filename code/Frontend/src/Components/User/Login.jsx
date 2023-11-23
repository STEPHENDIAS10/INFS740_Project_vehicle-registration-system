import Input from '../Elements/Input';
import Button from '../Elements/Button';
import Label from '../Elements/Label';
import request from '../../utils/request';
import { useEffect, useState } from 'react';

function Login () {

    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        console.log(user);
        if (user) {
            window.location.href = "/";
        }
    }, []);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await request(`user/${username}`);
            if (res.data) {
                localStorage.setItem("user", JSON.stringify(res.data));
                window.location.reload();
            }
            else {
                alert("Wrong username");
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
    <div className="mt-20 mb-6 flex w-100 flex-col h-screen my-auto items-center bgimg bg-cover">
      <form className='w-1/3' onSubmit={handleSubmit}>
        <Label>
          Your Username
        </Label>
        <Input 
          name="username"
          onChange={e => setUsername(e.target.value)}
        />
        <Button 
          type="submit"
          loading={loading}
        >
          Login  
        </Button>
      </form>
    </div>
  );
}

export default Login;

import React from 'react'
import food1 from "../../../assets/food1.jpg"
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { apiAuthRegister } from '../../../services/api';
import { AlertSucces } from '../../../components/Notifications/Alerts';
const Register: React.FC = () => {

  const navigate = useNavigate()
  interface FormValues {
    full_name: string,
    email: string,
    password: string,
    confirm_password: string,
    role: string
  }
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      role: "user"
    },
  });


  const pass: string = getValues("password");
  const confirm_pass: string = getValues("confirm_password");

  

  const insertAuthRegister = async (value: any) => {
    console.log('okkkk')
    const params: any = { ...value};
    try {
      
      const { data } = await apiAuthRegister(
        JSON.stringify(params),
      );
 
      if (data.status === 201) {
        AlertSucces(data.message,);
        navigate("/login");
      }
    } catch (error) {
      const {
        response: { data },
      } = error;
      if (data.code === 422) {
				setError("full_name", {
					type: "manual",
					message: data.errors.full_name,
				});
				setError("email", {
					type: "manual",
					message: data.errors.email,
				});
				setError("password", {
					type: "manual",
					message: data.errors.password,
				});
				setError("confirm_password", {
					type: "manual",
					message: data.errors.confirm_password,
				});
      }
      if (data.status === 500) {
       console.log(error)
      }
    }
  }


  return (
    <div>
      <div className="flex justify-center items-center h-screen">
      <div className="flex lg:w-6/12 lg:h-3/5 md:w-3/5 shadow-2xl">
        {/* kiri */}
          <div className='w-1/2 hidden lg:flex shadow-xl relative'>
          <div className="absolute inset-0 bg-black opacity-30"></div>
              <img className='w-full h-full' src={food1} />
              <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="animate-pulse text-5xl font-bold text-center font-mono">
                Food and Drink Your Favorite
              </div>
            </div>
          </div>
          {/* kanan */}
         
          <form onSubmit={handleSubmit(insertAuthRegister)} className="flex flex-col md:w-full justify-center items-center lg:w-1/2 p-10">
            <h1 className='mb-4 md:text-2xl font-semibold text-gray-800'>Register</h1>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2 mb-4 rounded border-b border-gray-300 focus:outline-none focus:border-blue-500"
              {...register("full_name", {
                required: {
                  value: true,
                  message:
                    "Nama Lengkap wajib diisi",
                },
                minLength: {
                  value: 5,
                  message:
                    "Nama depan wajib diisi tidak boleh kurang dari 5 karakter",
                },
              })}
            />
            {errors.full_name && <p className="text-red-500 text-xs">{errors.full_name.message}</p>}
            <input
              type="text"
              placeholder="Email"
              className="w-full p-2 mb-4 rounded border-b border-gray-300 focus:outline-none focus:border-blue-500"
              {...register("email", {
                required: {
                  value: true,
                  message:
                    "Email wajib diisi",
                },
                minLength: {
                  value: 5,
                  message:
                    "Email wajib diisi tidak boleh kurang dari 5 karakter",
                },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Masukkan alamat email yang valid",
                },
              })}
            />
             {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-4 rounded border-b border-gray-300 focus:outline-none focus:border-blue-500"
        
              {...register("password", {
                required: {
                  value: true,
                  message:
                    "Password wajib diisi",
                },
                minLength: {
                  value: 5,
                  message:
                    "Password wajib diisi tidak boleh kurang dari 5 karakter",
                },
              })}
            />
             {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-2 mb-4 rounded border-b border-gray-300 focus:outline-none focus:border-blue-500"
          
              {...register("confirm_password", {
                required: {
                  value: true,
                  message:
                    "Konfirmasi Password wajib diisi",
                },
                minLength: {
                  value: 5,
                  message:
                    "Konfirmasi Password wajib diisi tidak boleh kurang dari 5 karakter",
                },
              })}
            />
           {pass !== confirm_pass && pass !== "" && confirm_pass !== "" && <p className="text-red-500 text-xs mb-3">Konfirmasi password tidak sama dengan password</p>}
             <button type='submit' className="w-full bg-orange-500 text-white  py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Register
              </button>
        <a href='/login' className="text-slate-400 text-xs underline mt-2">Do you have an account? Sign In</a>
          </form>
      </div>
      </div>
    </div>
  )
}

export default Register
import React from 'react'
import food1 from "../../../assets/food1.jpg"
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { apiAuthLogin } from '../../../services/api';
import { AlertFailed, AlertSucces } from '../../../components/Notifications/Alerts';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../../../redux/features/authUserSlice';
const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  interface FormValues {
    email: string,
    password: string,
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const AuthLogin = async (value: any) => {
  //   const params: any = { ...value};
  //   try {
      
  //     const { data } = await apiAuthLogin(
  //       JSON.stringify(params),
  //     );
 
  //     if (data.status === 200) {
  //       localStorage.setItem('user', JSON.stringify(data.user));
  //       AlertSucces(data.message,);
  //       navigate("/home");
  //     }
  //   } catch (error) {
  //     const {
  //       response: { data },
  //     } = error;
  //     if (data.code === 422) {
	// 			setError("email", {
	// 				type: "manual",
	// 				message: data.errors.email,
	// 			});
	// 			setError("password", {
	// 				type: "manual",
	// 				message: data.errors.password,
	// 			});
  //     }
  //     if (data.status === 500) {
  //      console.log(error)
  //     }
  //   }
  // }

  const AuthLogin = async (value: any) => {
    const params: any = { ...value };
    try {
      const { data } = await apiAuthLogin(JSON.stringify(params));
      if (data.status === 200) {
        dispatch(setUser(data.user)); // Menyimpan informasi pengguna ke dalam store menggunakan Redux
        dispatch(setToken(data.token))
        AlertSucces(data.message); // Menggunakan komponen Notifikasi dengan benar
        navigate("/home");
      }
    } catch (error) {
      const {
        response: { data },
      } = error;
      if (data.status === 422) {
        setError("email", {
          type: "manual",
          message: data.errors.email,
        });
        setError("password", {
          type: "manual",
          message: data.errors.password,
        });
      }
      if(data.status === 404){
        AlertFailed(data.message)
      }
      if (data.status === 500) {
        console.log(error);
      }
    }
  };
  
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
         
          <form onSubmit={handleSubmit(AuthLogin)} className="flex flex-col md:w-full justify-center items-center lg:w-1/2 p-10">
            <h1 className='mb-4 md:text-2xl font-semibold text-gray-800'>Login</h1>
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
             <button type='submit' className="w-full bg-orange-500 text-white  py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Login
              </button>
              <a href='/register' className="text-slate-400 text-xs underline mt-2">Don't you have an account yet?</a>
          </form>
      </div>
  
      </div>
    </div>
  )
}

export default Login
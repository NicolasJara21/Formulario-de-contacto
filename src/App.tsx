import './style/index.css';
import { useForm, SubmitHandler } from "react-hook-form";

type Form = {
  Name: string;
  Email: string;
  Message: string;
}

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm<Form>();
  const onSubmit: SubmitHandler<Form> = data => console.log(data);

  return (
    <div className='bg-blue-500 w-full h-screen flex items-center justify-center'>
      <form
        className='border border-white font-mono p-4 bg-[url(https://i.pinimg.com/originals/c2/95/0a/c2950a4ba90250fa5d7da1da6e0e434c.jpg)] bg-cover h-[450px] w-[420px] rounded-[5px]'
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("Name", { required: "Required name", minLength: 2 })}
          className='bg-white rounded-[5px] w-full p-1 mt-2'
          type='text'
          placeholder='Name'
        />
        {errors.Name && <p className='text-red-500 text-sm'>{errors.Name.message}</p>}

        <input
          {...register("Email", { required: "Required email", minLength:{value:5, message:'ingrese al menos 5 caracteres'}, maxLength:{value:20 , message:'agrege al menos 20 caracteres'} })}
          className='bg-white rounded-[5px] w-full p-1 mt-2'
          type='email'
          placeholder='Email'
        />
        {errors.Email && <p className='text-red-500 text-sm'>{errors.Email.message}</p>}

        <textarea
          {...register("Message", { required: "Required message", minLength: 10, maxLength: 500 })}
          className='bg-white rounded-[5px] p-1 w-full h-[100px] mt-2'
          placeholder='Message'
        />
        {errors.Message && <p className='text-red-500 text-sm'>{errors.Message.message}</p>}

        <button
          className='hover:bg-violet-600 bg-violet-500 text-white rounded-[5px] p-1 w-full mt-3'
          type='submit'
        >
          Submit
        </button>
        <p className='text-green-900'>El mensaje fue enviado</p>
      </form>
    </div>
  );
}

export default App;

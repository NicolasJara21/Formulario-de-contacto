import './style/index.css';
import { useForm, SubmitHandler } from "react-hook-form";
import { ContactForm } from './Component/ContactForm'
import { useState } from 'react';
import {z} from "zod";
import { zodResolver } from '@hookform/resolvers/zod';




const schema = z.object({

  Name: z.string().min(2 ,"required al menos dos caracteres"),
  Email: z.string().min(5,"required al menos 5 caracteres").email("required Email"),
  Message: z.string().min(10,"required Message").max(50, "required  no mas de 50 caracteres")
});

type Form = z.infer<typeof schema>;



function App() {
  const { register, reset, handleSubmit, formState: { errors } } = useForm<Form>( {resolver: zodResolver(schema)});

  const [enviado , setEnviado] = useState(false);

  const buttonSubmit: SubmitHandler<Form> = data => {
    console.log(data);
    setEnviado(true);
    setTimeout(()=> setEnviado(false), 3000);
    setTimeout(()=> reset(), 3000);

  }

  return (
    <div className='bg-blue-500 w-full h-screen flex items-center justify-center'>
      <form
        className='border border-white font-mono p-4 bg-[url(https://i.pinimg.com/originals/c2/95/0a/c2950a4ba90250fa5d7da1da6e0e434c.jpg)] bg-cover h-[450px] w-[420px] rounded-[5px]'
        onSubmit={handleSubmit(buttonSubmit)}
      >
        <input
          {...register("Name")}
          className='bg-white rounded-[5px] w-full p-1 mt-2'
          type='text'
          placeholder='Name'
        />
        {errors.Name && <p className='text-red-500 text-sm'>{errors.Name.message}</p>}

        <input
          {...register("Email")}
          className='bg-white rounded-[5px] w-full p-1 mt-2'
          type='email'
          placeholder='Email'
        />
        {errors.Email && <p className='text-red-500 text-sm'>{errors.Email.message}</p>}

        <textarea
          {...register("Message")}
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
        {enviado && <p className='text-green-900'>El mensaje fue enviado</p>}
      </form>
      <ContactForm></ContactForm>
    </div>
  );
}

export default App;

'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';

import InputField from '@/components/InputField';

interface TeacherFormProps {
  type: 'create' | 'update';
  data?: any;
}

const schema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must have at least 3 characters' })
    .max(20, { message: 'Username must have at most 20 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must have at least 8 characters' }),
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  phone: z.string().min(1, { message: 'Phone is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  bloodType: z.string().min(1, { message: 'Blood Type is required' }),
  birthday: z.date({ message: 'Birthday is required' }),
  sex: z.enum(['male', 'female'], { message: 'Sex is required' }),
  image: z.instanceof(File, { message: 'Image is required' })
});

type TeacherForm = z.infer<typeof schema>;

const TeacherForm = ({ type, data }: TeacherFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TeacherForm>({
    resolver: zodResolver(schema)
  });

  const submitHandler = handleSubmit((data) => {
    console.log({ data });
  });

  return (
    <form className="flex flex-col gap-2 p-2" onSubmit={submitHandler}>
      <h1 className="txt-xl font-semibold">Create a new Teacher</h1>
      <span className="mt-4 text-sm font-medium text-gray-500">Authentication Information</span>
      <div className="flex flex-wrap justify-between gap-2">
        <InputField
          name="username"
          label="Username"
          defaultValue={data?.username}
          register={register}
          error={errors.username}
        />

        <InputField
          name="email"
          type="email"
          label="Email"
          defaultValue={data?.email}
          register={register}
          error={errors.email}
        />

        <InputField
          name="password"
          type="password"
          label="Password"
          defaultValue={data?.password}
          register={register}
          error={errors.password}
        />
      </div>
      <span className="mt-4 text-sm font-medium text-gray-500">Personal Information</span>
      <div className="flex flex-wrap justify-between gap-2">
        <InputField
          name="firstName"
          label="First Name"
          defaultValue={data?.firstName}
          register={register}
          error={errors.firstName}
        />
        <InputField
          name="lastName"
          label="Last Name"
          defaultValue={data?.lastName}
          register={register}
          error={errors.lastName}
        />
        <InputField
          name="phone"
          label="Phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
        <InputField
          name="address"
          label="Address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <InputField
          name="bloodType"
          label="Blood Type"
          defaultValue={data?.bloodType}
          register={register}
          error={errors.bloodType}
        />
        <InputField
          name="birthday"
          label="Birthday"
          type="date"
          defaultValue={data?.birthday}
          register={register}
          error={errors.birthday}
        />
        <div className="flex w-full flex-col justify-center gap-2 md:w-1/4">
          <label className="text-sm text-gray-400">Sex</label>
          <select
            {...register('sex')}
            defaultValue={data?.sex}
            className="w-full rounded-md p-2 text-sm ring-[1.5px] ring-gray-300 focus:ring-gray-500"
          >
            <option value=""></option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
          {errors?.sex?.message && (
            <p className="-mt-1 text-sm text-red-400">{errors.sex.message.toString()}</p>
          )}
        </div>
        <div className="flex w-full flex-col justify-center gap-2 md:w-1/4">
          <label
            className="flex cursor-pointer items-center gap-2 text-xs text-gray-500"
            htmlFor="image"
          >
            <Image src="/upload.png" width={28} height={28} alt="" />
            <span>Upload a profile photo</span>
          </label>
          <input id="image" type="file" {...register('image')} hidden />
          {errors?.image?.message && (
            <p className="-mt-1 text-sm text-red-400">{errors.image.message.toString()}</p>
          )}
        </div>
      </div>
      <button className="mt-4 rounded-md bg-blue-400 p-2 text-white">
        {type === 'create' ? 'Create' : 'Update'}
      </button>
    </form>
  );
};

export default TeacherForm;

import { InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

interface InputFieldProps {
  label: string;
  type?: string;
  name: string;
  register: any;
  defaultValue?: string;
  error?: FieldError;
  extra?: InputHTMLAttributes<HTMLInputElement>;
}

const InputField = ({
  type = 'text',
  name,
  register,
  defaultValue,
  label,
  error,
  extra
}: InputFieldProps) => {
  return (
    <div className="flex w-full flex-col justify-center gap-2 md:w-1/4">
      <label className="text-sm text-gray-400">{label}</label>
      <input
        type={type}
        {...register(name)}
        className="w-full rounded-md p-2 text-sm ring-[1.5px] ring-gray-300 focus:ring-gray-500"
        defaultValue={defaultValue}
        {...extra}
      />
      {error?.message && <p className="-mt-1 text-sm text-red-400">{error.message?.toString()}</p>}
    </div>
  );
};

export default InputField;

import { Check } from "lucide-react";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  id: string;
  label: string;
}

export function Checkbox({ checked, onChange, id, label }: CheckboxProps) {
  return (
    <div className='flex items-center'>
      <input
        type='checkbox'
        id={id}
        checked={checked}
        onChange={onChange}
        className='hidden'
      />
      <label
        htmlFor={id}
        className={`flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 border rounded cursor-pointer ${
          checked ? "bg-blue-500 border-blue-500" : "border-gray-300"
        }`}
      >
        {checked && (
          <svg className='w-3 h-3 text-white fill-current' viewBox='0 0 20 20'>
            <path d='M0 11l2-2 5 5L18 3l2 2L7 18z' />
          </svg>
        )}
      </label>
      <span
        className='ml-2 text-sm sm:text-base cursor-pointer'
        onClick={onChange}
      >
        {label}
      </span>
    </div>
  );
}

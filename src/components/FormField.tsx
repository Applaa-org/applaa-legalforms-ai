import { motion } from 'framer-motion';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface FormFieldProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  type: 'text' | 'number' | 'date' | 'textarea';
  placeholder?: string;
  required?: boolean;
  register: UseFormRegister<T>;
  error?: string;
}

export default function FormField<T extends FieldValues>({
  id,
  label,
  type,
  placeholder,
  required,
  register,
  error
}: FormFieldProps<T>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-4"
    >
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          {...register(id, { required: required && `${label} is required` })}
          placeholder={placeholder}
          rows={4}
          className={`
            w-full px-4 py-3 border border-gray-300 rounded-2xl 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-200 resize-none
            ${error ? 'border-red-500' : 'border-gray-300'}
          `}
        />
      ) : (
        <input
          id={id}
          type={type}
          {...register(id, { required: required && `${label} is required` })}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 border border-gray-300 rounded-2xl 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-200
            ${error ? 'border-red-500' : 'border-gray-300'}
          `}
        />
      )}
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-sm mt-1"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}
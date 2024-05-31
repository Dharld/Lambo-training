/* eslint-disable react/prop-types */
export default function Input({
  type = "text",
  name,
  label,
  value,
  handleChange,
  placeholder,
  styles,
}) {
  return (
    <div
      className={`group relative border border-slate-200 flex px-4 py-3 rounded-sm transition-all focus-within:border focus-within:border-sky-500 ${styles}`}
    >
      <label
<<<<<<< HEAD
        className="absolute -left-0 -top-8 text-slate-500 font-semibold group-focus-within:text-sky-500"
=======
        className="absolute -left-0 -top-6 text-slate-900 font-semibold group-focus-within:text-sky-500"
>>>>>>> 21e73ff149714f0ed0d152b70218876b8801f68e
        htmlFor="password"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="bg-transparent border-none outline-none flex-1 font-normal"
      />
    </div>
  );
}

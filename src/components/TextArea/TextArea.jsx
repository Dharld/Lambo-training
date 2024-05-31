/* eslint-disable react/prop-types */
export default function TextArea({
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
        className="absolute -left-0 -top-8 text-slate-500 font-semibold group-focus-within:text-sky-500"
        htmlFor="password"
      >
        {label}
      </label>
      <textarea
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        rows={4}
        className="bg-transparent border-none outline-none flex-1 font-normal"
      />
    </div>
  );
}

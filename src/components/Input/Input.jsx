/* eslint-disable react/prop-types */
export default function Input({
  type,
  name,
  label,
  value,
  handleChange,
  placeholder,
  styles,
}) {
  return (
    <div className={`input ${styles}`}>
      <label htmlFor="password">{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

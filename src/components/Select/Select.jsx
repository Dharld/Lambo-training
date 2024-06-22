/* eslint-disable react/prop-types */
export default function Select({
  data,
  value,
  handleChange,
  name,
  label,
  id,
  valueAttribute = "id",
  idAttribute = "id",
  labelAttribute = "name",
  styles,
}) {
  return (
    <div className={`group ${styles}`}>
      <label
        htmlFor={name}
        className="text-slate-500 font-semibold -within:text-violet-500 group-focus-within:text-violet-500 group-focus-within:font-semibold block mb-2"
      >
        {label}
      </label>
      <select
        value={value}
        name={name}
        id={id}
        onChange={handleChange}
        defaultValue=""
        className={`bg-white group relative border border-slate-200 outline-none flex p-3 rounded-sm transition-all focus-within:border focus-within:border-violet-500 w-full peer`}
      >
        {/* Label option added here */}
        <option value="" disabled>
          Select an option
        </option>
        {data.map((d) => (
          <option value={d[valueAttribute]} key={d[idAttribute]}>
            {d[labelAttribute]}
          </option>
        ))}
      </select>
    </div>
  );
}

/* eslint-disable react/prop-types */
import "./Radio.scss";

export default function Radio({
  name,
  value,
  label,
  handleChange,
  checked = false,
}) {
  return (
    <label
      className="text-slate-500 font-semibold grid gap-2 text-[1rem]"
      style={{ gridTemplateColumns: "1em auto" }}
    >
      <input
        type="radio"
        name={name}
        value={value}
        className="appearance-none text-current w-[1.15em] h-[1.15em] border border-current rounded-full translate-y-[0.075em] grid place-content-center before:content-[''] before:w-[0.65em] before:h-[0.65em] before:rounded-full before:scale-0 before:transition-all before:shadow-inset radio focus:outline-sky-500"
        style={{
          fontSize: "inherit",
        }}
        onChange={handleChange}
        checked={checked}
      />
      <span>{label}</span>
    </label>
  );
}

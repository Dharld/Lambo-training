/* eslint-disable react/prop-types */
import "./Checkbox.scss";

export default function Checkbox({
  name,
  value,
  label,
  handleChange,
  color = "text-slate-500",
}) {
  return (
    <label
      className={"font-semibold grid gap-2 text-[1rem] " + color}
      style={{ gridTemplateColumns: "1em auto" }}
    >
      <input
        type="checkbox"
        name={name}
        value={value}
        className="appearance-none text-current w-[1.15em] h-[1.15em] border border-current translate-y-[0.075em] grid place-content-center before:content-[''] before:w-[0.65em] before:h-[0.65em] before:scale-0 before:transition-all before:shadow-inset checkbox focus:outline-violet-500"
        style={{
          fontSize: "inherit",
        }}
        onChange={handleChange}
      />
      <span>{label}</span>
    </label>
  );
}

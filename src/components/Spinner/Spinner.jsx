/* eslint-disable react/prop-types */
import "./Spinner.scss";

export default function Spinner({ styles }) {
  return <div className={`spinner ${styles ?? ""}`}></div>;
}

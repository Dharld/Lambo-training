import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate();

  const goBackHome = () => {
    navigate("/home");
  };

  return (
    <h1
      onClick={goBackHome}
      className="w-fit select-none rounded-sm  grid place-items-center text-violet-500 text-xl font-extrabold"
    >
      Lambo Training
    </h1>
  );
}

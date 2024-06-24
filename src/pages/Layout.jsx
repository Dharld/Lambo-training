/* eslint-disable react/prop-types */
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import { useEffect, useRef, useState } from "react";
import { AiOutlineHeart, AiOutlineShopping } from "react-icons/ai";
import Button from "../components/Button/Button";
import { useSelector } from "react-redux";

const CartPopup = ({ styles }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.total);

  const navigate = useNavigate();

  const goToCheckoutPage = () => {
    navigate("/home/checkout");
  };

  return (
    <div
      className={
        "border absolute top-8 right-0 w-[325px] min-h-[100px] max-h-[200px] overflow-y-auto bg-white shadow px-4 py-4 " +
        styles
      }
    >
      <h2 className="text-2xl font-bold text-slate-700 leading-4 mb-2">Cart</h2>
      {cartItems.length > 0 ? (
        <>
          <ul>
            {cartItems.map((i) => (
              <li
                key={i.course_id}
                className="flex py-2 border-b border-b-slate-200 fl-p-0"
              >
                <div className="flex-shrink-0 w-16 bg-slate-100 my-2 aspect-[16/9]">
                  <img
                    src={decodeURIComponent(i.thumbnail_url)}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
                <div className="flex flex-col ml-3">
                  <div className="font-extrabold text leading-4 -mt-[-6px] text-zinc-800">
                    {i.course_title && i.course_title.length < 35
                      ? i.course_title
                      : i.course_title.slice(0, 35) + "..."}
                  </div>
                  <div className="text-slate-500 text-sm">{i.author}</div>
                  <div className="text-zinc-800 tracking-tighter font-semibold mt-2">
                    ${i.price}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex mt-4">
            <div className="text-zinc-800 font-bold text-xl">
              Total: ${totalPrice}
            </div>
          </div>
          <Button styles="mt-4" handleClick={goToCheckoutPage}>
            Go To Checkout
          </Button>
        </>
      ) : (
        <div className="text-slate-500 m-auto">No items in cart</div>
      )}
    </div>
  );
};

export default function Layout() {
  const navigate = useNavigate();
  const totalItems = useSelector((state) => state.cart.numberOfItems);

  const goToLoginPage = () => {
    navigate("/login");
  };

  const goToSignupPage = () => {
    navigate("/signup");
  };

  const Actions = () => {
    const shoppingCartRef = useRef(null);
    const safeZoneRef = useRef(null);
    const [popUpStyle, setPopUpStyle] = useState(
      "opacity-0 pointer-events-none"
    );

    useEffect(() => {
      const handleMouseEnter = () => {
        safeZoneRef.current &&
          safeZoneRef.current.classList.add("pointer-events-auto");
        safeZoneRef.current &&
          safeZoneRef.current.classList.remove("pointer-events-none");
        setPopUpStyle("slide-down pointer-events-auto");
      };

      const handleMouseLeave = () => {
        safeZoneRef.current &&
          safeZoneRef.current.classList.add("pointer-events-none");
        safeZoneRef.current &&
          safeZoneRef.current.classList.remove("pointer-events-auto");
        setPopUpStyle("slide-up pointer-events-none");
      };

      const element = shoppingCartRef.current;

      if (element) {
        element.addEventListener("mouseenter", handleMouseEnter);
        element.addEventListener("mouseleave", handleMouseLeave);
      }

      return () => {
        if (element) {
          element.removeEventListener("mouseenter", handleMouseEnter);
          element.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    }, [shoppingCartRef]);

    return (
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 relative" ref={shoppingCartRef}>
          <AiOutlineShopping className="text-3xl hover:fill-violet-500 cursor-pointer" />
          {totalItems > 0 && (
            <div className="w-[24px] h-[24px] grid place-items-center absolute text-[12px] font-bold -top-2 -right-2 bg-violet-500 text-white rounded-full select-none">
              {totalItems}
            </div>
          )}
          <div
            className="to-avoid-flicke w-[390px] absolute -top-12 -right-8 h-[320px] pointer-events-none"
            ref={safeZoneRef}
          ></div>
          <CartPopup styles={popUpStyle} />
        </div>
        <AiOutlineHeart className="flex-shrink-0 text-3xl hover:fill-violet-500 cursor-pointer " />
        <Button handleClick={goToLoginPage}>
          <span>Login</span>
        </Button>
        <Button
          handleClick={goToSignupPage}
          styles="bg-transparent border border-violet-500 transparent text-violet-500 hover:text-white"
        >
          <NavLink>Signup</NavLink>
        </Button>
      </div>
    );
  };

  return (
    <div className="h-screen overflow-auto pb-8">
      <Header actions={Actions} />
      <Outlet />
    </div>
  );
}

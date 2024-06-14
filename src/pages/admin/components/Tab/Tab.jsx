/* eslint-disable react/prop-types */
import "./Tab.scss";

export default function Tab({ children }) {
  return (
    <div className="flex-1 w-full h-full px-8 md:max-w-[500px] mx-auto">
      {children}
    </div>
  );
}

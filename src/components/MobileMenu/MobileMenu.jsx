/* eslint-disable react/prop-types */

export default function MobileMenu({ children, styles }) {
  return (
    <div>
      <div
        className={`fixed z-50 w-full bottom-0 bg-gray-50 border-r-slate-100  ${
          styles ?? ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}

import { useSelector } from "react-redux";
import UserHeader from "./components/UserHeader/UserHeader.jsx";
import UserSidebar from "./components/UserSidebar/UserSidebar.jsx";
import Catalog from "./components/Catalog/Catalog.jsx";
import { useLocation } from "react-router-dom";

export default function User() {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col">
      <UserHeader user={user} />
      <main className="flex flex-1">
        <UserSidebar></UserSidebar>
        <div className="flex-1 bg-gray-100">
          <div className="container h-full mx-auto w-full p-8">
            <h1 className="font-semibold text-3xl text-gray-600">
              Explore our catalog of courses
            </h1>
            <Catalog />
          </div>
        </div>
      </main>
    </div>
  );
}

/* eslint-disable react/prop-types */
// import Searchbar from "../../../../components/searchbar/Searchbar";

import Header from "../../../../components/Header/Header";

export default function AdminHeader({ user }) {
  return <Header user={user} showLogo={false} title="Super Admin" />;
}

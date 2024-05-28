/* eslint-disable react/prop-types */
export default function Table({ data, openModal }) {

  const editUser = async (id) => {
    const action = {
      type: "edit",
      payload: { id },
    };
    await openModal(action);
  };

  const deleteUser = async (id) => {
    const action = { type: "delete", payload: { id } };
    await openModal(action);
  };

  return (
    <table className="mt-6 mx-auto max-w-[1000px] w-full bg-white rounded-md shadow-sm">
      <thead className="px-4">
        <tr className="bg-slate-100">
          <th className="px-2 pl-8 py-4 text-left text-sm text-sky-800 rounded-t-md">
            Name
          </th>
          <th className="px-2 py-4 text-left text-sm text-sky-800">Email</th>
          <th className="px-2 py-4 text-left text-sm text-sky-800">Role</th>
          <th className="px-2 py-4 text-left text-sm text-sky-800 rounded-tr-md">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user.user_id} className="border-b border-b-slate-100">
            <td className="px-2 pl-8 py-2 text-sm text-gray-800">
              {user.name}
            </td>
            <td className="px-2 py-2 text-sm text-gray-800">{user.email}</td>
            <td className="px-2 py-2 text-sm text-gray-800">
              {user.role_name}
            </td>
            <td className="px-2 py-2 text-sm text-gray-800 flex">
              <div className="border border-sky-400 grid place-items-center w-[40px] h-[40px] rounded-full mr-2 group hover:bg-sky-400 transition-colors cursor-pointer" onClick={() => editUser(user.user_id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Layer_1"
                  data-name="Layer 1"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  className="fill-sky-400 group-hover:fill-white"
                >
                  <path d="M9,12c3.309,0,6-2.691,6-6S12.309,0,9,0,3,2.691,3,6s2.691,6,6,6Zm0-10c2.206,0,4,1.794,4,4s-1.794,4-4,4-4-1.794-4-4,1.794-4,4-4Zm14.122,9.879c-1.134-1.134-3.11-1.134-4.243,0l-7.879,7.878v4.243h4.243l7.878-7.878c.567-.567,.879-1.32,.879-2.122s-.312-1.555-.878-2.121Zm-1.415,2.828l-7.292,7.293h-1.415v-1.415l7.293-7.292c.377-.378,1.036-.378,1.414,0,.189,.188,.293,.439,.293,.707s-.104,.518-.293,.707Zm-9.778,1.293H5c-1.654,0-3,1.346-3,3v5H0v-5c0-2.757,2.243-5,5-5H13c.289,0,.568,.038,.844,.085l-1.915,1.915Z" />
                </svg>
              </div>
              <div
                className="border border-sky-400 grid place-items-center w-[40px] h-[40px] rounded-full mr-2 group hover:bg-sky-400 transition-colors cursor-pointer"
                onClick={() => deleteUser(user.user_id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Layer_1"
                  data-name="Layer 1"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  className="fill-sky-400 group-hover:fill-white"
                >
                  <g id="_01_align_center" data-name="01 align center">
                    <path d="M22,4H17V2a2,2,0,0,0-2-2H9A2,2,0,0,0,7,2V4H2V6H4V21a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V6h2ZM9,2h6V4H9Zm9,19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V6H18Z" />
                    <rect x="9" y="10" width="2" height="8" />
                    <rect x="13" y="10" width="2" height="8" />
                  </g>
                </svg>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

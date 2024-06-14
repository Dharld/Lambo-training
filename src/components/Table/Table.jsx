/* eslint-disable react/prop-types */
import { useModal } from "../../hooks/modal.hook";

export default function Table({ data }) {
  const { openModal } = useModal();

  const editUser = async (user) => {
    openModal({
      type: "edit",
      payload: { user },
    });
  };

  const deleteUser = async (user) => {
    openModal({ type: "delete", payload: { user } });
  };

  return (
    <div className="w-full rounded-sm shadow-sm">
      <div className="hidden gap-4 p-4 font-bold text-sky-800">
        <div className="w-1/4">Name</div>
        <div className="w-1/4">Email</div>
        <div className="w-1/4">Role</div>
        <div className="w-1/4">Actions</div>
      </div>

      <div className="mt-4">
        {data.map((user) => (
          <div
            key={user.user_id}
            className="flex gap-2 justify-between items-center p-4 bg-white shadow-sm rounded-md mb-2 cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <div className="flex-1">
              <div className="text-base font-semibold text-gray-700">
                {user.name}
              </div>
              <div className="text-sm text-gray-500">{user.email}</div>
            </div>
            <div className="w-1/8 text-sm text-gray-700 text-center border border-t-0 border-b-0 border-r border-l px-4">
              {user.role_name}
            </div>
            <div className="w-1/8 flex space-x-2">
              <div
                className="border border-sky-400 grid place-items-center w-[40px] h-[40px] rounded-full group hover:bg-sky-400 transition-colors cursor-pointer"
                onClick={() => editUser(user)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  className="fill-sky-400 group-hover:fill-white"
                >
                  <path d="M9,12c3.309,0,6-2.691,6-6S12.309,0,9,0,3,2.691,3,6s2.691,6,6,6Zm0-10c2.206,0,4,1.794,4,4s-1.794,4-4,4-4-1.794-4-4,1.794-4,4-4Zm14.122,9.879c-1.134-1.134-3.11-1.134-4.243,0l-7.879,7.878v4.243h4.243l7.878-7.878c.567-.567,.879-1.32,.879-2.122s-.312-1.555-.878-2.121Zm-1.415,2.828l-7.292,7.293h-1.415v-1.415l7.293-7.292c.377-.378,1.036-.378,1.414,0,.189,.188,.293,.439,.293,.707s-.104,.518-.293,.707Zm-9.778,1.293H5c-1.654,0-3,1.346-3,3v5H0v-5c0-2.757,2.243-5,5-5H13c.289,0,.568,.038,.844,.085l-1.915,1.915Z" />
                </svg>
              </div>
              <div
                className="border border-sky-400 grid place-items-center w-[40px] h-[40px] rounded-full group hover:bg-sky-400 transition-colors cursor-pointer"
                onClick={() => deleteUser(user)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  className="fill-sky-400 group-hover:fill-white"
                >
                  <g>
                    <path d="M22,4H17V2a2,2,0,0,0-2-2H9A2,2,0,0,0,7,2V4H2V6H4V21a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V6h2ZM9,2h6V4H9Zm9,19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V6H18Z" />
                    <rect x="9" y="10" width="2" height="8" />
                    <rect x="13" y="10" width="2" height="8" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

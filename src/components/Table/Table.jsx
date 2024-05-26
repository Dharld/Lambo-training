/* eslint-disable react/prop-types */
export default function Table({ data }) {
  return (
    <table className="block w-full p-4 bg-white">
      <thead>
        <tr>
          <th className="text-left text-sm text-gray-400">Name</th>
          <th className="text-left text-sm text-gray-400">Email</th>
          <th className="text-left text-sm text-gray-400">Role</th>
          <th className="text-left text-sm text-gray-400">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user.id}>
            <td className="text-sm text-gray-800">{user.name}</td>
            <td className="text-sm text-gray-800">{user.email}</td>
            <td className="text-sm text-gray-800">{user.role}</td>
            <td className="text-sm text-gray-800">
              <button className="text-sky-400">Edit</button>
              <button className="text-red-400">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

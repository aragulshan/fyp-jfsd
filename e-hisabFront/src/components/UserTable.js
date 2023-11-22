import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/slices/userSlice";
// import { fetchUsers, selectAllUsers } from "../redux/slices/userSlice";

const UserTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state?.users?.users); // Use consistent naming
  console.log(users,'users are')

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div className="container mx-auto mt-8 h-[70vh]">
      {users?.length === 0 ? (
        <p className="text-center text-gray-600">No Users Found</p>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        {/* <table className="min-w-full bg-white border border-gray-300"> */}
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-2 px-4 border-b">ID</th>
              <th scope="col" className="py-2 px-4 border-b">Name</th>
              <th scope="col" className="py-2 px-4 border-b">Email</th>
              <th scope="col" className="py-2 px-4 border-b">Contact</th>
            </tr>
          </thead>
          <tbody>
            {users && users?.map((user) => {
                return (
                  <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="py-2 px-4 border-b font-medium text-gray-900 whitespace-nowrap dark:text-white">{user._id}</td>
                    <td className="py-2 px-4 border-b font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</td>
                    <td className="py-2 px-4 border-b font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.email}</td>
                    <td className="py-2 px-4 border-b font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.contact}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserTable;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
const Users = () => {

  const [users, setUsers] = useState(null);
  const [reload, setReload] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3003/user")
      .then(res => setUsers(res.data));
  }, [reload]);

  const handleCreatePost = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData);

    axios
      .post("http://localhost:3003/user", user)
      .then(() => {
        e.target.reset();
        setReload(prev => !prev);
      });
      toast.success(`${user.name} added successfuly`)
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3003/user/${deleteUserId}`)
      .then(() => {
        setIsDeleteModalOpen(false);
        setReload(prev => !prev);
      });
      toast.error( "User deleted successfuly")
  };

  const handleEdit = user => {
    setCurrentUser(user);
    setIsEditModalOpen(true);
  };
  
  const handleUpdate = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedUser = Object.fromEntries(formData);
    
    axios
    .put(`http://localhost:3003/user/${currentUser.id}`, updatedUser)
    .then(() => {
      setIsEditModalOpen(false);
      setReload(prev => !prev);
    });
    toast.info( "User edited successfuly")
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="p-4 container text-white">
      <h1 className="text-2xl text-center font-bold mb-4">Add users</h1>
      <form onSubmit={handleCreatePost} className="mb-4 w-[500px] text-center">
        <input
          autoComplete='off'
          required
          type="text"
          name="name"
          placeholder="Name"
          className="border border-slate-600 p-2 mr-2 mb-[10px] rounded-xl outline-none bg-transparent"
        />
        <input
          autoComplete='off'
          required
          type="text"
          name="surname"
          placeholder="Surname"
          className="border border-slate-600 p-2 mr-2 mb-[10px] rounded-xl outline-none bg-transparent"
        />
        <input
          autoComplete='off'
          required
          type="number"
          name="age"
          placeholder="Age"
          className="border border-slate-600 p-2 mr-2 mb-[10px] rounded-xl outline-none bg-transparent"
        />
        <select
          required
          name="gender"
          className="border border-slate-600 p-2 mr-2 mb-[10px] w-[205px] rounded-xl outline-none bg-transparent"
        >
          <option className='text-black' value="male">Male</option>
          <option className='text-black' value="female">Female</option>
        </select>
        <input
          required
          type="text"
          name="url"
          placeholder="Image URL"
          className="border border-slate-600 p-2 mr-2 mb-[10px] rounded-xl outline-none bg-transparent"
        />
        <button className='btn'>
          <span>
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="currentColor"></path>
            </svg>
            Create
          </span>
      </button>
      </form>
      <ul className='flex flex-wrap gap-[20px] justify-center'>
      {users?.map(user => (
        <li className="mb-4 p-4 border border-slate-300 rounded-xl shadow w-[250px] text-center" key={user.id}>
          <img src={user.url} alt={user.name} className="w-24 h-24 object-cover rounded-full mb-2 mx-auto" />
          <div className='flex items-center gap-[10px] justify-center mb-[10px]'>
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <h3 className="text-lg font-semibold">{user.surname}</h3>
          </div>
          <div className='flex items-center gap-[10px] justify-center mb-[10px]'>
            <p>Age: {user.age}</p>
            <p>{user.gender}</p>
          </div>
          <button
            onClick={() => { setDeleteUserId(user.id); setIsDeleteModalOpen(true); }}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
          >
            <MdDelete/>
          </button>
          <button
            onClick={() => handleEdit(user)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            <FaRegEdit/>
          </button>
        </li>
      ))}
      </ul>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={closeModal}>
          <div className="bg-black p-6 rounded shadow-lg w-96" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                name="name"
                autoComplete='off'
                defaultValue={currentUser.name}
                placeholder="Name"
                className="border border-slate-600 p-2 mb-4 w-full bg-transparent rounded-xl outline-none"
              />
              <input
                type="text"
                name="surname"
                autoComplete='off'
                defaultValue={currentUser.surname}
                placeholder="Surname"
                className="border border-slate-600 p-2 mb-4 w-full bg-transparent rounded-xl outline-none"
              />
              <input
                type="number"
                name="age"
                autoComplete='off'
                defaultValue={currentUser.age}
                placeholder="Age"
                className="border border-slate-600 p-2 mb-4 w-full bg-transparent rounded-xl outline-none"
              />
              <select
              autoComplete='off'
                name="gender"
                defaultValue={currentUser.gender}
                className="border border-slate-600 p-2 mb-4 w-full bg-transparent rounded-xl outline-none"
              >
                <option className='text-black' value="male">Male</option>
                <option className='text-black' value="female">Female</option>
              </select>
              <input
                type="text"
                name="url"
                autoComplete='off'
                defaultValue={currentUser.url}
                placeholder="Image URL"
                className="border border-slate-600 p-2 mb-4 w-full bg-transparent rounded-xl outline-none"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={closeModal}>
          <div className="bg-black p-6 rounded shadow-lg w-96" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Are you sure you want to delete this user?</h2>
            <div className="flex justify-end">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;

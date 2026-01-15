import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { allUsersRoute, logoutRoute } from "../utils/APIRoutes";

const Sidebar = ({ currentUser, changeChat }) => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        try {
          const data = await fetch(`${allUsersRoute}/${currentUser._id}`);
          const users = await data.json();
          setContacts(users);
        } catch (error) {
          console.error("Error fetching contacts:", error);
        }
      }
    }
    fetchData();
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  const handleLogout = () => {
    localStorage.removeItem("chat-app-user");
    navigate("/login");
  }

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#0a0a16] text-white">
      <div className="flex justify-center items-center h-[10%] gap-4 pt-4">
        <h3 className="text-xl font-bold uppercase text-white tracking-widest">ChatApp</h3>
      </div>
      <div className="flex flex-col items-center gap-3 overflow-auto h-[80%] pt-4 w-full">
        {contacts.map((contact, index) => {
          return (
            <div
              key={contact._id}
              className={`flex items-center gap-4 cursor-pointer w-[90%] rounded-lg p-2 transition-all duration-300 ease-in-out ${index === currentSelected ? "bg-[#9186f3]" : "bg-[#ffffff34]"
                }`}
              onClick={() => changeCurrentChat(index, contact)}
            >
              <div className="h-10 w-10">
                <div className="h-full w-full rounded-full bg-purple-500 flex items-center justify-center text-lg font-bold">
                  {contact.avatarImage ? (
                    <img src={contact.avatarImage} alt="" className="h-full w-full rounded-full object-cover" />
                  ) : (
                    contact.name[0].toUpperCase()
                  )}
                </div>
              </div>
              <div className="username">
                <h3 className="text-white text-lg">{contact.name}</h3>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center items-center h-[10%] bg-[#0d0d30]">
        <div className="flex items-center gap-4 px-4">
          <div className="h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center font-bold">
            {currentUser && currentUser.name && currentUser.name[0].toUpperCase()}
          </div>
          <div className="username">
            <h2 className="text-white text-lg">{currentUser && currentUser.name}</h2>
          </div>
          <button onClick={handleLogout} className="bg-red-500 p-2 rounded-md ml-4 text-xs">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
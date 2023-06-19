import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, setSocket } from "../store/userSlice";
import Chat from "./Chat";

const UsersInfo = () => {
  const { socketId,users, loading } = useSelector((state) => state.userReducer);
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();

  let message = (id) => {
    dispatch(getUsers());
    dispatch(setSocket(id));
  };
  return (
    <div
      style={{
        backgroundColor: "lightgray",
        borderRadius: "8px",
        padding: "20px",
        width: 300,
      }}
    >
      {users &&
        users.map((item) => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 0",
            }}
            onClick={() => message(item.socketId)}
          >
            {item.name}
            <span
              style={
                item.socketId
                  ? {
                      display: "block",
                      width: "20px",
                      height: "20px",
                      backgroundColor: "green",
                      borderRadius: "50%",
                    }
                  : {
                      display: "block",
                      width: "20px",
                      height: "20px",
                      backgroundColor: "gray",
                      borderRadius: "50%",
                    }
              }
            ></span>
           
          </div>
        ))}
    </div>
  );
};

export default UsersInfo;

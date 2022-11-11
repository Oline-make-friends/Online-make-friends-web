import React, { useEffect, useState } from "react";
import { Avatar, Link, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AvatarUser = (props) => {
  const navigate = useNavigate();
  const id = props.id;
  const [user, setUser] = useState(props.user);

  const handleGetUser = async () => {
    try {
      if (id !== undefined) {
        const res = await axios.post(
          `http://localhost:8000/user/getUser/` + id
        );
        setUser(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Flex
      alignItems="center"
      my="2"
      onClick={() => {
        navigate(`/user/${id}`, {
          state: {
            user,
          },
        });
      }}
    >
      <Avatar m={[2, 2]} src={user?.avatar_url} h="50px" w="50px" />
      <Text>
        <b>{user?.fullname}</b>
      </Text>
    </Flex>
  );
};

export default AvatarUser;

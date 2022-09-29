import React from "react";
import { Tr, Td, Flex, Avatar, Center, Text } from "@chakra-ui/react";
// import { AiFillSetting } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";

const Noti = (props) => {
  const noti = props.noti;
  var d = new Date(noti?.createdAt);

  var datestring =
    d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " ";
  return (
    <Tr>
      <Td>{datestring}</Td>
      <Td>
        <Flex>
          <Avatar
            m={[2, 2]}
            name="Dan Abrahmov"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8kQL47PtECE3iRRjzyfgXbNcPgFX4txEG6w&usqp=CAU"
          />
          <Center style={{ display: "flex", flexDirection: "column" }}>
            <Text>
              <b>{noti?.user_id?.fullname}</b>
            </Text>
          </Center>
        </Flex>
      </Td>
      <Td>{noti?.title}</Td>
      <Td>{noti?.content}</Td>
      <Td>
        <Flex>
          {/* <AiFillSetting
                        size={40}
                        style={{
                            background: "#28a745",
                            padding: "10px",
                            borderRadius: "5px",
                            margin: "0 10px",
                        }}
                    /> */}
          <RiDeleteBin5Fill
            onClick={() => props.deleteNoti(noti?._id)}
            size={40}
            style={{
              background: "#dc3545",
              padding: "10px",
              borderRadius: "5px",
            }}
          />
        </Flex>
      </Td>
    </Tr>
  );
};

export default Noti;

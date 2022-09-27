import React from "react";
import {
  FormLabel,
  FormControl,
  Input,
  Center,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function SendNoti() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleSendNoti = async () => {
    try {
      

      await axios.post("http://localhost:8000/noti/add",{
        title: title,
        content: content,
        user_id:"63296dd3ab7e2913c0792042"
      });
      window.location.reload();
      toast.success("Send noti success!");
    } catch (error) {
      toast.error("Send noti fail!");
    }
  }
  return (
    <Center>
      <FormControl
        style={{ color: "black" }}
        bg="white"
        m="4"
        p="4"
        borderRadius="20px"
      >
        <FormLabel>Tittle</FormLabel>
        <Input type="text" placeholder="Type tittle" onChange={(e) => setTitle(e.target.value)}
          required />
        <FormLabel>Content</FormLabel>
        <Input type="text" placeholder="Type content" onChange={(e) => setContent(e.target.value)}
          required />
        <Button
          mt={4}
          colorScheme="teal"
          //   isLoading={props.isSubmitting}
          type="submit"
          onClick={handleSendNoti}
        >
          Send Notification
        </Button>
      </FormControl>
    </Center>
  );
}

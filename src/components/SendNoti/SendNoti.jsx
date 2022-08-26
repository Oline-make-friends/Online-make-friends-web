import React from "react";
import {
  FormLabel,
  FormControl,
  Input,
  FormHelperText,
  Center,
  Button,
} from "@chakra-ui/react";

export default function SendNoti() {
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
        <Input type="text" />
        <FormHelperText>Type tittle </FormHelperText>
        <FormLabel>Content</FormLabel>
        <Input type="text" />
        <FormHelperText>Type content </FormHelperText>
        <Button
          mt={4}
          colorScheme="teal"
          //   isLoading={props.isSubmitting}
          type="submit"
        >
          Send Notification
        </Button>
      </FormControl>
    </Center>
  );
}

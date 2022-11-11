import {
  Box,
  Flex,
  Input,
  Text,
  Textarea,
  Grid,
  GridItem,
  Select,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Avatar, Button } from "@mui/material";
import Page from "../components/Page";
import LinkBar from "../components/LinkBar";

const CourseDetail = () => {
  const { state } = useLocation();
  const id = state.course._id;
  const createdBy = state.course.created_by;
  const currentUser = useSelector((state) => state.auth?.login?.currentUser);
  const [course, setCourse] = useState();
  const [quizs, setQuizs] = useState([]);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const navigate = useNavigate();
  const BREADCRUMBS = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Course", href: "/courses" },
  ];

  const handleGetCourse = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/course/get/${id}`);
      toast.success("get course success");
      setCourse(res.data);
      setQuizs(res.data?.quizs?.reverse());
    } catch (error) {
      console.log(error.message);
      toast.error("check connection");
    }
  };
  const deleteCourse = async () => {
    try {
      await axios.get(`http://localhost:8000/course/delete/${id}`);
      toast.success("deleted course");
      navigate("/allCourse");
    } catch (error) {
      console.log(error.message);
      toast.error("check connection");
    }
  };
  const deleteQuiz = async (quizid) => {
    try {
      await axios.get(`http://localhost:8000/quiz/delete/${quizid}`);
      toast.success("deleted that");
      handleGetCourse();
    } catch (error) {
      console.log(error.message);
      toast.error("check connection");
    }
  };

  const addQuiz = async () => {
    try {
      if (
        question === "" ||
        option1 === "" ||
        option2 === "" ||
        option3 === "" ||
        option4 === ""
      ) {
        toast.error("check input");
        return;
      }
      if (answer === "") {
        toast.error("choice answer");
        return;
      }
      const options = [option1, option2, option3, option4];

      await axios.post(`http://localhost:8000/quiz/add`, {
        courseId: id,
        question: question,
        options: options,
        answer: answer,
      });
      toast.success("add success");
      handleGetCourse();
      setQuestion("");
      setOption1("");
      setOption2("");
      setOption3("");
      setOption4("");
    } catch (error) {
      console.log(error.message);
      toast.error("check connection");
    }
  };

  useEffect(() => {
    handleGetCourse();
    // eslint-disable-next-line
  }, []);
  return (
    <Page title="CourseDetail">
      <LinkBar array={BREADCRUMBS}></LinkBar>
      <Box h="90vh" w="100%" py="4">
        <Flex
          w="100%"
          direction="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Button
            onClick={() => {
              deleteCourse();
            }}
            variant="outlined"
            color="error"
          >
            Delete this course
          </Button>

          <Box
            px="2"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            style={{
              width: "100%",
              height: "88vh",
              overflowY: "scroll",
            }}
          >
            {quizs.map((quiz) => {
              return (
                <Flex w="100%" bg="white" p="2" my="4" key={quiz?.id}>
                  <Box
                    w="30%"
                    borderRight="1px"
                    borderColor="gray"
                    p="2"
                    className="question"
                  >
                    {quiz?.question}
                  </Box>
                  <Flex
                    w="70%"
                    h="100%"
                    borderRight="1px"
                    p="2"
                    overflowY="scroll"
                    direction="column"
                  >
                    {quiz?.options.map((option) => {
                      return (
                        <Text color={quiz?.answer === option ? "green" : ""}>
                          {option}
                        </Text>
                      );
                    })}
                    {course?.created_by?._id === currentUser?._id ? (
                      <Button
                        bg="red"
                        onClick={() => {
                          deleteQuiz(quiz?._id);
                        }}
                        variant="outlined"
                        color="error"
                      >
                        Delete this
                      </Button>
                    ) : (
                      <></>
                    )}
                  </Flex>
                </Flex>
              );
            })}
          </Box>
        </Flex>
      </Box>
    </Page>
  );
};

export default CourseDetail;

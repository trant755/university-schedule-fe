import React, { useState, useEffect } from "react";
import { getSubjects, getTeacher } from "../services/api";
import { Button, List, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SubjectItem from "../components/SubjectItem";

const EditSubjectsPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [user, setUser] = useState({});
  const [userRoleDetails, setUserRoleDetails] = useState({});
  const [triger, setTriger] = useState(false);
  const [operationType, setOperationType] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    const fetchData = async () => {
      if (user?.role?.name === "Teacher") {
        const { data: teacher } = await getTeacher(user.id);

        if (teacher) {
          setUserRoleDetails(teacher[0]);
        }
      }
    };

    fetchData();

    setUser(user);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getSubjects({
          populate: "teacher",
          filters: {
            teacher: userRoleDetails.id,
          },
        });

        setSubjects(data);
      } catch (error) {
        message.error("Error fetching schedule");
        console.error("Error fetching schedule:", error);
      }
    };

    fetchData();
  }, [userRoleDetails.id]);

  return (
    <div style={{}}>
      <h1>Редагування Предметів</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => {
            setOperationType("create");
            setModalOpen(true);
          }}
        >
          Додати предмет
        </Button>
      </div>
      <List
        itemLayout="horizontal"
        style={{ margin: "0 auto" }}
        dataSource={subjects}
        renderItem={(subject) => (
          <List.Item>
            <SubjectItem
              userRoleDetails={userRoleDetails}
              subject={subject}
              setTriger={setTriger}
              setOperationType={setOperationType}
              setModalOpen={setModalOpen}
              operationType={operationType}
              modalOpen={modalOpen}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default EditSubjectsPage;

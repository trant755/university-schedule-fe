import React, { useState, useEffect } from "react";
import { Typography, Button, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  deleteSchedule,
  createSchedule,
  updateSchedule,
} from "../services/api";
import ScheduleModal from "./ScheduleModal";

const ScheduleItem = ({
  userRoleDetails,
  date,
  timeSlot,
  schedule,
  isEdit,
  setTriger,
}) => {
  const [operationType, setOperationType] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteSchedule(schedule.id);
      message.success("Заняття успішно видалено");
      setTriger((prev) => !prev);
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  const handleEdit = async () => {
    setOperationType("edit");
    setModalOpen(true);
  };

  const handleCreate = async () => {
    setOperationType("create");
    setModalOpen(true);
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "150px",
        border: "2px solid #f0f0f0",
        borderRadius: "5px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2px solid #f0f0f0",
          padding: "12px 24px",
        }}
      >
        <Typography style={{ fontSize: "14px", fontWeight: "bold" }}>
          {timeSlot.attributes.name}
        </Typography>
        {isEdit && (
          <div
            style={{
              display: "flex",
              gap: "8px",
            }}
          >
            {schedule ? (
              <>
                <Button
                  onClick={handleEdit}
                  type="primary"
                  shape="circle"
                  icon={<EditOutlined />}
                />
                <Button
                  onClick={handleDelete}
                  type="primary"
                  shape="circle"
                  icon={<DeleteOutlined />}
                />
              </>
            ) : (
              <Button
                onClick={handleCreate}
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
              />
            )}
          </div>
        )}
      </div>
      <div
        style={{
          padding: "12px 24px",
          display: "flex",
          height: "100%",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        {schedule ? (
          <>
            <Typography
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#1890ff",
                marginBottom: "8px",
              }}
            >
              {schedule.attributes.name}
            </Typography>
            <Typography
              style={{
                marginLeft: "16px",
                fontSize: "14px",
              }}
            >
              Предмет:{" "}
              <strong>
                {schedule.attributes.subject.data.attributes.name}
              </strong>
            </Typography>
            <Typography
              style={{
                marginLeft: "16px",
                fontSize: "14px",
              }}
            >
              Викладач:{" "}
              <strong>
                {schedule.attributes.teacher.data.attributes.firstName}{" "}
                {schedule.attributes.teacher.data.attributes.lastName}
              </strong>
            </Typography>
          </>
        ) : (
          <Typography
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              color: "#adabab",
            }}
          >
            Пара не назначена
          </Typography>
        )}
      </div>
      <ScheduleModal
        teacherId={userRoleDetails?.id}
        operationType={operationType}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        timeSlot={timeSlot}
        schedule={schedule}
        date={date}
        setTriger={setTriger}
      />
    </div>
  );
};

export default ScheduleItem;

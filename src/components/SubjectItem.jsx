import React, { useState, useEffect } from "react";

import { Typography, Button, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { deleteSubject, createSubject, updateSubject } from "../services/api";
import ScheduleModal from "./ScheduleModal";
import SubjectModal from "./SubjectModal";

const SubjectItem = ({
  userRoleDetails,
  subject,
  setOperationType,
  setModalOpen,
  setTriger,
  modalOpen,
  operationType,
}) => {
  const handleDelete = async () => {
    try {
      await deleteSubject(subject.id);
      message.success("Заняття успішно видалено");
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
        <Typography
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#00000046",
          }}
        >
          Предмет
        </Typography>
        <div
          style={{
            display: "flex",
            gap: "8px",
          }}
        >
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
        </div>
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
        {subject ? (
          <>
            <Typography
              style={{
                fontSize: "16px",

                marginBottom: "8px",
              }}
            >
              Назва: <strong>{subject.attributes.name}</strong>
            </Typography>
            <Typography
              style={{
                fontSize: "14px",
              }}
            >
              Опис: <strong>{subject.attributes.description}</strong>
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
      <SubjectModal
        teacherId={userRoleDetails?.id}
        operationType={operationType}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        subject={subject}
        setTriger={setTriger}
      />
    </div>
  );
};

export default SubjectItem;

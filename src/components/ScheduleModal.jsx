import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Select, message } from "antd";
import {
  createSchedule,
  getSubjects,
  updateSchedule,
  getGroups,
} from "../services/api";
import DebounceSelect from "./DebounceSelect";
import * as dayjs from "dayjs";

const ScheduleModal = ({
  operationType,
  setModalOpen,
  modalOpen,
  schedule,
  timeSlot,
  teacherId,
  date,
  setTriger,
}) => {
  const [form] = Form.useForm();
  const [subjects, setSubjects] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (operationType === "edit" && schedule) {
      form.setFieldsValue({
        name: schedule.attributes.name,
        room: schedule.attributes.room,
        group: [
          {
            label: schedule.attributes.group.data.attributes.name,
            value: schedule.attributes.group.data.id,
          },
        ],
        subject: {
          label: schedule.attributes.subject.data.attributes.name,
          value: schedule.attributes.subject.data.id,
        },
      });
    }
  }, [schedule, operationType, form]);

  const handleCancel = () => {
    setModalOpen(false);
  };

  async function fetchSubjectList(value) {
    const { data } = await getSubjects({
      _q: value,
      where: { teacher: teacherId },
    });

    return data.map(({ attributes, id }) => ({
      label: `${attributes.name}`,
      value: id,
    }));
  }

  async function fetchGroupList(value) {
    const { data } = await getGroups({
      _q: value,
    });

    return data.map(({ attributes, id }) => ({
      label: `${attributes.name}`,
      value: id,
    }));
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      values.time_slot = timeSlot.id;
      values.date = dayjs(date).format("YYYY-MM-DD");
      values.group = groups[0].value;
      values.subject = subjects[0].value;
      values.teacher = teacherId;
      if (operationType === "create") {
        await createSchedule(values);
        message.success("Заняття успішно створено");
      } else {
        await updateSchedule(schedule.id, values);
        message.success("Заняття успішно оновлено");
      }
      setModalOpen(false);
      setTriger((prev) => !prev);
    } catch (error) {
      console.error("Error creating/updating schedule:", error);
    }
  };

  return (
    <Modal
      title={
        operationType === "create" ? "Створити заняття" : "Редагувати заняття"
      }
      open={modalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Відміна
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Зберегти
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="schedule_form">
        <Form.Item
          name="name"
          label="Назва"
          rules={[{ required: true, message: "Введіть назву" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="group"
          label="Група"
          rules={[{ required: true, message: "Виберіть групу" }]}
        >
          <DebounceSelect
            mode="multiple"
            value={groups}
            placeholder="Група"
            fetchOptions={fetchGroupList}
            onChange={(newValue) => {
              setGroups(newValue);
            }}
            style={{ width: "100%" }}
            maxCount={1}
          />
        </Form.Item>
        <Form.Item
          name="subject"
          label="Предмет"
          rules={[{ required: true, message: "Виберіть предмет" }]}
        >
          <DebounceSelect
            mode="multiple"
            value={subjects}
            placeholder="Предмет"
            fetchOptions={fetchSubjectList}
            onChange={(newValue) => {
              setSubjects(newValue);
            }}
            style={{ width: "100%" }}
            maxCount={1}
          />
        </Form.Item>
        <Form.Item
          name="room"
          label="Аудиторія"
          rules={[{ required: true, message: "Введіть аудиторію" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ScheduleModal;

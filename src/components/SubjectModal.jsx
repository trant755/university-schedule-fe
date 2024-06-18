import React, { useEffect } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { createSubject, updateSubject } from "../services/api";

const SubjectModal = ({
  operationType,
  setModalOpen,
  modalOpen,
  subject,
  teacherId,
  setTriger,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (operationType === "edit" && subject) {
      form.setFieldsValue({
        name: subject.attributes.name,
        description: subject.attributes.description,
      });
    }
  }, [form, operationType, subject]);

  const handleCancel = () => {
    form.resetFields();
    setModalOpen(false);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      values.teacher = teacherId;
      if (operationType === "create") {
        await createSubject(values);
        message.success("Предмет успішно створено");
      } else {
        await updateSubject(subject.id, values);
        message.success("Предмет успішно оновлено");
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
        operationType === "create" ? "Створити предмет" : "Редагувати предмет"
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
      <Form form={form} layout="vertical" name="subject_form">
        <Form.Item
          name="name"
          label="Назва"
          rules={[{ required: true, message: "Введіть назву" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Опис"
          rules={[{ required: true, message: "Введіть опис" }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SubjectModal;

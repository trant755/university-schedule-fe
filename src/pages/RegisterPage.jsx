import React, { useState } from "react";
import { Form, Input, Button, message, Steps, Radio, Typography } from "antd";
import { register, registerStudent } from "../services/auth";
import { useNavigate } from "react-router-dom";
import DebounceSelect from "../components/DebounceSelect";
import { getGroups } from "../services/api";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [formRole, setFormRole] = useState("student");
  const [DSValue, setDSValue] = useState([]);

  const navigate = useNavigate();

  const steps = [
    {
      title: "Перший крок",
      content: "First-content",
    },
    {
      title: "Другий крок",
      content: "Second-content",
    },
  ];

  async function fetchUserList(value) {
    const { data } = await getGroups({ _q: value });

    return data.map(({ attributes, id }) => ({
      label: `${attributes.name}`,
      value: id,
    }));
  }

  const handleSubmitFirst = async (values) => {
    setLoading(true);
    const { email, password } = values;

    try {
      await register({ email, password, username: email });
      setStep(1);
    } catch (error) {
      message.error("Реєстрація не вдалася!");
      console.error("Error during registration", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitSecond = async (values) => {
    setLoading(true);
    try {
      await registerStudent(
        values.firstName,
        values.lastName,
        values.group.map((item) => item.value).join(",")
      );
      message.success("Реєстрація пройшла успішно!");
      navigate("/login");
    } catch (error) {
      message.error("Реєстрація не вдалася!");
      console.error("Error during registration", error);
    } finally {
      setLoading(false);
    }
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "0 auto",
        padding: "50px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h1 style={{ textAlign: "center", width: "100%" }}>Реєстрація</h1>
      <Steps current={step} items={items} />
      {step === 0 && (
        <Form onFinish={handleSubmitFirst}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Будь ласка, введіть вашу електронну пошту!",
              },
            ]}
          >
            <Input placeholder="Електронна пошта" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Будь ласка, введіть ваш пароль!" },
            ]}
          >
            <Input.Password placeholder="Пароль" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Далі
            </Button>
          </Form.Item>
        </Form>
      )}
      {step === 1 && (
        <>
          <Radio.Group
            onChange={(e) => setFormRole(e.target.value)}
            value={formRole}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Radio.Button value="student">Студент</Radio.Button>
            <Radio.Button value="teacher">Вчитель</Radio.Button>
          </Radio.Group>
          {formRole === "student" && (
            <Form onFinish={handleSubmitSecond}>
              <Form.Item
                name="firstName"
                rules={[
                  { required: true, message: "Будь ласка, введіть ваше ім'я!" },
                ]}
              >
                <Input placeholder="Ім'я" />
              </Form.Item>
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Будь ласка, введіть ваше прізвище!",
                  },
                ]}
              >
                <Input placeholder="Прізвище" />
              </Form.Item>
              <Form.Item
                name="group"
                rules={[
                  {
                    required: true,
                    message: "Будь ласка, введіть вашу групу!",
                  },
                ]}
                // getValueFromEvent={(e) => e[0].value}
              >
                <DebounceSelect
                  mode="multiple"
                  value={DSValue}
                  placeholder="Група"
                  fetchOptions={fetchUserList}
                  onChange={(newValue) => {
                    setDSValue(newValue);
                  }}
                  style={{
                    width: "100%",
                  }}
                  maxCount={1}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          )}
          {formRole === "teacher" && (
            <Typography
              style={{
                textAlign: "center",
                fontSize: "18px",
              }}
            >
              Для продовження реєстрації вчителя зверніться до адміністратора
            </Typography>
          )}
        </>
      )}
    </div>
  );
};

export default RegisterPage;

import React from "react";
import styles from "./index.module.scss";
import { Form, Input, Button, message } from "antd";
import { useTranslation } from "next-i18next";
import { useLogin } from "./service";
import { useAuth } from "../../../../store/useAuth";

interface IBodyLogin {
  username: string;
}

const Login = () => {
  const { t } = useTranslation();
  const { onLogin } = useAuth();
  const requestLogin = useLogin({
    onSuccess: (r: any) => {
      onLogin({
        token: r?.accessToken,
        refreshToken: r?.refreshToken,
      });
      message.success(t("notification_successfully"));
    },
    onError: (e: any) => {
      console.log("error", e);
      message.success(t("notification_failure"));
    },
  });

  const onFinish = (values: IBodyLogin) => {
    requestLogin.run(values.username);
  };
  return (
    <div className={styles.loginContainer}>
      <div className={styles.form}>
        <p>{t("title_login")}</p>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {t("button_login")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from "react";
import { Typography } from "antd";
import { Button, Modal } from "antd";

import {
  Image,
  Divider,
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  Checkbox,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { signupRequestAction } from "../../reducers/user";
import { ON_CHANGE_EMAILOVERLAP } from "../../reducers/user";
import { ON_CHANGE_NICKNAMEOVERLAP } from "../../reducers/user";
import { ON_CHANGE_PHONEOVERLAP } from "../../reducers/user";

import Router from "next/router";
import { frontUrl } from "../../config/config";
const { Text } = Typography;

const fontStyle = {
  color: "rgba(48, 47, 47, 1)",
  fontSize: "18px",
  fontWeight: "700",
  fontFamily: "sansneo_light",
};

const SignupComponent = () => {
  const dispatch = useDispatch();
  const { signUpDone } = useSelector((state) => state.user);
  var { emailOverLap, nicknameOverLap, phoneOverLap } = useSelector(
    (state) => state.user
  );

  const emailOnChange = (event) => {
    dispatch({ type: ON_CHANGE_EMAILOVERLAP });
  };

  const nicknameOnChange = (event) => {
    dispatch({ type: ON_CHANGE_NICKNAMEOVERLAP });
  };

  const phoneOnChange = (event) => {
    dispatch({ type: ON_CHANGE_PHONEOVERLAP });
  };

  useEffect(() => {
    if (signUpDone) {
      Router.push("/loginpage/login");
    }
  }, [signUpDone, emailOverLap, nicknameOverLap, phoneOverLap]);

  const onFinish = (values) => {
    const data = {
      email: values.email,
      password: values.password,
      nickname: values.nickname,
      phone: values.phonenumber,
      username: values.name,
      birth:
        values.datepicker.$y +
        "-" +
        String(parseInt(values.datepicker.$M) + 1) +
        "-" +
        values.datepicker.$D,
    };

    dispatch(signupRequestAction(data));
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {/* 이메일 */}
        <div>
          {" "}
          {/* 이메일이 중복되지 않고, 이전 이메일과 달라진 겨우 */}
          {!emailOverLap ? (
            <Form.Item
              label={<Text style={fontStyle}>이메일</Text>}
              name="email"
              rules={[
                {
                  type: "email",
                  message: "올바른 이메일을 입력해 주세요.",
                },

                {
                  required: true,
                  message: "이메일을 입력해 주세요!",
                },
              ]}
            >
              <Input
                style={{
                  borderRadius: "19px",
                }}
                placeholder="예) greenyday1234@gmail.com"
              />
            </Form.Item>
          ) : (
            <div>
              <Form.Item
                label={<Text style={fontStyle}>이메일</Text>}
                name="email"
                validateStatus="error"
                help="중복된 이메일입니다."
              >
                <Input
                  style={{ borderRadius: "19px" }}
                  placeholder="예) greenyday1234@gmail.com"
                  onChange={emailOnChange}
                />
              </Form.Item>
            </div>
          )}{" "}
        </div>
        <Form.Item
          label={<Text style={fontStyle}>비밀번호</Text>}
          name="password"
          rules={[
            {
              required: true,
              message: "비밀번호를 입력해 주세요!",
            },
          ]}
        >
          <Input.Password
            style={{ borderRadius: "19px" }}
            placeholder="영문,숫자 조합 8-16자"
          />
        </Form.Item>
        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "비밀번호를 한번 더 입력해주세요!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("비밀번호가 일치하지 않습니다.")
                );
              },
            }),
          ]}
        >
          <Input.Password
            style={{ borderRadius: "19px" }}
            placeholder="비밀번호를 한번 더 입력해 주세요!"
          />
        </Form.Item>
        <Row justify="space-between">
          <Col span={11}>
            {/* 이름 입력 */}
            <Form.Item
              name="name"
              label={<Text style={fontStyle}>이름</Text>}
              rules={[
                {
                  required: true,
                  message: "이름을 입력해 주세요!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                placeholder="예) 홍길동"
                style={{ borderRadius: "19px" }}
              />
            </Form.Item>
          </Col>
          <Col span={11}>
            {/* 닉네임 입력 */}

            <div>
              {!nicknameOverLap ? (
                <Form.Item
                  name="nickname"
                  label={<Text style={fontStyle}>닉네임</Text>}
                  rules={[
                    {
                      required: true,
                      message: "닉네임을 입력해 주세요!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input
                    placeholder="예) 홍길동"
                    style={{ borderRadius: "19px" }}
                  />
                </Form.Item>
              ) : (
                <Form.Item
                  name="nickname"
                  label={<Text style={fontStyle}>닉네임</Text>}
                  validateStatus="error"
                  help="중복된 닉네임입니다."
                >
                  <Input
                    placeholder="예) 홍길동"
                    style={{ borderRadius: "19px" }}
                    onChange={nicknameOnChange}
                  />
                </Form.Item>
              )}
            </div>
          </Col>
        </Row>
        <Row justify="space-between">
          <Col span={11}>
            {/* 생년월일 입력 */}
            <Form.Item
              name="datepicker"
              label={<Text style={fontStyle}>생년월일</Text>}
              rules={[
                {
                  type: "object",
                  required: true,
                  message: "생년월일을 입력해 주세요!",
                },
              ]}
            >
              <DatePicker
                style={{ borderRadius: "19px", width: "100%" }}
                placeholder="0000-00-00"
              />
            </Form.Item>
          </Col>
          <Col span={11}>
            {/* 전화번호 */}
            <div>
              {!phoneOverLap ? (
                <Form.Item
                  name="phonenumber"
                  label={<Text style={fontStyle}>휴대폰 번호</Text>}
                  rules={[
                    {
                      required: true,
                      message: "전화번호를 입력해 주세요!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input
                    placeholder="010********"
                    style={{ borderRadius: "19px" }}
                  />
                </Form.Item>
              ) : (
                <div>
                  {" "}
                  <Form.Item
                    name="phonenumber"
                    label={<Text style={fontStyle}>휴대폰 번호</Text>}
                    validateStatus="error"
                    help="번호를 다시 입력해주세요."
                  >
                    <Input
                      placeholder="010********"
                      style={{ borderRadius: "19px" }}
                      onChange={phoneOnChange}
                    />
                  </Form.Item>
                </div>
              )}
            </div>
          </Col>
        </Row>

        <Row gutter={[3, 20]}>
          <Col span={24}>
            <Row gutter={[10, 10]}></Row>
          </Col>
          <Col span={24}>
            <Divider />
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("이용약관에 동의 해주세요!")),
                },
              ]}
            >
              <Checkbox class="">
                <p class="text-[#404016] text-[15px] ">이용약관 동의(필수)</p>{" "}
              </Checkbox>
            </Form.Item>

            <Form.Item name="agreement2" valuePropName="checked2">
              <Checkbox class="">
                <p class="text-[#404016] text-[15px] ">이용약관 동의(선택)</p>{" "}
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  height: "57px",
                  backgroundColor: "rgba(36, 90, 58, 1)",
                }}
              >
                <Text
                  style={{
                    color: "rgba(255, 255, 255, 1)",
                    fontSize: "24px",
                  }}
                >
                  가입하기
                </Text>
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default SignupComponent;

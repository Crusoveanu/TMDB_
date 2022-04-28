import React, { SyntheticEvent, useState } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { Input, Form, Button } from 'antd'
import { containerStyles } from '../../constants/styles'
import { ERoutes } from '../../entities/enums'

const StyledWrapper = styled.div`
  ${containerStyles};
  width: 100%;
  height: 100%;
  padding: 20px 0 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    width: 100%;
    background-color: #dd9933;
    vertical-align: middle;
    line-height: 14px;
    height: 43px;
    border: none;
    border-radius: 3px;
    span {
      color: white;
      text-transform: uppercase;
    }
  }
  button:hover {
    background-color: #dd9933;
  }
`

const StyledLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border: 1px solid #333333;
  padding: 20px 40px;
  border-radius: 5px;
`

const LoginPage = () => {
    const navigate = useNavigate()
    const [form]: any = Form.useForm()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const test = async (e: SyntheticEvent) => {
        e.preventDefault();
       const response =  await fetch('user/Login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
       });

        //if status is 200, redirect, login ok
        // if bad request, invalid credentials alert
        if (response.status == 200) {
            const data = await response.json();
            //set sessionStorage for login
            setRedirect(true);
        }
        else if (response.status == 400) {
            const data = await response.json();
            alert(data.message);
        }
    }

    if (redirect) {
        navigate(ERoutes.HOME);
        window.location.reload();
    }

    return (
        <StyledWrapper>
            <StyledLoginContainer>
                <Form
                    form={form}
                    onSubmitCapture={test}
                    layout="vertical"
                >
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Introduceți email!' },
                            { type: 'email', message: 'Format incorect!' },
                        ]}
                    >
                        <Input type="text" placeholder="Email-ul dvs." onChange={e => setEmail(e.target.value)}/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Parolă"
                        rules={[{ required: true, message: 'Introduceți parola!' }]}
                    >
                        <Input type="password" placeholder="Parola dvs." onChange={ e => setPassword(e.target.value)}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Intră în cont
                        </Button>
                    </Form.Item>
                </Form>
            </StyledLoginContainer>
        </StyledWrapper>
    )
}

export default LoginPage

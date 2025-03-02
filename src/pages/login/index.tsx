import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import axios from 'axios';
import InputEmail from '../../components/login/inputEmail';
import InputPw from '../../components/login/inputPw';
import LeftUI from '../../components/leftUI';
import Divider from '../../components/divider';
import GoogleAuthButton from '../../components/googleAuthButton';
import AuthButton from '../../components/login/authButton';
import TopLogo from '../../components/topLogo_header';
import NoLoginModal from '../../components/modal/noLoginModal';
import { LoginContext } from '../../components/context/LoginContext';

const PageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
  overflow: hidden;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const LeftSection = styled.div`
  width: 54vw;
  display: flex;
  overflow: hidden;

  @media (max-width: 768px) {
    display: none;
  }
`;

const RightSection = styled.div`
  width: 46vw;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    margin-top: -70px;
  }
`;

const FormContainer = styled.div`
  position: absolute;
  width: 30vw;
  max-width: 420px;
  border-radius: 8px;
  background-color: #ffffff;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Title = styled.h1`
  width: 100%;
  font-size: 29px;
  font-weight: 600;
  letter-spacing: -0.64px;
  margin-bottom: 28px;
  text-align: center;
  color: #181818;
`;

const CheckboxContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 32px;

  label {
    font-size: 13px;
    font-weight: 400;
    letter-spacing: -0.28px;
    color: #181818;
    display: flex;
    align-items: center;
    position: relative;

    input {
      margin-right: 6px;
      cursor: pointer;
      accent-color: #323538;
    }
  }

  a {
    font-size: 13px;
    color: #7c8389;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SignupText = styled.p`
  width: 100%;
  text-align: center;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: -0.36px;
  color: #bbc0c5;
  margin-bottom: 20px;

  a {
    color: #181818;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: -0.36px;
    text-decoration: none;
    margin-left: 4px;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    font-size: 12px;
    a {
      font-size: 12px;
    }
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 15px;
`;

const LoginPage: React.FC = () => {
  const [isClient, setIsClient] = useState(false); // 클라이언트 환경 여부 결정

  const router = useRouter();
  const context = useContext(LoginContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!context) throw new Error('LoginContext를 찾을 수 없습니다.');

  const { email, password, isEmailChecked, isPasswordChecked } = context.state;

  // const { setRemember } = context.actions;

  const isButtonValid = isEmailChecked === true && isPasswordChecked === true;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = async () => {
    try {
      const rememberValue = context.state.remember;

      const response = await axios.post('https://onboarding.p-e.kr/login', {
        email,
        password,
        remember: rememberValue,
      });

      console.log('Response: ', response.data);
      console.log('RememberValue: ', rememberValue);

      // Authorization 헤더에서 토큰 추출
      const token = response.headers['authorization']?.split(' ')[1];
      // const refreshToken = response.headers['refresh-token']; // 리프레시 토큰 저장

      if (response.status === 200 && token) {
        localStorage.setItem('token', token); // 토큰을 로컬 스토리지에 저장
        // localStorage.setItem('refreshToken', refreshToken); // 리프레시 토큰을 로컬 스토리지에 저장

        const userName = response.data.result.name;
        const socialType = response.data.result.socialType;
        // console.log('소셜 타입:', socialType);

        localStorage.setItem('userName', userName);
        localStorage.setItem('socialType', socialType); // 마이페이지에 전달

        context.actions.setIsLoggedIn(true); // 로그인 시
        router.push('/'); // 홈 페이지로 이동
      } else {
        console.error('로그인 응답에 Authorization 헤더가 없습니다.');
        setIsModalOpen(true);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log('Error:', err.response?.data || err.message);
      } else if (err instanceof Error) {
        console.log('Error:', err.message);
      } else {
        console.log(err);
      }
      setIsModalOpen(true); // 로그인 실패 시 모달 띄우기
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <>
      <PageContainer>
        <LeftSection>
          <TopLogo />
          <LeftUI />
        </LeftSection>
        <RightSection>
          <FormContainer>
            <Title>로그인</Title>
            <InputEmail />
            <InputPw />
            <CheckboxContainer>
              <label>
                <input
                  type="checkbox"
                  checked={context.state.remember}
                  onChange={(e) =>
                    context.actions.setRemember(e.target.checked)
                  }
                />
                로그인 유지
              </label>
            </CheckboxContainer>
            <FormGroup>
              <AuthButton
                disabled={!isButtonValid}
                onClick={handleLogin}
                text="로그인"
              />
              <Divider />
              <GoogleAuthButton text="Google 계정으로 로그인" />
              <SignupText>
                온보딩이 처음이신가요? <a href="/register">회원가입</a>
              </SignupText>
            </FormGroup>
          </FormContainer>
        </RightSection>
      </PageContainer>

      {isModalOpen && <NoLoginModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default LoginPage;

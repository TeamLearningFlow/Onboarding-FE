import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

interface LearnModalProps {
  onClose: () => void;
  episodeId: number;
  onRetakeClass: () => void;
}

const LearnModal: React.FC<LearnModalProps> = ({
  onClose,
  episodeId,
  onRetakeClass,
}) => {
  // const [isClicked, setIsClicked] = useState(false);
  const [serverIsCompleted, setServerIsCompleted] = useState(false);
  const [serverProgress, setServerProgress] = useState(0);

  // useEffect(() => {
  //   const getServerProgress = async () => {
  //     try {
  //       const token = localStorage.getItem('token');

  //       const response = await axios.get(
  //         `https://onboarding.p-e.kr/resources/${episodeId}/blog`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         },
  //       );

  //       console.log('응답 상태 코드: ', response.status);

  //       if (response.status === 200) {
  //         console.log(
  //           'getServerProgress(LearnModal): ',
  //           response.data.result.progress,
  //         );
  //         console.log(
  //           'getServerIsCompleted(LearnModal): ',
  //           response.data.result.isCompleted,
  //         );
  //         setServerProgress(response.data.result.progress);
  //         setServerIsCompleted(response.data.result.isCompleted);
  //       }
  //     } catch (error) {
  //       console.error('에러 발생: ', error);
  //     }
  //   };
  //   getServerProgress();
  //   // }, [episodeId, serverProgress]);
  // }, [episodeId]);

  // const ReTakeClass = async () => {
  //   // setIsClicked(true);
  //   // 진도율을 0으로 업데이트 (API 호출 없이 localStorage와 부모 콜백으로 처리)
  //   localStorage.setItem(`progress-${episodeId}`, '0');

  //   try {
  //     const token = localStorage.getItem('token');
  //     const headers = token
  //       ? {
  //           Authorization: `Bearer ${token}`,
  //           'Content-Type': 'application/json',
  //         }
  //       : {};

  //     const response = await axios.post(
  //       `https://onboarding.p-e.kr/resources/${episodeId}/update-complete`,
  //       { progress: 0, isCompleted: false }, // 진도율 0으로 설정
  //       { headers },
  //     );

  //     if (response.status === 200) {
  //       console.log('학습 상태 초기화 성공:', response.data);
  //       setServerProgress(0);
  //       setServerIsCompleted(false);
  //       onRetakeClass();
  //       onClose();
  //     }
  //   } catch (error) {
  //     console.error('학습 상태 초기화 실패:', error);
  //   }

  //   // 부모에서 진도율 0 업데이트 및 기타 상태 초기화 로직 실행
  //   onRetakeClass();
  //   onClose();
  //   // setIsClicked(false);
  // };
  const getServerProgress = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `https://onboarding.p-e.kr/resources/${episodeId}/blog`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('응답 상태 코드: ', response.status);

      if (response.status === 200) {
        setServerProgress(response.data.result.progress);
        setServerIsCompleted(response.data.result.isCompleted);
      }
    } catch (error) {
      console.error('에러 발생: ', error);
    }
  };

  useEffect(() => {
    getServerProgress();
  }, [episodeId]);

  const ReTakeClass = async () => {
    // 진도율을 0으로 업데이트 (localStorage와 부모 콜백으로 처리)
    localStorage.setItem(`progress-${episodeId}`, '0');
    setServerProgress(0); // 진도율 초기화

    try {
      const token = localStorage.getItem('token');
      const headers = token
        ? {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        : {};

      const response = await axios.post(
        `https://onboarding.p-e.kr/resources/${episodeId}/update-complete`,
        { progress: 0, isCompleted: false }, // 진도율 0으로 설정
        { headers },
      );

      if (response.status === 200) {
        console.log('학습 상태 초기화 성공:', response.data);
        // 서버 상태가 갱신되면 getServerProgress를 다시 호출하여 최신 상태를 반영
        getServerProgress();
        onRetakeClass();
        onClose();
      }
    } catch (error) {
      console.error('학습 상태 초기화 실패:', error);
    }
  };

  // 스크롤 감지
  const handleScroll = () => {
    const progress =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;
    setServerProgress(progress); // 진행 상태를 스크롤에 맞춰 갱신
    localStorage.setItem(`progress-${episodeId}`, `${progress}`);
  };

  useEffect(() => {
    // 스크롤 이벤트 등록
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <ModalWrapper>
        <ModalBox>
          <Title>다시 학습할까요?</Title>
          <Description>
            {`다시 학습을 시작하면 학습률이 초기화돼요.\n이전에 학습한 내역은 사라지니 신중히 선택해주세요.`}
          </Description>
          <Button>
            <BackButton onClick={ReTakeClass}>다시 학습</BackButton>
            <ForwardButton onClick={onClose}>학습 완료</ForwardButton>
          </Button>
        </ModalBox>
      </ModalWrapper>
    </>
  );
};

export default LearnModal;

const ModalWrapper = styled.div`
  white-space: nowrap;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const ModalBox = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 34px 55px 30px 55px;
  flex-direction: column;
  height: 250px;

  border-radius: 16px;
  background-color: #fff;

  @media (max-width: 850px) {
    padding: 25px 40px 15px 40px;
    height: 200px;
  }

  @media (max-width: 560px) {
    padding: 20px 30px 20px 30px;
    height: 145px;
  }
`;

const Title = styled.div`
  color: #323538;
  text-align: center;

  font-size: 30px;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin-top: 2px;
  margin-bottom: 15px;

  @media (max-width: 850px) {
    font-size: 25px;
  }

  @media (max-width: 560px) {
    font-size: 18px;
    margin-bottom: 7px;
  }
`;

const Description = styled.div`
  white-space: pre-line;
  color: #64696e;
  text-align: center;

  font-size: 18.5px;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: -0.4px;
  margin-bottom: 15px;

  @media (max-width: 850px) {
    font-size: 15px;
    line-height: 22px;
  }

  @media (max-width: 560px) {
    font-size: 10px;
    line-height: 15px;
  }
`;
const Button = styled.div`
  display: flex;
  flex-direction: row;
  width: 228px;

  position: absolute;
  right: 0;
  bottom: 0;
  margin-right: 36px;
  margin-bottom: 36px;

  align-items: center;

  @media (max-width: 850px) {
    margin: 40px -20px 28px 20px;
  }

  @media (max-width: 560px) {
    margin-right: -70px;
    margin-bottom: 25px;
  }
`;

const BackButton = styled.span`
  display: flex;
  padding: 6px 16px;
  width: 109px;
  height: 39px;
  justify-content: center;
  align-items: center;
  margin-right: 10px;

  font-size: 15px;

  border-radius: 10px;
  background-color: rgba(118, 118, 128, 0.12);
  color: #1f1f1f;

  cursor: pointer;

  @media (max-width: 850px) {
    font-size: 12px;
    width: 80px;
    height: 30px;
  }

  @media (max-width: 560px) {
    font-size: 9px;
    width: 60px;
    height: 20px;
  }
`;

const ForwardButton = styled.span`
  display: flex;
  padding: 6px 16px;
  width: 109px;
  height: 39px;
  justify-content: center;
  align-items: center;

  font-size; 15px;

  border-radius: 10px;
  background-color: #5e52ff;
  color: #fff;

  cursor: pointer;

  @media (max-width: 850px) {
    font-size: 12px;
    width: 80px;
    height: 30px;
  }

  @media (max-width: 560px) {
    font-size: 9px;
    width: 60px;
    height: 20px;
  }
`;

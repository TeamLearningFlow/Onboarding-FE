import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Image from 'next/image';
import Title from '/public/homeTitle.svg';
import LogoGraphic from '/public/logoMark.svg';
import Airplane from '/public/homeAirplane.svg';
import Window from '/public/window.svg';
import Search from '/public/searchicon.svg';

const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 1020px;
  background-color: #fff;
  position: relative;
  overflow-x: hidden;

  @media (max-width: 1024px) {
    height: 900px;
  }

  @media (max-width: 768px) {
    height: 800px;
  }

  @media (max-width: 480px) {
    height: 700px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  max-width: 988px;
  z-index: 1;
  margin-bottom: 60px;
  margin-top: -250px;

  img {
    width: 90%;
    height: auto;
  }

  @media (max-width: 1024px) {
    max-width: 750px;
  }

  @media (max-width: 768px) {
    max-width: 600px;
    margin-bottom: 50px;
  }

  @media (max-width: 480px) {
    max-width: 400px;
    margin-bottom: 25px;
    margin-top: -220px;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 1.5px 2px 8px 0px rgba(0, 0, 0, 0.1);
  padding: 14px 20px;
  width: 65%;
  height: 65px;
  cursor: pointer;
  z-index: 5;
  margin-bottom: 50px;

  @media (max-width: 1024px) {
    height: 60px;
  }

  @media (max-width: 768px) {
    height: 50px;
    margin-bottom: 60px;
  }

  @media (max-width: 480px) {
    height: 46px;
    margin-bottom: 60px;
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: none;
  font-size: 17px;
  font-weight: 500;
  line-height: 150%; /* 29.55px */
  letter-spacing: -0.394px;
  text-overflow: ellipsis;
  color: #1f1f1f;

  &::placeholder {
    color: #afb8c1;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 40px;
    height: 40px;

    @media (max-width: 768px) {
      width: 30px;
      height: 30px;
    }

    @media (max-width: 480px) {
      width: 25px;
      height: 25px;
    }
  }
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 1020px;
  top: 0;
  left: 0;
  background-color: transparent;

  @media (max-width: 1024px) {
    height: 900px;
  }

  @media (max-width: 768px) {
    height: 800px;
  }

  @media (max-width: 480px) {
    height: 700px;
  }
`;

const AirplaneWrapper = styled.div`
  position: absolute;
  top: 10%;
  left: -8%;
  width: 500px;
  height: 400px;

  animation: airplaneMove 3s ease-in-out infinite;

  @keyframes airplaneMove {
    0% {
      transform: translate(0px, 0px);
    }
    100% {
      transform: translate(200px, -200px); /* 오른쪽 위로 이동 */
    }
  }

  img {
    width: 100%;
    height: auto;
  }

  @media (max-width: 1024px) {
    width: 400px;
    height: 400px;
    top: 10%;
    left: -12%;
  }

  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
    top: 18%;
    left: -12%;
  }

  @media (max-width: 480px) {
    width: 250px;
    height: 250px;
    top: 20%;
    left: -16%;

    @keyframes airplaneMove {
      0% {
        transform: translate(0px, 0px);
      }
      100% {
        transform: translate(100px, -200px);
      }
    }
  }
`;

const GasEffect = styled.div`
  position: absolute;
  bottom: -13%;
  left: -10%;
  width: 327.53px;
  height: 55.779px;
  background: #ebeaff;
  filter: blur(34.4px);
  border-radius: 327.53px;
  opacity: 0.8;
  transform: rotate(-50deg);

  animation: gasFlow 1.5s ease-out infinite alternate;

  @keyframes gasFlow {
    0% {
      transform: rotate(-47.016deg) scale(0.9);
      opacity: 0.9;
    }
    100% {
      transform: rotate(-47.016deg) scale(1.3);
      opacity: 0.5;
    }
  }

  @media (max-width: 1024px) {
    width: 250px;
    height: 40px;
  }

  @media (max-width: 768px) {
    width: 230px;
    height: 50px;
    bottom: -10%;
    left: -33%;
  }

  @media (max-width: 480px) {
    width: 180px;
    height: 30px;
    bottom: -5%;
    left: -30%;
  }
`;

const WindowWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 2%;
  // flex-shrink: 0;

  width: 400px;
  height: 500px;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    max-width: 400px;
    max-height: 500px;

    @media (max-width: 768px) {
      max-width: 320px;
      max-height: 400px;
      left: -5%;
    }

    @media (max-width: 480px) {
      max-width: 280px;
      max-height: 300px;
      left: -4%;
      top: 30%;
    }
  }
`;

const WindowImage = styled(Image)`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const WindowInVideo = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 3%;
  left: -1%;
  border-radius: 180px;
  clip-path: inset(0% 20% 0% 25% round 180px);
  z-index: 1;
  object-fit: contain;
  transform: rotate(-25deg);

  @media (max-width: 768px) {
    width: 80%;
    height: 80%;
    top: 13%;
    left: -7%;
    clip-path: inset(0% 20% 0% 28% round 180px);
  }

  @media (max-width: 470px) {
    position: relative;
    width: 70%;
    height: 70%;
    margin-left: -30%;
    clip-path: inset(0% 18% 0% 33% round 180px);
  }
`;

const LogoMarkWrapper = styled.div`
  position: absolute;
  top: 32%;
  right: -2%;
  // transform: rotate(0deg);
  // flex-shrink: 0;

  img {
    width: 530.994px;
    height: 465.077px;

    @media (max-width: 1024px) {
      width: 500px;
      height: 400px;
    }

    @media (max-width: 768px) {
      width: 380px;
      height: 280px;
    }

    @media (max-width: 480px) {
      width: 300px;
      height: 200px;
    }
  }

  @media (max-width: 1024px) {
    right: -6%;
  }

  @media (max-width: 768px) {
    right: -9%;
    top: 33%;
  }

  @media (max-width: 480px) {
    right: -12%;
  }
`;

const LogoGraphicImg = styled(Image)`
  // width: 35vw;
  height: auto;
  animation: floatUpDown 1.5s ease-in-out infinite alternate;

  @keyframes floatUpDown {
    0% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(-8px);
    }
  }
`;

const ShadowWrapper = styled.div`
  position: absolute;
  bottom: 18%;
  right: -5%;
  width: 28vw;
  height: 4vh;
  background: rgba(172, 172, 172, 0.3);
  filter: blur(35px);
  border-radius: 402.5px;
  z-index: 0;

  animation: shadowGlow 1.5s ease-in-out infinite alternate;

  @keyframes shadowGlow {
    0% {
      background: rgba(172, 172, 172, 0.3);
      filter: blur(25px) brightness(0.9);
    }
    100% {
      background: rgba(172, 172, 172, 0.3);
      filter: blur(40px) brightness(1.2);
    }
  }

  @media (max-width: 768px) {
    bottom: 25%;
  }

  @media (max-width: 480px) {
    bottom: 35%;
  }
`;

const WindowShadow = styled.div`
  position: absolute;
  bottom: 6%;
  left: 15%;
  width: 23vw;
  height: 1vh;
  background: rgba(160, 160, 160, 0.7);
  filter: blur(38px);
  border-radius: 406.111px;

  @media (max-width: 768px) {
    bottom: 8%;
    left: 20%;
  }

  @media (max-width: 480px) {
    bottom: 5%;
    left: 30%;
  }
`;

const HomeTop: React.FC = () => {
  const router = useRouter();

  return (
    <TopWrapper>
      <TitleWrapper>
        <Image src={Title} alt="title" />
      </TitleWrapper>

      <SearchWrapper onClick={() => router.push('/search')}>
        <Input type="text" placeholder="찾고 싶은 컬렉션을 검색해보세요." />
        <SearchIcon>
          <Image src={Search} alt="searchicon" width={40} height={40} />
        </SearchIcon>
      </SearchWrapper>

      <Background>
        <AirplaneWrapper>
          <GasEffect />
          <Image src={Airplane} alt="airplane" />
        </AirplaneWrapper>
        <WindowWrapper>
          <WindowInVideo autoPlay loop muted playsInline>
            <source src="/video.mp4" type="video/mp4" />
          </WindowInVideo>
          <WindowImage
            src={Window}
            alt="window"
            width={466.39}
            height={618.061}
          />
        </WindowWrapper>
        <WindowShadow />
        <LogoMarkWrapper>
          <LogoGraphicImg
            src={LogoGraphic}
            alt="logo"
            width={530.994}
            height={465.077}
          />
        </LogoMarkWrapper>
        <ShadowWrapper />
      </Background>
    </TopWrapper>
  );
};

export default HomeTop;

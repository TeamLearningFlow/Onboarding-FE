import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import ChevronDown from '/public/chevronDown.svg';
import ChevronDownG from '/public/chevronDown_G.svg';
import { useRouter } from 'next/router';
import { difficultyOptions } from './filterOptions';

// filters.tsx에 전달
type DropdownProps = {
  onTagChange: (tags: string[]) => void;
  selectedTags: string[];
};

const DropdownContainer = styled.div<{ hasTags: boolean }>`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button<{ isOpen: boolean; hasTags: boolean }>`
  background: #ffffff;
  border: ${(props) =>
    props.hasTags || props.isOpen ? '1px solid #5E52FF' : '1px solid #dde0e4'};
  border-radius: 6px;
  height: 33px;
  width: 90px;
  font-size: 13px;
  font-weight: 500;
  line-height: 21px; /* 150% */
  letter-spacing: -0.28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: ${(props) => (props.hasTags || props.isOpen ? '#1f1f1f' : '#64696e')};

  &:focus {
    outline: none;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  margin-top: 4px;
  background: #ffffff;
  border: 1px solid #dde0e4;
  border-radius: 8px;
  padding: 12px;
  list-style: none;
  width: 158px;
  z-index: 100;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 150% */
  letter-spacing: -0.32px;
`;

const DropdownItem = styled.li`
  padding: 7px 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
    border-radius: 8px;
  }

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: -1px;
  }
`;

const Checkbox = styled.input`
  accent-color: #5e52ff;
  margin-top: -24px;
`;

const LevelButton: React.FC<DropdownProps & { selectedTags: string[] }> = ({
  onTagChange,
  selectedTags,
}) => {
  const router = useRouter();
  const { query } = router;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOption = (label: string) => {
    const updatedOptions = selectedTags.includes(label)
      ? selectedTags.filter((tag) => tag !== label)
      : [...selectedTags, label];
    onTagChange(updatedOptions); // 부모 상태 업데이트

    const checkedOptionIds = updatedOptions
      .map((label) => {
        const foundOption = difficultyOptions.find(
          (option) => option.label === label,
        );
        return foundOption ? foundOption.id : undefined;
      })
      .filter((id): id is number => id !== null);

    pushQuery(checkedOptionIds);
  };

  const pushQuery = (queryValues: number[]) => {
    router.push({
      pathname: '/search',
      query: {
        ...query,
        difficulties:
          queryValues?.length > 0 ? queryValues?.join(',') : undefined,
      },
    });
  };

  // 외부 클릭 시 드롭다운 클로즈
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <DropdownContainer hasTags={selectedTags.length > 0} ref={dropdownRef}>
      <DropdownButton
        isOpen={isOpen}
        hasTags={selectedTags.length > 0}
        onClick={() => setIsOpen(!isOpen)}
      >
        학습 수준
        <Image src={isOpen ? ChevronDown : ChevronDownG} alt="chevrondown" />
      </DropdownButton>
      {isOpen && (
        <DropdownMenu>
          {difficultyOptions.map((option, index) => (
            <DropdownItem key={index}>
              <Checkbox
                type="checkbox"
                checked={selectedTags.includes(option.label)}
                onChange={() => toggleOption(option.label)}
              />
              <div>
                <div>{option.label}</div>
                <div style={{ fontSize: '12px', color: '#959CA4' }}>
                  {option.description}
                </div>
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default LevelButton;

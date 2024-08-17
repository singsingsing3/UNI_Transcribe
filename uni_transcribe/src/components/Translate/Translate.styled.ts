import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

export const Sidebar = styled.div`
  width: 20%;
  border-right: 1px solid #ccc;
  padding: 10px;
  height: 650px;
`;

export const MainContent = styled.div`
  width: 80%;
  display: flex;
  height: 650px;
`;

export const PeopleText = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  font-family: Abhaya Libre;
  font-size: 18px;
  font-weight: 700;
  line-height: 37.75px;
  text-align: center;
`;
export const HeadText = styled.div`
  padding: 10px;
  border-bottom: 3px solid black; //진한 검은색
  font-family: Abhaya Libre;
  font-size: 25px;
  font-weight: 700;
  line-height: 37.75px;
  text-align: center;
`;
export const Section = styled.div`
  display: flex;

  flex-direction: column; /* 자식 요소들을 수직으로 배치 */
  align-items: flex-start; /* 자식 요소들을 왼쪽 정렬 */
  margin-bottom: 20px; /* 각 섹션 간의 간격 설정 */

  align-items: center;
  flex: 1;

  flex-direction: column; /* 자식 요소들을 수직으로 배치 */

  border-right: 1px solid #ccc;
  padding: 20px;
  &:last-child {
    border-right: none;
  }
`;
export const Note = styled.div`
  font-family: Abhaya Libre;
  font-size: 32px;
  font-weight: 700;
  line-height: 37.75px;
  text-align: center;
  margin-bottom: 8px; /* Note와 TextBox 간의 간격 설정 */
`;
export const LectureBox = styled.div`
  font-weight: 700;
  margin-left: 450px;
  width: 550px;
  height: 500px;
  background: #d9d9d9; /* 회색 배경 색상 */
  border: 1px solid #ccc; /* 선택 사항: 박스의 경계선 추가 */
  border-radius: 4px; /* 선택 사항: 모서리 둥글기 */
  position: absolute; /* top과 left 속성을 적용하기 위해 position을 absolute로 설정 */
  top: 133px;
  left: 37px;
  display: flex;

  border-radius: 10px;
  opacity: 0.8; /* 투명도를 1로 설정하여 박스가 보이도록 함 */
  color: black; /* 텍스트 색상 선택 사항 */
  font-size: 16px; /* 텍스트 크기 선택 사항 */
  padding: 20px; /* 선택 사항: 내부 여백 추가 */
`;
export const TranslateBox = styled.div`
  font-weight: 700;
  margin-left: 1200px;
  width: 550px;
  height: 500px;
  background: #d9d9d9; /* 회색 배경 색상 */
  border: 1px solid #ccc; /* 선택 사항: 박스의 경계선 추가 */
  border-radius: 4px; /* 선택 사항: 모서리 둥글기 */
  position: absolute; /* top과 left 속성을 적용하기 위해 position을 absolute로 설정 */
  top: 133px;
  left: 37px;
  display: flex;

  border-radius: 10px;

  opacity: 0.8; /* 투명도를 1로 설정하여 박스가 보이도록 함 */
  color: black; /* 텍스트 색상 선택 사항 */
  font-size: 16px; /* 텍스트 크기 선택 사항 */
  padding: 20px; /* 선택 사항: 내부 여백 추가 */
`;
export const Border = styled.div`
  border: 0.1rem solid #000;
  margin-left: 400px;
  margin-bottom: 100px;
  margin-top: -150px;
  width: 1400px; //수정해야함
  height: 0;
  transform: rotate(0.066deg);
  flex-shrink: 0;
`;
export const RecordButton = styled.button`
  width: 202px;
  height: 46px;
  top: 677px;
  left: 11px;
  gap: 0px;
  border-radius: 15px 15px 15px 15px;
  /* background: #ff7a00; */
  margin-left: 400px;
  background: #ff7a0091;
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: -70px;
`;
export const ButtonText = styled.div`
  font-family: Calibri;
  font-size: 24px;
  font-weight: 400;
  line-height: 29.3px;
  text-align: center;
  color: #ffffff;
`;

export const SummaryButton = styled.button`
  width: 202px;
  height: 46px;
  top: 677px;
  left: 11px;
  gap: 0px;
  border-radius: 15px 15px 15px 15px;
  background: #007aff;
  margin-right: 120px;
`;
export const InputTest = styled.textarea`
  width: 200px;
  height: 50px;
  margin-left: 200px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 3px solid #959a9f;
  background: #fff;
  resize: none;
  font-size: 2rem;
`;
export const TextExtractButton = styled.button`
  width: 100px;
  height: 30px;
  margin-left: 650px;

  margin-top: -50px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 3px solid #959a9f;
  background: #fff;
  resize: none;
  font-size: 15px;
`;
export const SubmitButton = styled.button`
  width: 100px;
  height: 30px;
  margin-left: 750px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 3px solid #959a9f;
  background: #fff;
  resize: none;
  font-size: 15px;
`;
export const LanguageSelect = styled.select`
  margin-left: 400px;
  margin-top: 600px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;

  &:focus {
    border-color: #80bdff;
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;
export const RecordText = styled.span`
  margin-left: -900px;
  margin-top: 13px;
  font-weight: bold;

  font-size: 16px;
`;

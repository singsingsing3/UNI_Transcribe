import React, { useState, useCallback, useEffect } from "react";

import Link from "next/link";
import {
  Container,
  Sidebar,
  MainContent,
  Section,
  Note,
  PeopleText,
  HeadText,
  LectureBox,
  TranslateBox,
  Border,
  RecordButton,
  ButtonText,
  ButtonContainer,
  SummaryButton,
  InputTest,
  SubmitButton,
  LanguageSelect,
  RecordText,
  TextExtractButton,
} from "./Translate.styled";

const APIKEY = "ENTER_YOUR_API";

const transcribeAudio = async (audioFile: string | Blob) => {
  const formData = new FormData();
  formData.append("file", audioFile);

  try {
    const response = await fetch("http://127.0.0.1:5000/transcribe", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    return result.text; // Whisper의 변환 결과
  } catch (error) {
    console.error("파일 POST ERROR: ", error);
    return "파일 POST ERROR";
  }
};

export function Translate() {
  const [leng, setLeng] = useState("English");
  const [text, setText] = useState("");
  const [translateText, setTranslateText] = useState("번역된 내용");
  const [audioFile, setAudioFile] = useState<File | null>(null); // 음성 파일 상태 추가

  const translateTextWithGPT = async (text: string, leng: string) => {
    const messages = [
      { role: "system", content: `Translate the following text in ${leng}` },
      { role: "user", content: `${text}` },
    ];

    const gptInput = {
      model: "gpt-4o-mini",
      temperature: 0.5,
      messages: messages,
    };

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${APIKEY}`,
          },
          body: JSON.stringify(gptInput),
        }
      );

      // JSON 응답을 파싱
      const resultJSON = await response.json();

      // JSON 응답에서 텍스트 내용 추출
      setTranslateText(resultJSON.choices[0].message.content);

      // 텍스트 형식으로 반환
    } catch (error) {
      console.error("번역하는 중 에러!: ", error);
      return "번역하는 중 에러!";
    }
  };

  const onText = useCallback(async () => {
    if (audioFile) {
      const transcribedText = await transcribeAudio(audioFile);
      console.log("플라스크 통해 넘어온 텍스트: ", transcribedText);
      const messages = [
        {
          role: "system",
          content: `Examine the typos and correct the following text appropriately if not jsut show the text`,
        },
        { role: "user", content: `${transcribedText}` },
      ];

      const gptInput = {
        model: "gpt-4o-mini",
        temperature: 0.5,
        messages: messages,
      };

      try {
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${APIKEY}`,
            },
            body: JSON.stringify(gptInput),
          }
        );

        // JSON 응답을 파싱
        const resultJSON = await response.json();

        // JSON 응답에서 텍스트 내용 추출
        setText(resultJSON.choices[0].message.content);

        // 텍스트 형식으로 반환
      } catch (error) {
        console.error("번역하는 중 에러!: ", error);
        return "번역하는 중 에러!";
      }
    } else {
      console.log("파일이 없습니다.");
    }
  }, [audioFile, setText]);

  const onTranslate = useCallback(async () => {
    // GPT-4 API를 호출하여 번역
    translateTextWithGPT(text, leng);
    console.log("원본텍스트 텍스트: ", text);
    console.log("번역된 텍스트: ", translateText);
  }, [text, leng, setTranslateText]);

  return (
    <div>
      <Container>
        <Sidebar>
          <HeadText>Connected People</HeadText>
          <PeopleText>Professor</PeopleText>
          <PeopleText>Student 1</PeopleText>
          <PeopleText>Student 2</PeopleText>
          <PeopleText>Student 3</PeopleText>
          <PeopleText>Student 4</PeopleText>
        </Sidebar>
        <MainContent>
          <Section>
            <Note>lecture notes</Note>
            <LectureBox>{text}</LectureBox>
          </Section>

          <Section>
            <Note>translated</Note>
            <TranslateBox>{translateText}</TranslateBox>
            <LanguageSelect
              value={leng}
              onChange={(e) => {
                setLeng(e.target.value);
              }}
            >
              <option value="English">English</option>
              <option value="Japanese">Japanese</option>
              <option value="Chinese">Chinese</option>
              <option value="Arabic">Arabic</option>
              <option value="Spanish">Spanish</option>
              <option value="Korean">Korean</option>
              {/* 추가할 다른 언어가 있다면 이곳에 작성 */}
            </LanguageSelect>
          </Section>
        </MainContent>
      </Container>

      <Border />
      <ButtonContainer>
        <RecordButton>
          <ButtonText>녹음 중단</ButtonText>
        </RecordButton>
        <RecordText>30 : 25</RecordText>

        <SummaryButton>
          <ButtonText>
            <Link
              href={{
                pathname: "../SummaryPage",
                query: { leng, translateText },
              }}
            >
              실시간 요약
            </Link>
          </ButtonText>
        </SummaryButton>
      </ButtonContainer>
      <TextExtractButton onClick={onText}>텍스트 추출</TextExtractButton>
      <SubmitButton onClick={onTranslate}>번역</SubmitButton>
      {/* 오디오 파일 업로드 input 추가 */}
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => {
          const file = e.target.files?.[0]; // Optional chaining을 사용
          if (file) {
            // 파일이 존재하는 경우에만 상태 업데이트
            setAudioFile(file);
            console.log("파일 업로드 성공: ", file);
            console.log("오디오 파일: ", audioFile);
          }
        }}
      />
    </div>
  );
}

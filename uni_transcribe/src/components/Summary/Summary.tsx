import React, { useCallback, useState } from "react";
import Link from "next/link";

import {
  Container,
  Sidebar,
  MainContent,
  Section,
  PeopleText,
  HeadText,
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
  TranslateNote,
  SummaryNote,
  SummaryBox,
  TopText,
  TopTextt,
  SearchButton,
  SearchBox,
} from "./Symmary.styled";
const APIKEY = "ENTER_YOUR_API";
interface SummaryProps {
  leng: string | string[]; // 쿼리 파라미터는 string 배열일 수 있으므로 string[]로 설정
  translateText: string | string[];
}

export function Summary({ leng, translateText }: SummaryProps) {
  const [summaryText, setSummaryText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [text, setText] = useState("");

  const summaryTextWithGPT = async (
    translateText: string | string[],
    leng: string | string[]
  ) => {
    const messages = [
      { role: "system", content: `Summary the following text in ${leng}` },
      { role: "user", content: `${translateText}` },
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
      setSummaryText(resultJSON.choices[0].message.content);

      // 텍스트 형식으로 반환
    } catch (error) {
      console.error("번역하는 중 에러!: ", error);
      return "번역하는 중 에러!";
    }
  };
  const searchTextWithGPT = async (text: string, leng: string | string[]) => {
    console.log("gpt 정보서칭 호출");
    const messages = [
      {
        role: "system",
        content: `Explain the following text in ${leng} less than10 sentences`,
      },
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
      setSearchText(resultJSON.choices[0].message.content);
      console.log(resultJSON.choices[0].message.content);

      // 텍스트 형식으로 반환
    } catch (error) {
      console.error("번역하는 중 에러!: ", error);
      return "번역하는 중 에러!";
    }
  };

  const onSummary = useCallback(async () => {
    // GPT-4 API를 호출하여 요약
    summaryTextWithGPT(translateText, leng);
  }, []);

  const onSearch = useCallback(async () => {
    // GPT-4 API를 호출하여 정보찾기
    searchTextWithGPT(text, leng);
  }, [text]);

  return (
    <div>
      <Container>
        <Sidebar>
          <Section>
            <TranslateNote>Translated</TranslateNote>
            <TranslateBox>{translateText}</TranslateBox>
          </Section>
        </Sidebar>
        <MainContent>
          <Section>
            <SummaryNote>Summary</SummaryNote>
            <SummaryBox>{summaryText}</SummaryBox>
            <InputTest
              id="text"
              name="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                console.log(text);
              }} //이렇게 value값 추출해서 axios로 보내면 됨
            ></InputTest>
          </Section>
        </MainContent>
        <TopText>Translated : {leng}</TopText>
        <TopTextt>
          <Link href={"../"}>Back to Main</Link>
        </TopTextt>
        <SearchButton onClick={onSearch}>Search</SearchButton>
        <SearchBox>{searchText}</SearchBox>
      </Container>

      <ButtonContainer>
        <RecordButton>
          <ButtonText>녹음 중단</ButtonText>
        </RecordButton>
        <RecordText>30 : 25</RecordText>

        <SummaryButton onClick={onSummary}>
          <ButtonText>Summary</ButtonText>
        </SummaryButton>
      </ButtonContainer>
    </div>
  );
}

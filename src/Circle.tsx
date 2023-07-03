import { useState } from "react";
import styled from "styled-components";

//Container의 props의 타입을 지정 (object를 설명)
interface ContainerProps {
    bgColor: string;
    borderColor: string;
}

// 타입을 지정한 인터페이스와 연결 <ContainerProps>
const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    background-color: ${(props) => props.bgColor};
    border-radius: 100px;
    border: 1px solid ${(props) => props.borderColor};
`;

// Circle의 Props의 타입을 지정 (object를 설명)
interface CircleProps {
    bgColor: string;    
    borderColor?: string;   // option으로 설정 ?
    text?: string;
}

// 타입을 지정한 인터페이스와 연결 : CircleProps
function Circle({ bgColor, borderColor, text = "default text" /* undefined일 경우 초기값 지정 방법 2 (es6) */ }: CircleProps) {
    // useState의 값을 두가지 속성으로 하고 싶으면 뒤에 <> 열어서 타입을 지정
    // 타입 지정을 하지 않을 시 default값 기준으로 자동 설정
    const [value, setValue] = useState<number|string>(1);
    // undefined일 경우 초기값 지정 방법 1 (typescript) ??
    return <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
        {text}
    </Container>;
}

export default Circle;

interface playerShape {
    name: string;
    age: number;
}
import styled from "styled-components";

//Container의 props의 타입을 지정 (object를 설명)
interface ContainerProps {
    bgColor: string;
}

// 타입을 지정한 인터페이스와 연결 <ContainerProps>
const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    background-color: ${(props) => props.bgColor};
    border-radius: 100px;
`;

// Circle의 Props의 타입을 지정 (object를 설명)
interface CircleProps {
    bgColor: string;
}

// 타입을 지정한 인터페이스와 연결 : CircleProps
function Circle({bgColor}: CircleProps) {
    return <Container bgColor={bgColor}>
        
    </Container>;
}

export default Circle;

interface playerShape {
    name: string;
    age: number;
}
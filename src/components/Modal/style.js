import styled from "styled-components";


export const Background = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400;
    bgcolor: background.paper;
    border: 2px solid #000;
    boxShadow: 24;
    background: white;
    color: black;
    width: 55vw;
    height: 60vh;

`;

export const Card = styled.div`
    display: flex;
    justify-content: space-aroundnter;
    align-content: z;
    flex-direction: column;
    justify-content: center;
    height: 10vh;
    border: 1px solid;
    align-self: center;
    width: 25vw;
    margin-top:10px;
`;

export const Information = styled.div`
    display:flex;
    align-self:start;
    margin-left:5px;
`;

import styled from "styled-components";


export const Background = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400;
    border: 2px solid #000;
    background: #303030;
    color: black;
    width: 55vw;
    height: 80vh;
    border-radius:10px;
`;

export const Card = styled.div`
   display:flex;
   justify-content:start;
   align-content:center;
   flex-direction:column;
   width:100%;
   height:20vh;
`;
export const CardHeader = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-around;
    width:100%;
    margin-bottom:5px;
    &>button{
        align-self:start;
        margin-top:10px;
        margin-left:auto;
        margin-right:10px;
        width:100px;
        height:25px;
        cursor:pointer;
        border:none;
        background:white;
        color:black;
        border-radius:10px;
        font-weight:bold;
    }
    &>button:hover{
        background:#03a9f4;
        color:white;
    }
    &>div{
        align-self:start;
        margin-top:5px;
        margin-left:10px;
        color:white;
        font-weight:500;
    }
        
`;
export const ImageName = styled.div`
    display:flex;
    font-size:16px;
    font-weight:bold;
`;
export const CardBody = styled.div`
    display:flex;
    flex-direction:column;
    width:100%; 
    height:100%;
    &>div{
        margin-left:10px;
        color:white;
    }
`;

export const Button = styled.button`
`;

import { Component } from "solid-js";
import {styled} from "solid-styled-components";
import { ButtonProps } from "./type.d";

const Button2Styled = styled('button')<ButtonProps>`
  background-color: transparent;
  color: ${props => props.color || '#00ff99'}; /* Neon green or any futuristic color */
  padding: 12px 24px;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  border: 2px solid ${({ color }) => color || '#00ff99'};
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
  overflow: hidden;
  display: inline-block;

  /* Glowing effect for the text */
  text-shadow: 0 0 8px ${({ color }) => color || '#00ff99'}, 0 0 15px ${({ color }) => color || '#00ff99'};

  /* Underline effect */
  &::after {
    content: '';
    position: absolute;
    width: 0%;
    height: 20px;
    background-color: ${({ color }) => color || '#00ff99'};
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    transition: width 0.3s ease, box-shadow 0.3s ease;
     z-index: -1;  /* Make sure it's under the text */
  }

  /* Hover effect */
  &:hover {
    transform: translateY(-10px); /* Move the button slightly upwards */
    box-shadow: 0 0 15px ${({ color }) => color || '#00ff99'}, 0 0 30px ${({ color }) => color || '#00ff99'};
    color: #1a1a1a; /* Change text color on hover */
  }

  &:hover::after {
    width: 100%; /* Underline grows on hover */
    box-shadow: 0 0 8px ${({ color }) => color || '#00ff99'}, 0 0 15px ${({ color }) => color || '#00ff99'}; /* Glowing underline */
  }
`;

 const Button2: Component<ButtonProps> = (props) => {
    return (
        <Button2Styled onClick={props.onClick} class={props.class}>
            {props.children}
        </Button2Styled>
    )
}

export default Button2;
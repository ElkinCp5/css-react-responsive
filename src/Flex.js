import React from "react";
import styled from "styled-components";

const StyleFlex = styled.div`
    display: ${ props => props.display ? props.display : 'flex'};; 
    align-items: ${ props => props.alignItems ? props.alignItems : 'start'};
    text-align: ${ props => props.textAlign ? props.textAlign : 'center'};
    justify-content: ${ props => props.justifyContent ? props.justifyContent : 'start'};
    flex-direction: ${ props => props.flexDirection ? props.flexDirection : 'row'};
    flex: ${ props => props.flex ? props.flex : 'none'};
    order: ${ props => props.order ? props.order : 'none'}; 

    color: ${ props => props.color ? props.color : '#000'};
    background-color: ${ props => props.backgroundColor ? props.backgroundColor : '#FFF'};
`;

const Flex = ({
    style,
    display,
    className,
    justifyContent, //  | 'flex-start' | 'flex-end' | 'space-around' | 'space-between' | 'space-evenly' | 'center' | 'start'
    flexDirection, // 'row' | colum
    flex,
    alignItems,
    textAlign = 'left',
    children,
    backgroundColor,
    color
}) =>{

    return <StyleFlex
    display={display}
    style={style} 
    className={className}
    alignItems={alignItems}
    textAlign={textAlign}
    justifyContent={justifyContent}
    flexDirection={flexDirection}
    flex={flex}
    backgroundColor={backgroundColor}
    color={color}
    >{children}</StyleFlex>
}
export default Flex;
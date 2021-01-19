import React from "react";
import styled from "styled-components";
import { notUndefained } from "./helper/Utility";

const validUnit = (value) => {
    return(
        value =='fr' ||
        value =='px' ||
        value =='em' ||
        value =='%' ||
        value =='auto' ||
        value =='min-content' ||
        value =='max-content' ||
        value =='minmax'
    );
};

const typeUnit = (value, unit='fr') =>{
    return (notUndefained(value) && typeof value == 'number')
        ? `${value}${(notUndefained(unit) && validUnit(unit)) ? unit :'fr'}`
        : (typeof value == 'string') ? value : '1fr';
};

const Styled_Grid_Layout = styled.div`
  display: grid;
  position: ${ props => props.position};
  
  width: ${ props => props.width ? props.width : '100%'};
  height: ${ props => props.height};
  padding: ${ props => props.padding};
  margin: ${props => props.margin};
  
  color: ${ props => props.color};
  background-color: ${ props => props.backgroundColor};
  
  grid-auto-rows: ${ props => props.autoRows ? props.autoRows : ''};
  grid-auto-columns: ${ props => props.autoColumns ? props.autoColumns : ''};
  &.grid_layout_epayco{
      grid-template-columns: ${ props=> (props.columns && props.widthColumns)
        ? ('repeat('+props.columns +','+props.widthColumns+')') : ''
      };
      grid-template-rows: ${ props=> (props.rows && props.widthRows) 
        ? ('repeat('+props.rows +','+props.widthRows+')') : ''
      };
      grid-gap: ${ props=> props.gap };
  }
  @media only screen and  (min-width:425px) {
    &.grid_layout_epayco{
    grid-template-columns: ${ props=> (props.sm && props.sm.columns && props.sm.widthColumns)
    ? ('repeat('+props.sm.columns +','+props.sm.widthColumns+')') : ''};
    }
  }
    
  @media only screen and (min-width:768px) {
    &.grid_layout_epayco{
    grid-template-columns: ${ props=> (props.md && props.md.columns && props.md.widthColumns) 
    ? ('repeat('+props.md.columns +','+props.md.widthColumns+')') : ''};
    }
  }
    
  @media only screen and (min-width:1024px) {
    &.grid_layout_epayco{
    grid-template-columns: ${ props=> (props.lg && props.lg.columns && props.lg.widthColumns) 
    ? ('repeat('+props.lg.columns +','+props.lg.widthColumns+')') : ''};
    }
  }
    
  @media only screen and (min-width:1440px) {
    &.grid_layout_epayco{
    grid-template-columns: ${ props=> (props.xl && props.xl.columns && props.xl.widthColumns)
    ? ('repeat('+props.xl.columns +','+props.xl.widthColumns+')') : ''};}
  }
`;

const GridLayout = (
    {
        gap,
        rows,
        columns,
        unitGap = 'px', // px, em, %

        unitRows = 'fr', // fr, px, em, %, auto, min-content, max-content, minmax
        unitColumns = 'fr', // fr, px, em, %, auto, min-content, max-content, minmax
        widthRows,
        widthColumns,
        autoRows,
        autoColumns,

        backgroundColor,
        position,
        padding,
        color,
        width,
        height,

        className,
        children,
        style,
        sm,
        md,
        lg,
        xl
    }
) => {
    return (
        <Styled_Grid_Layout
            gap={gap}
            rows={rows}
            columns={columns || 12}

            unitGap={unitGap}
            widthRows={typeUnit(widthRows, unitRows)}
            widthColumns={typeUnit(widthColumns, unitColumns)}
            autoRows={autoRows}
            autoColumns={autoColumns}

            width={width}
            height={height}
            padding={padding}
            position={position}
            color={color}
            backgroundColor={backgroundColor}

            className={`grid_layout_epayco  ${className || ''} `}
            style={style}
            sm={sm}
            md={md}
            lg={lg}
            xl={xl}
        >
            {children}
        </Styled_Grid_Layout>
    );
}

const Styled_Row_Table = styled.div`
  display: ${props => (typeof props.displayFlex !== "undefined") ? 'flex': '' };
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
  
  grid-row-start: ${ props => props.rowsStart};
  grid-row-end: ${ props => props.rowsEnd};
  grid-row-gap: ${ 
    props => (props.gap && (props.rowsStart || props.rowsEnd)) 
        ? props.gap : ''
    };
 
  grid-column-start: ${ props => props.columnsStart};
  grid-column-end: ${ props => props.columnsEnd};
  grid-column-gap: ${ 
    props => (props.gap && (props.columnsEnd || props.columnsStart)) 
        ? props.gap : ''
    };
  
  @media only screen and  (min-width:425px) {
      grid-column-start: ${ props => (notUndefained(props.sm) && props.sm.columnsStart)
        ? props.sm.columnsStart : ''};
      grid-column-end: ${ props => (notUndefained(props.sm) && props.sm.columnsEnd)
        ? props.sm.columnsEnd : ''};
  }
  @media only screen and (min-width:768px) {
      grid-column-start: ${ props => (props.md && props.md.columnsStart)
    ? props.md.columnsStart : ''};
      grid-column-end: ${ props => (props.md && props.md.columnsEnd)
    ? props.md.columnsEnd : ''};
  }
  @media only screen and  (min-width:1024px) {
      grid-column-start: ${ props => (props.lg && props.lg.columnsStart)
    ? props.lg.columnsStart : ''};
      grid-column-end: ${ props => (props.lg && props.lg.columnsEnd)
    ? props.lg.columnsEnd : ''};
  }
  @media only screen and  (min-width:1440px) {
      grid-column-start: ${ props => (props.xl && props.xl.columnsStart)
    ? props.xl.columnsStart : ''};
      grid-column-end: ${ props => (props.xl && props.xl.columnsEnd)
    ? props.xl.columnsEnd : ''};
  }
`;
/**
 *
 * @param gap
 * @param unit
 * @param columnsStart
 * @param columnsEnd
 * @param rowsStart
 * @param rowsEnd
 * @param children
 * @param className
 * @returns {*}
 * @constructor
 */
const GridColumn = (
    {
        gap,
        unit = 'fr', // px, em, %
        columnsStart,
        columnsEnd,
        rowsStart,
        rowsEnd,

        displayFlex,
        justifyContent,
        alignItems,

        children,
        className,
        style,
        sm,
        md,
        lg,
        xl
    }
) => {
    return (
        <Styled_Row_Table
            unit={unit}
            gap={gap}
            columnsStart={columnsStart || ((columnsEnd > 1) ? 1: columnsStart)}
            columnsEnd={(columnsEnd > 1) ? (columnsEnd+1): columnsEnd}
            rowsStart={rowsStart}
            rowsEnd={ (rowsEnd > 1) ? (rowsEnd+1) : rowsEnd}

            displayFlex={displayFlex}
            justifyContent={justifyContent}
            alignItems={alignItems}

            className={className}
            style={style}
            sm={sm}
            md={md}
            lg={lg}
            xl={xl}
        >
            {children}
        </Styled_Row_Table>
    );
}

export { GridColumn }
export default GridLayout;
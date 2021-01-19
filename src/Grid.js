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

const typeNumber = (value, start, end, type)=>{
  const notStart = notUndefained(start, 'number');
  const notEnd   = notUndefained(end, 'number');
  const notValue = notUndefained(value, 'number');
  const notType = notUndefained(type, 'string');
  const validStandar = (notEnd && notStart && notValue && notType);
  const validFalse = (notEnd && !notStart && notValue);

  // Variante todo deben estar definidos
  if(validStandar && type == 'sum') return (start < end) ? (value+1) : undefined; 
  // Variante donde start es indefinido
  if(validFalse) return (end > 1) ? 1 : undefined;
  // Estado por defecto
  return notUndefained(value, 'number') ? value : undefined;
}

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
/**
 * 
 * @param {*} param0 
 */

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
  display: ${props => notUndefained(props.displayFlex) ? 'flex': '' };
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
  flex: ${props => props.flex};
  color: ${ props => props.color};
  background-color: ${ props => props.backgroundColor};
  font-weight: ${props => props.fontWeight ? props.fontWeight : '' };

  grid-row-start: ${ props => props.rowsStart};
  grid-row-end: ${ props => props.rowsEnd };
  grid-row-gap: ${ 
    props => (props.gap &&  (props.rowsStart || props.rowsEnd)
      ) 
        ? props.gap : ''
    };
 
  grid-column-start: ${ props => props.columnsStart};
  grid-column-end: ${ props => props.columnsEnd};
  grid-column-gap: ${ 
    props => (props.gap && (typeNumber(props.columnsStart) || typeNumber(props.columnsEnd))) 
        ? props.gap : ''
    };
  
  @media only screen and  (min-width:425px) {
      grid-column-start: ${ props => (notUndefained(props.sm) && notUndefained(props.sm.columnsStart, 'number'))
        ? props.sm.columnsStart : ''};
      grid-column-end: ${ props => (notUndefained(props.sm) && notUndefained(props.sm.columnsEnd, 'number'))
        ? (props.sm.columnsEnd+1) : ''};
  }
  @media only screen and (min-width:768px) {
      grid-column-start: ${ props => (props.md && notUndefained(props.md.columnsStart, 'number'))
    ? props.md.columnsStart : ''};
      grid-column-end: ${ props => (props.md && notUndefained(props.md.columnsEnd, 'number'))
    ? (props.md.columnsEnd+1) : ''};
  }
  @media only screen and  (min-width:1024px) {
      grid-column-start: ${ props => (props.lg && notUndefained(props.lg.columnsStart, 'number'))
    ? props.lg.columnsStart : ''};
      grid-column-end: ${ props => (props.lg && notUndefained(props.lg.columnsEnd, 'number'))
    ? (props.lg.columnsEnd+1) : ''};
  }
  @media only screen and  (min-width:1440px) {
      grid-column-start: ${ props => (props.xl && notUndefained(props.xl.columnsStart, 'number'))
    ? props.xl.columnsStart : ''};
      grid-column-end: ${ props => (props.xl && notUndefained(props.xl.columnsEnd, 'number'))
    ? (props.xl.columnsEnd+1) : ''};
  }
`;

/**
 * 
 * @param {*} param0 
 */
const GridColumn = (
    {
        gap,
        unit = 'fr', // px, em, %
        columnsStart,
        columnsEnd,
        rowsStart,
        rowsEnd,

        flex,
        displayFlex,
        justifyContent,
        alignItems,
        fontWeight,
        backgroundColor,
        color,

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
          columnsStart={typeNumber(columnsStart, columnsStart, columnsEnd )}
          columnsEnd={typeNumber(columnsEnd, columnsStart, columnsEnd, 'sum')}

          rowsStart={typeNumber(rowsStart, rowsStart, rowsEnd)}
          rowsEnd={typeNumber(rowsEnd, rowsStart, rowsEnd, 'sum')}

          fontWeight={fontWeight}
          backgroundColor={backgroundColor}
          color={color}

          displayFlex={displayFlex}
          justifyContent={justifyContent}
          alignItems={alignItems}
          flex={flex}

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

export default { GridColumn, GridLayout };
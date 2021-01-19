import format from 'format-number';


const iDs = (isNumber = false)=> {
  const iDs = new Date();
  const iDstring = Date.parse(iDs);
  const baseiDs = iDstring.toString(34);
  return isNumber ? iDstring : baseiDs;
}

const MoneyFormat = (
  value = 0,
  option ={ prefix: '$', suffix: null, },
  noSeparator = false
) =>{
  const Format = format(option);
  return Format(value, {noSeparator});
}

const hexToRgb = (hex) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

const exporRGBA =({color = '#CCC', alpha = 0.85})=>{
  const rgbColorJson = hexToRgb(color);
  const red   = rgbColorJson.r
  const green = rgbColorJson.g
  const blue  = rgbColorJson.b
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

const notUndefained =(value, type)=>{
  const isValue = ( typeof value !== 'undefined' && typeof value !== undefined );
  const isVType = ( typeof type !== 'undefined' && typeof type !== undefined );

  if(isVType) return (typeof value == type);
  return isValue;
};

const isUndefained =(value)=>{
  return (typeof value == 'undefined' && typeof value == undefined);
};

const elevation = (value) =>{
  const level = (typeof value === 'number') ? value : 0;
  return `z-depth-${level}`;
};

const indexOfString =(name, search)=>{
  // console.log(name, search);
  try {
    if(typeof name == 'string' && typeof search == 'string'){
      const p1 = name.toLowerCase();
      const p2 = search.toLowerCase();
      //console.log(name, search, p1.indexOf(p2));
      return (p1.indexOf(p2) !== -1);
    }
    return false;
  } catch (error) {
    console.error('Error!!=', error);
    return false;
  }
};

const indexOfArray =(array=[], item)=>{
  // console.log(name, search);
  try {
    if(typeof array == 'object' && array.length && typeof item == 'string'){
      return (array.indexOf(item) >= 0);
    }
    return false;
  } catch (error) {
    console.error('Error!!=', error);
    return false;
  }
};

const arrayAdd = (list, data) =>{
  list.push(data);
};

const arrayDelete = (list, data) =>{
  const index = list.indexOf(data);
  list.splice(index, 1);
}

export { 
  iDs, 
  hexToRgb, 
  exporRGBA,
  elevation,
  MoneyFormat,
  notUndefained,
  isUndefained, 
  indexOfString, 
  indexOfArray,
  arrayAdd,
  arrayDelete,
};

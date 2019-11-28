import React from 'react';

export default function checkTableValue(value, notProvidedText = 'not provided', callback = null, checkFunction){

  let boolResult = !!value;

  if(checkFunction && typeof checkFunction === 'function'){
    boolResult = checkFunction(value);
  }

  if(boolResult){

    if(callback && typeof callback === 'function'){
      return callback(value);
    }

    return value
  }else{
    return (<span className="not-provided">{notProvidedText}</span>);
  }
}

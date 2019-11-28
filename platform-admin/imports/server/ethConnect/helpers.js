import connectInstance from "./connectInstance";

export function hexToAscii(hex){
  return connectInstance.utils.hexToAscii(hex).replace(new RegExp(/\u0000/, 'g'), '');
}
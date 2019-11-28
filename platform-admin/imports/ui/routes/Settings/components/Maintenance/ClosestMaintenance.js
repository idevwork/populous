import React from 'react';
import moment from 'moment';
import { Label } from 'reactstrap';

import FlagIcon from "../../../../components/Icons/FlagIcon";
import severityToColor from "./severityToColor";
import TrashIcon from "../../../../components/Icons/TrashIcon";


export default ({ deleteClosest, document }) => {

  const { _id, startAt, endAt, severity } = document;
  const format = 'DD-MM-YYYY, hh:mm A';

  return (
    <div className="p-t-20 p-b-20">
      <Label>
        Next shutdown
      </Label>

      <div className="d-flex align-items-center">
        <span className="m-r-10">{moment(startAt).format(format)}
               - {moment(endAt).format(format)}</span>
        <FlagIcon color={severityToColor[severity]}/>
        <span className="m-l-30" onClick={()=> {deleteClosest(document)}} style={{cursor: 'pointer'}}><TrashIcon color={'#5ca0f6'}/></span>
      </div>
    </div>
  );
}
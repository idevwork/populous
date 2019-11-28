import React, {Fragment} from 'react';

import MaintenanceFrom from "./MaintenanceFrom";
import MaintenanceList from "./MaintenanceList";
import ClosestMaintenance from "./ClosestMaintenance";
import { H3 } from "../../../../components/styled-components/Typography";


export default ({completedList, deleteClosest, closest}) => {
  return (
    <Fragment>
      <H3>Maintenance</H3>
      {closest &&
        <ClosestMaintenance document={closest} deleteClosest={deleteClosest} />
      }
      <MaintenanceFrom/>
      <MaintenanceList documents={completedList}/>
    </Fragment>
  )
}

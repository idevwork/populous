import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment';

import FlagIcon from "../../../../components/Icons/FlagIcon";
import { Lead } from "../../../../components/styled-components/Typography";
import severityToColor from "./severityToColor";


const MaintenanceList = ({ documents }) => {
  return (
    <div className="p-t-30">
      <div className="position-relative">
        <div className="p-t-20"><Lead>History of shutdowns</Lead></div>
        <BootstrapTable data={documents}
                        keyField="_id" bordered={false}
                        containerStyle={{ marginBottom: '20px' }}
                        bodyStyle={{ border: '#e1e5eb 2px solid', borderTopWidth: '0px' }}
                        trClassName={(row, rowIndex) => {
                          return rowIndex % 2 === 0 ? "tr-odd" : "tr-even";
                        }}>
          <TableHeaderColumn
            dataFormat={(value) => moment(value).format('DD-MM-YYYY, hh:mm a')}
            dataField='startAt'>Date, Time</TableHeaderColumn>
          <TableHeaderColumn
            tdStyle={{ width: 200 }}
            thStyle={{ width: 200 }}
            dataFormat={(value) => (<FlagIcon color={severityToColor[value]}/>)}
            headerAlign='center' dataAlign='center' dataField='severity'>Severity</TableHeaderColumn>
        </BootstrapTable>
      </div>
    </div>
  );
};

export default MaintenanceList;

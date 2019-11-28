import { Maintenance } from 'meteor/populous:api';
import moment from 'moment';

export default async function deactivateEndedMaintenance() {
  await Maintenance.update({
      endAt: {
        $lte: moment().utc().toDate(),
      },
      isCompleted: false,
    },
    { $set:{isCompleted: true, }},
  );
}

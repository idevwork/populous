import { User,} from 'meteor/populous:api';

export default function attachCommonData(request){
  request.status = request.isComplete ? 'Completed' : (request.adminId ? 'Being processed' : 'Opened');
  request.assignedDate = request.status === 'Being processed' ? request.updatedAt : '';
  const executor = request.adminId ? User.findOne({_id: request.adminId}) : '';
  request.executor = executor ? executor.emails[0].address : '';
}

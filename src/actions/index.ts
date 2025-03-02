import * as category from './models/category'
import * as feedback from './models/feedback'
import * as group from './models/group'
import * as groupInvitation from './models/groupInvitation'
import * as groupJoin from './models/groupJoin'
import * as groupMember from './models/groupMember'
import * as payment from './models/payment'
import * as receipt from './models/receipt'
import * as reserve from './models/reserve'
import * as transaction from './models/transaction'
import * as user from './models/user'

export const actions = {
  groups: {
    group,
    groupJoin,
    groupInvitation,
    groupMember,
  },
  categories: { category },
  transactions: {
    transaction,
    reserve,
    payment,
    receipt,
  },
  users: {
    feedback,
    user,
  },
}

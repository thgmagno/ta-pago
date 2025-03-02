import * as category from './categoryRepository'
import * as feedback from './feedbackRepository'
import * as groupInvitation from './groupInvitationRepository'
import * as groupJoin from './groupJoinRepository'
import * as groupMember from './groupMemberRepository'
import * as group from './groupRepository'
import * as payment from './paymentRepository'
import * as receipt from './receiptRepository'
import * as reserve from './reserveRepository'
import * as user from './userRepository'

export const repositories = {
  groups: {
    group,
    groupJoin,
    groupInvitation,
    groupMember,
  },
  categories: { category },
  transactions: {
    reserve,
    payment,
    receipt,
  },
  users: {
    feedback,
    user,
  },
}

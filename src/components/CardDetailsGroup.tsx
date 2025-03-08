import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Crown, Users } from 'lucide-react'
import { actions } from '@/actions'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { getUserName } from '@/lib/utils'

export async function CardDetailsGroup({ groupId }: { groupId: string }) {
  const response = await actions.groups.group.findGroupWithMembers(groupId)

  const idOwnerGroup = response?.data?.group?.creatorUserId
  const listMembers = response.data?.members ?? []

  return (
    <Card className="mx-auto w-full max-w-5xl rounded-2xl border p-4 shadow-md">
      <CardHeader>
        <div className="flex flex-row items-center gap-3">
          <Users className="text-primary h-7 w-7" />
          <div>
            <CardTitle className="text-lg font-semibold">
              {response?.data?.group?.name}
            </CardTitle>
            <CardDescription>
              Acompanhe todas as transações em um só lugar!
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-6">
        <section className="mt-4">
          <Label>Participantes</Label>
          {listMembers.length > 0 ? (
            <div className="mt-5">
              {listMembers.map((member) => (
                <div
                  key={member.email}
                  className="bg-sidebar mb-2 flex items-center gap-4 rounded-md p-3"
                >
                  <Avatar>
                    <AvatarImage
                      src={
                        member.image ??
                        'https://www.svgrepo.com/show/508196/user-circle.svg'
                      }
                      alt="@shadcn"
                    />
                    <AvatarFallback className="bg-green-700">
                      {member.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="flex font-medium">
                      {getUserName(member?.name)}{' '}
                      {idOwnerGroup === member.id && (
                        <Crown className="ml-3 h-5 w-5 text-amber-400" />
                      )}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {member.email}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="my-4 text-gray-500">
              Nenhum participante encontrado.
            </p>
          )}
        </section>
      </CardContent>
    </Card>
  )
}

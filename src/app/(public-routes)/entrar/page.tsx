import { SignInWithGitHub } from '@/components/common/SignInWithGitHub'
import { SignInWithGoogle } from '@/components/common/SignInWithGoogle'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function LoginPage() {
  return (
    <Card className="mx-auto my-8 max-w-md py-6">
      <CardHeader>
        <CardTitle>Autenticação</CardTitle>
        <CardDescription>
          Para continuar escolha uma das opções abaixo
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-5">
        <SignInWithGoogle />
        <SignInWithGitHub />
      </CardContent>
    </Card>
  )
}

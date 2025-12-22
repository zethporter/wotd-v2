import { Link } from '@tanstack/react-router'
import { IconSend } from '@tabler/icons-react'
// import { User } from './user-management'
import { Button } from '@/components/ui/button'
import { AuroraText } from '@/components/ui/aurora-text'

export const Hero = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="fixed top-2 right-2">{/* <User />*/}</div>
      <div className="min-h-screen relative">
        <div className="text-center flex flex-col gap-6 justify-start pt-56">
          <h1 className="text-4xl font-bold flex flex-col gap-2">
            <span>Trojan Takedown</span>{' '}
            <AuroraText
              className="text-5xl font-bold"
              colors={['#3a5ba0', '#f7c873', '#6ea3c1', '#a04a6c']}
              speed={0.7}
            >
              Outstanding Wrestler
            </AuroraText>
          </h1>
          <Link to={'/vote'}>
            <Button
              variant="outline"
              className="cursor-pointer text-lg font-semibold"
              size="lg"
            >
              <IconSend />
              Vote Now
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

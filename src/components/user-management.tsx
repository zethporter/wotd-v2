// import { IconLogout } from '@tabler/icons-react'
// import { cn } from '@/lib/utils'
// // import { signOut, useSession } from '@/lib/auth/auth-client'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import { Button } from '@/components/ui/button'
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover'

// export function User() {
//   // const { data: session } = useSession()

//   // const userName = session?.user.name ?? ''
//   // const userImage = session?.user.image ?? ''
//   // const userInitial = userName.charAt(0).toUpperCase()

//   return (
//     <Popover>
//       <PopoverTrigger>
//         <button
//           className={cn(session ? 'cursor-pointer outline-none' : 'hidden')}
//         >
//           <Avatar>
//             <AvatarImage src={userImage} alt={userName} />
//             <AvatarFallback>{userInitial}</AvatarFallback>
//           </Avatar>
//         </button>
//       </PopoverTrigger>
//       <PopoverContent align="end" className="w-auto">
//         <Button
//           variant="secondary"
//           onClick={() => signOut()}
//           className="w-full"
//         >
//           <IconLogout />
//           Log out
//         </Button>
//       </PopoverContent>
//     </Popover>
//   )
// }

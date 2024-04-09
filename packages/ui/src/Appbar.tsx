import { Button } from './button'

interface AppbarProps {
  user?: {
    name?: string | null
  },
  onSignin: any,
  onSignout: any
}


const Appbar = ({
  user,
  onSignin,
  onSignout
}: AppbarProps) => {
  return (
    <div className='flex justify-between border-b px-4'>
        <div className='text-lg flex flex-col justify-center'>
            Swift pay
        </div>
        <div className='flex flex-col justify-center pt-2'>
            <Button onClick={user? onSignout: onSignin}>{user ? "Logout": "Login"}</Button>
        </div>
    </div>
  )
}

export default Appbar
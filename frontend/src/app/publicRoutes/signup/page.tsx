import { Auth } from '@/components/Auth';
import Quote from '@/components/Quote';

const Signup = () => {
  return (
    <div className='flex h-full w-full justify-center'>
      <Auth type='signup' />
    </div>
  );
};

export default Signup;

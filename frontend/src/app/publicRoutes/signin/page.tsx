import { Auth } from '@/components/Auth';
import Quote from '@/components/Quote';

const Signin = () => {
  return (
    <div className='flex h-full w-full justify-center'>
      <Auth type='signin' />
    </div>
  );
};

export default Signin;

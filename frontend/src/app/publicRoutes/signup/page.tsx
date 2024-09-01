import { Auth } from '@/components/Auth';
import Quote from '@/components/Quote';

const Signup = () => {
  return (
    <div className='flex h-full w-full justify-center'>
        <div className='flex-1 flex justify-center'>
            <Quote/>
        </div>
        <div className='flex-1 flex justify-center'>
            <Auth type='signup' />
        </div>
    </div>
  );
};

export default Signup;

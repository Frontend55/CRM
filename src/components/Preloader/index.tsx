import logo from '@/assets/logo.png';

export function Preloader(props) {
  return (
    <div
      className={
        'absolute left-0 top-0 w-full h-full flex justify-center items-center z-50 bg-gradient-to-r  from-indigo-500  to-white to-99%'
      }
    >
      <img src={logo} className={'w-[100px] animate-spin'} />
    </div>
  );
}

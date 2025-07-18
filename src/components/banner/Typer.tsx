import { TypeAnimation } from 'react-type-animation';

const Typer = () => {
  return (
    <TypeAnimation
      sequence={[
        'DEVELOPER',
        1000,
        'DESIGNER',
        1000,
      ]}
      wrapper="span"
      speed={50}
      repeat={Infinity}
      className="text-[var(--blue)] tracking-[0.5rem] text-[24px]"
    />
  );
};

export default Typer; 
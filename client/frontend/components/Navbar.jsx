import { FaBars } from 'react-icons/fa6';

export default function Navbar() {
  return (
    <div className="bg-secondary flex justify-between items-center p-4">
      <FaBars className="cursor-pointer text-primary" size={20} />
      <h1 className="text-primary font-bold text-lg">Devs Gym</h1>
    </div>
  );
}

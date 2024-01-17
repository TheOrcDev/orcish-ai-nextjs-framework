type Props = {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
};

export default function OButton({ children, active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`p-3 bg-white dark:text-black rounded-xl w-40 hover:bg-orange-100 ${
        active && "bg-orange-200"
      }`}
    >
      {children}
    </button>
  );
}

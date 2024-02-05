type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
};

export default function OButton({
  children,
  active,
  onClick,
  disabled,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`p-3 dark:text-black rounded-xl w-40 hover:bg-orange-100 ${
        active ? "bg-orange-300" : "bg-white"
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isSelected?: boolean;
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <>
      {props.isSelected ? (
        <button
          className="border bg-slate-50 text-slate-900 flex justify-center items-center px-4 py-1 rounded-lg hover:bg-slate-200 hover:text-slate-700 transition hover:border-slate-700 shadow cursor-pointer"
          {...props}
        >
          {children}
        </button>
      ) : (
        <button
          className="border bg-slate-900 flex justify-center items-center px-4 py-1 rounded-lg hover:bg-slate-200 hover:text-slate-700 transition hover:border-slate-700 shadow cursor-pointer"
          {...props}
        >
          {children}
        </button>
      )}
    </>
  );
};

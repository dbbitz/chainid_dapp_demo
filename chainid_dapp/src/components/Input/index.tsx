interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const Input = ({ label, ...props }: InputProps) => {
    return (
        <div className="flex flex-col">
            <label htmlFor={props.id} className="text-sm font-semibold text-slate-300 mb-1">
                {label}
            </label>
            <input
                className="border bg-slate-900 flex justify-center items-center px-4 py-1 rounded-lg hover:bg-slate-200 hover:text-slate-700 transition hover:border-slate-700 shadow"
                {...props}
            />
        </div>
    );
}
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";

interface SectionProps {
  children: React.ReactNode;
}

export const Section = ({ children }: SectionProps) => {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col h-screen w-full p-10 items-center gap-10">
      <div className="flex gap-5 w-1/2 rounded-lg flex-col p-5 border">
        <div className="flex w-full gap-4 items-center">
          <div
            className="flex justify-center items-center p-2 rounded-xl hover:bg-slate-200 hover:text-slate-900 cursor-pointer transition"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
          </div>
          <h1 className="font-bold text-3xl text-slate-300">ChainID</h1>
        </div>
        {children}
      </div>
    </section>
  );
};

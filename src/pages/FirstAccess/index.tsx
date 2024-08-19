import { useParams } from "react-router-dom";
import { Section } from "../../components/Section";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export const FirstAccess = () => {
  const { roleName } = useParams();


  return (
    <Section>
      {roleName === "institution" && (
        <div className="flex flex-col gap-5 py-3">
          <Input label="Nome da Instituição" />
          <Button>Registrar</Button>
        </div>
      )}
      {roleName === "student" && <h1>Student</h1>}
      {roleName === "employer" && <h1>Employer</h1>}
    </Section>
  );
};

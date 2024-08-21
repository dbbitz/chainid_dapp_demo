import { useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Section } from "../../components/Section";

export const Employer = () => {
  const [validateCredential, setValidateCredential] = useState({
    hash: ""
  });

  
  const [educationAddress, setEducationAddress] = useState<string>();

  const validateCertificate = async () => {
    try {
      const requestBody = {
        educationAddress: educationAddress,
        credentialHash: validateCredential.hash
      };

      const response = await fetch(
        `http://localhost:3000/api/validate-credential`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      if (data.isValid) {
        alert("Certificado válido");
      } else {
        alert("Certificado inválido");
      }
    } catch {
      console.error("Error verifying document");
      alert("Error verifying document");
    }
  };

  return (
    <Section>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <Input
            label="Hash da credencial"
            value={validateCredential.hash}
            onChange={(e) =>
              setValidateCredential({
                ...validateCredential,
                hash: e.target.value,
              })
            }
          />
          <Input
            label="Endereço da Instituição"
            value={educationAddress}
            onChange={(e) => setEducationAddress(e.target.value)}
            />
          
        </div>
        <Button onClick={validateCertificate}>Validar Certificado</Button>
      </div>
    </Section>
  );
};

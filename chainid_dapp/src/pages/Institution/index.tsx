import { useState } from "react";
import { Button } from "../../components/Button";
import { Section } from "../../components/Section";
import { Input } from "../../components/Input";
import { Copy } from "@phosphor-icons/react";

export const Institution = () => {
  const [selectedSection, setSelectedSection] = useState<
    "generate" | "verify" | "generated"
  >("generate");

  const [credentialDetails, setCredentialDetails] = useState({
    name: "",
    ra: "",
    course: "",
    address: "",
  });

  const [generatedDocumentHash, setGeneratedDocumentHash] =
    useState<string>("");

  const [generatedSignature, setGeneratedSignature] = useState<string>("");

  const educationAddress = localStorage.getItem("account");

  const [studentAddress, setStudentAddress] = useState<string>("");

  const [validateCredential, setValidateCredential] = useState({
    hash: "",
    signature: "",
  });

  const generateCredential = async () => {
    try {
      const requestBody = {
        educationAddress: educationAddress,
        studentAddress: studentAddress,
        credentialType: "Cerfiticado",
        credentialDetails: JSON.stringify(credentialDetails),
        credentialDate: new Date().getTime(),
      };

      const response = await fetch(
        `http://localhost:3000/api/issue-credential`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      setGeneratedDocumentHash(data.credentialHash);
      setGeneratedSignature(data.signature);
      setSelectedSection("generated");
    } catch {
      console.error("Error verifying document");
      alert("Error verifying document");
    }
  };

  const validateCertificate = async () => {
    try {
      const requestBody = {
        educationAddress: educationAddress,
        credentialHash: validateCredential.hash,
        signature: validateCredential.signature,
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
      <div className="flex gap-3">
        <Button
          isSelected={selectedSection === "generate"}
          onClick={() => setSelectedSection("generate")}
        >
          Emitir Certificado
        </Button>
        <Button
          isSelected={selectedSection === "verify"}
          onClick={() => setSelectedSection("verify")}
        >
          Verificar Certificado
        </Button>
      </div>
      <div>
        {selectedSection === "generate" && (
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <Input
                label="Nome do Aluno"
                value={credentialDetails.name}
                onChange={(e) =>
                  setCredentialDetails({
                    ...credentialDetails,
                    name: e.target.value,
                  })
                }
              />
              <Input
                label="RA"
                value={credentialDetails.ra}
                onChange={(e) =>
                  setCredentialDetails({
                    ...credentialDetails,
                    ra: e.target.value,
                  })
                }
              />
              <Input
                label="Curso"
                value={credentialDetails.course}
                onChange={(e) =>
                  setCredentialDetails({
                    ...credentialDetails,
                    course: e.target.value,
                  })
                }
              />
              <Input
                label="Endereço do estudante na blockchain"
                value={studentAddress}
                onChange={(e) => setStudentAddress(e.target.value)}
              />
            </div>
            <Button onClick={generateCredential}>Gerar Certificado</Button>
          </div>
        )}
        {selectedSection === "verify" && (
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
                label="Assinatura"
                value={validateCredential.signature}
                onChange={(e) =>
                  setValidateCredential({
                    ...validateCredential,
                    signature: e.target.value,
                  })
                }
              />
            </div>
            <Button onClick={validateCertificate}>Validar Certificado</Button>
          </div>
        )}
        {selectedSection === "generated" && (
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5 max-w-full">
              <p>Certificado emitido com sucesso!</p>

              <span>
                <div className="flex gap-2 items-center cursor-pointer">
                  <Copy
                    size={18}
                    color="#ffffff"
                    weight="bold"
                    onClick={() => {
                      navigator.clipboard.writeText(generatedDocumentHash);
                      alert("Hash copiado!");
                    }}
                  />
                  <p>Hash do documento:</p>
                </div>
                <p>
                  <strong>{generatedDocumentHash}</strong>
                </p>
              </span>
              <span className="flex flex-col w-full">
                <div className="flex gap-2 items-center cursor-pointer">
                  <Copy
                    size={18}
                    color="#ffffff"
                    weight="bold"
                    onClick={() => {
                      navigator.clipboard.writeText(generatedSignature);
                      alert("Assinatura copiada!");
                    }}
                  />
                  <p>Assinatura:</p>
                </div>
                <p className="break-all">
                  <strong>{generatedSignature}</strong>
                </p>
              </span>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};

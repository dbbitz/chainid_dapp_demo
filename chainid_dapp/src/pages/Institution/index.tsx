import { useState } from "react";
import { Button } from "../../components/Button";
import { Section } from "../../components/Section";
import { Input } from "../../components/Input";
import { Copy } from "@phosphor-icons/react";

export const Institution = () => {
  const [selectedSection, setSelectedSection] = useState<
    "generate" | "verify" | "revoke" | "generated"
  >("generate");

  const [credentialDetails, setCredentialDetails] = useState({
    name: "",
    ra: "",
    course: "",
    address: "",
  });

  const [generatedDocumentHash, setGeneratedDocumentHash] =
    useState<string>("");

    const [generatedDocumentSignature, setGeneratedDocumentSignature] = useState<string>("");

  const educationAddress = localStorage.getItem("account");

  const [studentAddress, setStudentAddress] = useState<string>("");

  const [validateCredential, setValidateCredential] = useState({
    hash: "",
    signature: "",
  });

  const [revokeCredential, setRevokeCredential] = useState({
    hash: "",
    studentAddress: "",
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
        `${import.meta.env.VITE_API_URL}/api/issue-credential`,
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
      setGeneratedDocumentSignature(data.signature);
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
        `${import.meta.env.VITE_API_URL}/api/validate-credential`,
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
      alert("Certificado Inválido");
    }
  };

  const revokeCertificate = async () => {
    try {
      const requestBody = {
        educationAddress: educationAddress,
        studentAddress: studentAddress,
        credentialHash: validateCredential.hash,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/revoke-credential`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      if (data.isRevoked) {
        alert("Certificado revogado");
      } else {
        alert("Erro ao revogar certificado");
      }
    } catch {
      console.error("Error verifying document");
      alert("Error verifying document");
    }
  }

  return (
    <Section>
      <div className="flex gap-3">
        <Button
          isSelected={selectedSection === "generate"}
          onClick={() => setSelectedSection("generate")}
        >
          Emitir Documento
        </Button>
        <Button
          isSelected={selectedSection === "verify"}
          onClick={() => setSelectedSection("verify")}
        >
          Verificar Documento
        </Button>
        <Button
          isSelected={selectedSection === "revoke"}
          onClick={() => setSelectedSection("revoke")}
        >Revogar Documento</Button>
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
                label="Assinatura do emissor"
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
        {
          selectedSection === "revoke" && (
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-3">
                <Input
                  label="Hash da credencial"
                  value={validateCredential.hash}
                  onChange={(e) =>
                    setRevokeCredential({
                      ...revokeCredential,
                      hash: e.target.value,
                    })
                  }
                />
                <Input
                  label="Endereço do estudante na blockchain"
                  value={studentAddress}
                  onChange={(e) => setRevokeCredential({ ...revokeCredential, studentAddress: e.target.value })}
                />
              </div>
              <Button onClick={revokeCertificate}>Revogar</Button>
            </div>
          )
        }
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
              <span>
                <div className="flex gap-2 items-center cursor-pointer">
                  <Copy
                    size={18}
                    color="#ffffff"
                    weight="bold"
                    onClick={() => {
                      navigator.clipboard.writeText(generatedDocumentSignature);
                      alert("Assinatura copiada!");
                    }}
                  />
                  <p>Assinatura do documento:</p>
                </div>
                <p className="text-wrap max-w-full">
                  <strong>{generatedDocumentSignature}</strong>
                </p>
              </span>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
import { useEffect, useState } from "react";
import { Section } from "../../components/Section";

interface Credential {
  credentialDate: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  credentialDetails: any;
  credentialHash: string;
  credentialType: string;
  educationalInstitutionAddress: string;
  studentAddress: string;
}

interface CredentialResponseData {
    credentialDate: string;
    credentialDetails: string;
    credentialHash: string;
    credentialType: string;
    educationalInstitutionAddress: string;
    studentAddress: string;
  }

export const Student = () => {
  const account = localStorage.getItem("account");

  const [credentials, setCredentials] = useState<Credential[]>();

  const getCredential = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/credential?studentAddress=${account}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      const processedData = data.map((credential: CredentialResponseData) => {
        let parsedDetails;
        try {
            parsedDetails = JSON.parse(credential.credentialDetails);
        } catch {
            parsedDetails = credential.credentialDetails; // Mantém o valor original se não for JSON válido
        }
    
        return {
            ...credential,
            credentialDetails: parsedDetails,
        };
    });

      setCredentials(processedData);
    } catch {
      console.error("Error verifying document");
    }
  };

  useEffect(() => {
    getCredential();
  }, []);

  return (
    <Section>
      {credentials && credentials.length > 0 && <p>Meus Certificados</p>}
      {credentials && credentials?.length > 0 ? credentials?.map((credential) => (
        <div className="flex flex-col border rounded-xl p-3 gap-2">
          <p className="text-xl bold pb-3">{credential.credentialType}:</p>
          <p>Nome: {credential.credentialDetails.name}</p>
          <p>RA: {credential.credentialDetails.ra}</p>
          <p>Curso: {credential.credentialDetails.course}</p>
          <p>
            Data de Emissão:{" "}
            {`${new Date(
              Number(credential.credentialDate)
            ).toLocaleDateString()}`}
          </p>
          <p>
            Hash do {credential.credentialType}: {credential.credentialHash}
          </p>
          <p>
            Endereço da Instituição: {credential.educationalInstitutionAddress}
          </p>
        </div>
      )): 
    <h1>
        Você não possui documentos
    </h1>
      }
    </Section>
  );
};

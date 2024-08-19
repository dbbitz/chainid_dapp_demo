import { useParams } from "react-router-dom";
import { Section } from "../../components/Section";

export const IssuedCertificate = () => {
    const { documentHash } = useParams();

    return (
        <Section>
        <h1>IssuedCertificate</h1>
        <p>{documentHash}</p>
        </Section>
    );
    }
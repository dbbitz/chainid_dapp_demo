/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "../../components/Button";
import { useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { useNavigate } from "react-router-dom";
import { Section } from "../../components/Section";

export const ConnectWallet = () => {
  const navigate = useNavigate();

  const [account, setAccount] = useState<string | null>(
    localStorage.getItem("account") || null
  );
  const [selectedRole, setSelectedRole] = useState<
    "institution" | "student" | "employer" | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    const provider = (await detectEthereumProvider()) as any;
    if (provider) {
      try {
        // Solicita permissões e contas em sequência
        await provider.request({
          method: "wallet_requestPermissions",
          params: [
            {
              eth_accounts: {},
            },
          ],
        });

        const accounts = await provider.request({
          method: "eth_requestAccounts",
        });

        // Verifica se há mais de uma conta e permite a seleção
        let selectedAccount;
        if (accounts.length > 1) {
          let accountList = "Select an account:\n";
          accounts.forEach((account: any, index: any) => {
            accountList += `${index + 1}. ${account}\n`;
          });

          const userInput = prompt(accountList, "1");

          if (userInput !== null) {
            const selectedAccountIndex = parseInt(userInput) - 1;
            if (
              selectedAccountIndex >= 0 &&
              selectedAccountIndex < accounts.length
            ) {
              selectedAccount = accounts[selectedAccountIndex];
            } else {
              selectedAccount = accounts[0];
            }
          } else {
            selectedAccount = accounts[0];
          }
        } else {
          selectedAccount = accounts[0];
        }

        setAccount(selectedAccount);
        console.log("Selected account:", selectedAccount);
        localStorage.setItem("account", selectedAccount);
        setError(null); // Limpa qualquer erro anterior
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        setError("Failed to connect to MetaMask. Please try again.");
      }
    } else {
      console.error("MetaMask is not installed!");
      setError(
        "MetaMask is not installed! Please install MetaMask to connect."
      );
    }
  };

  const checkRole = async () => {
    try {
      const endPoint = {
        institution: "is-instiution",
        student: "is-student",
        employer: "is-employer",
      };

      if (!selectedRole) {
        return;
      }

      const body = {
        address: account,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/${endPoint[selectedRole]}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      const nagivate = {
        institution: () => navigate("/institution"),
        student: () => navigate("/student"),
        employer: () => navigate("/employer"),
      };

      if (data.validRole) {
        nagivate[selectedRole]();
      } else {
        alert("Você não tem permissão para acessar essa página");
      }
    } catch (error) {
      console.error("Error checking role:", error);
    }
  };

  return (
    <Section>
      {account ? (
        <div className="flex gap-5 rounded-lg flex-col p-5">
          <div className="flex gap-3">
            <p>Conectado com a carteira: {account}</p>
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  localStorage.removeItem("account");
                  setAccount(null);
                }}
              >
                Desconectar
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-10 py-5 w-full">
            <p className="text-nowrap">Tipo de conta: </p>
            <div className="flex gap-3 w-full justify-between">
              <Button
                isSelected={selectedRole === "institution"}
                onClick={() => setSelectedRole("institution")}
              >
                Instituição
              </Button>
              <Button
                isSelected={selectedRole === "student"}
                onClick={() => setSelectedRole("student")}
              >
                Estudante
              </Button>
              <Button
                isSelected={selectedRole === "employer"}
                onClick={() => setSelectedRole("employer")}
              >
                Empregador
              </Button>
            </div>
          </div>
          <Button disabled={!selectedRole} onClick={checkRole}>
            Entrar
          </Button>
        </div>
      ) : (
        <div className="flex gap-5 rounded-lg flex-col p-5">
          <p>Conecte sua carteira para continuar</p>
          {error && <p className="text-red-500">{error}</p>}
          <Button onClick={connectWallet}>Conectar Carteira</Button>
        </div>
      )}
    </Section>
  );
};

const DEFAULT_RECIPIENTS = ["contact@achei.us", "santiago@achei.us"];

export const sendMail = async (
  name: string,
  contact: string,
  service: string,
  siteName: string = "Achei Solutions Inc",
  recipients: string | string[] = DEFAULT_RECIPIENTS
) => {
  try {
    const emailData = {
      to: Array.isArray(recipients) ? recipients : [recipients],
      subject: `Novo contato de ${name}`,
      name, // O backend usa esse valor
      contact, // O backend usa esse valor
      service, // O backend usa esse valor
      siteName, // O backend usa esse valor para personalizar o rodapé
    };

    const response = await fetch(
      "https://achei-email-sender.vercel.app/api/send-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData), // Agora enviamos apenas os dados brutos
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
        responseData.message || `Erro no servidor: ${response.status}`
      );
    }

    return {
      success: true,
      message: `E-mail enviado para ${responseData.data.recipientsCount} destinatário(s)!`,
      data: responseData,
    };
  } catch (error: unknown) {
    console.error("Erro completo:", error);

    const msg =
      error instanceof Error
        ? error.message
        : typeof error === "string"
        ? error
        : "Erro desconhecido";

    throw new Error(`Erro na comunicação com o servidor: ${msg}`);
  }
};

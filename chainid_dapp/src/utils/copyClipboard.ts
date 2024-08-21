export const copyToClipboard= (text: string) =>  {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Texto copiado para a área de transferência');
        alert('Texto copiado!');
      })
      .catch(err => {
        console.error('Falha ao copiar o texto: ', err);
      });
  }
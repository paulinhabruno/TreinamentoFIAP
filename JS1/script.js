const inputCpf = document.querySelector("#inputCpf");

const handeCpfInput = (event) => {

    alert(mascaraCpf(event.target.value));

}

inputCpf.addEventListener("input", handeCpfInput);

const mascaraCpf = (cpf) => {
    return cpf
      ? cpf
          .replace(/\D/g, "")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d{1,2})/, "$1-$2")
          .replace(/(-\d{2})\d+?$/, "$1")
      : "";
  };

const validaCpf = (cpf) => {
    var soma;
    var resto;
    soma = 0;
    if (cpf == "00000000000") return false;
  
    for (i = 1; i <= 9; i++) 
          soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  
    resto = (soma * 10) % 11;
  
    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(cpf.substring(9, 10))) return false;
  
    soma = 0;
    for (i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
  
    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(cpf.substring(10, 11))) return false;
    return true;
  }
  
// Função para validar o número do cartão de crédito
function validarCartao(numero) {
    const bandeiras = {
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        visa16: /^4[0-9]{15}$/,
        mastercard: /^5[1-5][0-9]{14}$/,
        amex: /^3[47][0-9]{13}$/,
        discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
        diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
        jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
        enroute: /^(?:2014|2149)\d{11}$/,
        voyager: /^8699[0-9]{11}$/,
        hipercard: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/,
        aura: /^50[0-9]{14,17}$/
    };

    // Função para validar usando o algoritmo de Luhn
    function validarLuhn(numero) {
        let soma = 0;
        let alternar = false;
        for (let i = numero.length - 1; i >= 0; i--) {
            let n = parseInt(numero.charAt(i), 10);
            if (alternar) {
                n *= 2;
                if (n > 9) n -= 9;
            }
            soma += n;
            alternar = !alternar;
        }
        return (soma % 10 === 0);
    }

    // Verificar a bandeira do cartão
    for (let bandeira in bandeiras) {
        if (bandeiras[bandeira].test(numero)) {
            return validarLuhn(numero) ? bandeira : 'Número de cartão inválido';
        }
    }

    return 'Bandeira desconhecida';
}

// Exemplo de uso
const numeroCartao = '5030181642664685';
const resultado = validarCartao(numeroCartao);
console.log(`Bandeira: ${resultado}`);
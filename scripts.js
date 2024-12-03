// Cotação de moedas no dia
const USD = 4,91
const EUR = 5,28
const GBP = 6,15

// Obtendo os elementos do formulário, criando vairaveis.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")


// Observando e re cuperando com AddEventListener oque o usuário está digitando, e validando para receber somente numeros.
amount.addEventListener("input", () => {

    const hasCharacterRegex = /\D+/g // Criando um Regex para identificar caracteres.
    amount.value = amount.value.replace(hasCharacterRegex, "") // Substituindo os caracteres encontrados, pora valor vazio "".
})

// Captando o submit do formlario
form.onsubmit = (event) => {
    event.preventDefault()

    switch (currency.value) {
        case "USD":
            convertCurrency(amount.value, USD, "US$")
            break
        
        case "EUR":
            convertCurrency(amount.value, EUR, "€")
            break
            
        case "GBP":
            convertCurrency(amount.value, GBP, "£")
            break
    }
}

// Função para converter
function convertCurrency(amount, price, symbol) {
    try {

        // Exibindo a cotação da moeda selecionada
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

        // Calcula o total.
        let total = (amount * price).toFixed(2)

        // Verifica se oresultado não é um número.
        if (isNaN(total)) {
            return alert("Pro favor, digite um valor válido para conversão")
        }
        
        // Formatar o valor total.
        total = formatCurrencyBRL(total).replace("R$", "")

        // Exibe o resultado total.
        result.textContent = `${total} Reais`

        // Aplicando uma classe que altera o footer para mostrar o resultado da conversão
        footer.classList.add("show-result")
    } catch (error) {
        console.log(error)

        // Remove a classe que altera o footer para mostrar o resultado da conversão
        footer.classList.remove("show-result")
        alert("Não foi possível converter. Tente novamente mais tarde.")
    }
}

// Formata a moeda em Real brasileiro
function formatCurrencyBRL(value) {
    // Converte para numero para utilizar o toLocleString para formatar no padrão BRL (R$ 00,00).
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}
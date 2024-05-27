module.exports = {
    name: "8ball",
    description: "Responde sua pergunta como uma bola 8 mágica",
    async execute(message, args) {
        const respostas = [
            "Com certeza.",
            "É decididamente assim.",
            "Sem dúvida.",
            "Sim – definitivamente.",
            "Você pode contar com isso.",
            "Como eu vejo, sim.",
            "Muito provável.",
            "As perspectivas são boas.",
            "Sim.",
            "Sinais apontam que sim.",
            "Resposta nebulosa, tente novamente.",
            "Pergunte novamente mais tarde.",
            "Melhor não te dizer agora.",
            "Não posso prever agora.",
            "Concentre-se e pergunte novamente.",
            "Não conte com isso.",
            "Minha resposta é não.",
            "Minhas fontes dizem que não.",
            "As perspectivas não são tão boas.",
            "Muito duvidoso.",
        ];

        const question = args.join(" ");
        if (!question) {
            return message.reply("Por favor, faça uma pergunta!");
        }

        const randomIndex = Math.floor(Math.random() * respostas.length);
        const resposta = respostas[randomIndex];
        message.reply(`🎱 ${resposta}`);
    },
};

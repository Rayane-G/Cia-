document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-contato');
    const totalContatos = document.getElementById('total-contatos');
    const msgSucesso = document.getElementById('sucesso-msg');

    const atualizarContador = () => {
        const dados = JSON.parse(localStorage.getItem('contatos')) || [];
        totalContatos.textContent = dados.length;
    };
    atualizarContador();

    // Máscara do Telefone
    document.getElementById('telefone').addEventListener('input', (e) => {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x ? x : '(' + x + ') ' + x + (x ? '-' + x : '');
    });

    // Contador de Caracteres
    document.getElementById('mensagem').addEventListener('input', (e) => {
        document.getElementById('letras').textContent = e.target.value.length;
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
        let valido = true;

        document.querySelectorAll('.erro').forEach(s => s.textContent = '');
        document.querySelectorAll('input, select, textarea').forEach(i => i.classList.remove('input-erro'));
        msgSucesso.className = 'sucesso-oculto';

        const verificar = (id, erroId, condicao, textoErro) => {
            const el = document.getElementById(id);
            if (condicao) {
                document.getElementById(erroId).textContent = textoErro;
                el.classList.add('input-erro');
                valido = false;
            }
        };

        verificar('nome', 'e-nome', document.getElementById('nome').value.trim() === '', 'Nome obrigatório.');
        
        const email = document.getElementById('email').value.trim();
        verificar('email', 'e-email', email === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), 'E-mail inválido.');
        
        verificar('telefone', 'e-telefone', document.getElementById('telefone').value.replace(/\D/g, '').length < 10, 'Telefone inválido.');
        verificar('motivo', 'e-motivo', document.getElementById('motivo').value === '', 'Selecione um motivo.');
        verificar('mensagem', 'e-mensagem', document.getElementById('mensagem').value.trim() === '', 'Escreva uma mensagem.');
        verificar('termos', 'e-termos', !document.getElementById('termos').checked, 'Aceite os termos.');

        if (valido) {
            let lista = JSON.parse(localStorage.getItem('contatos')) || [];
            lista.push({ nome: document.getElementById('nome').value, email });
            localStorage.setItem('contatos', JSON.stringify(lista));

            msgSucesso.className = 'sucesso-visivel';
            atualizarContador();
            form.reset();
            document.getElementById('letras').textContent = '0';
        }
    });
});

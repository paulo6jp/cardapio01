document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartList = document.querySelector('.list-group');
    const totalElement = document.getElementById('total');
    const sendToWhatsappButton = document.getElementById('send-to-whatsapp');
    let total = 0;
    let cartItems = [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.parentElement;
            const title = card.querySelector('.card-title').innerText;
            const price = parseFloat(card.querySelector('.price').innerText.replace('R$ ', ''));

            total += price;
            totalElement.innerText = total.toFixed(2);

            const cartItem = document.createElement('li');
            cartItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            cartItem.innerHTML = `${title} - R$ ${price.toFixed(2)}`;

            const removeButton = document.createElement('button');
            removeButton.classList.add('btn', 'btn-danger', 'btn-sm');
            removeButton.innerText = 'Remover';

            removeButton.addEventListener('click', function() {
                total -= price;
                totalElement.innerText = total.toFixed(2);
                cartItem.remove();
                cartItems = cartItems.filter(item => item.title !== title);
            });

            cartItem.appendChild(removeButton);
            cartList.appendChild(cartItem);
            cartItems.push({ title, price });
        });
    });

    sendToWhatsappButton.addEventListener('click', function() {
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const payment = document.getElementById('payment').value;

        const message = cartItems.map(item => `${item.title} - R$ ${item.price.toFixed(2)}`).join('\n');
        const totalMessage = `Total: R$ ${total.toFixed(2)}`;
        const additionalInfo = `\n\nNome: ${name}\nEndereço: ${address}\nForma de Pagamento: ${payment}`;
        const whatsappMessage = `Lista de Pedidos:\n${message}\n\n${totalMessage}${additionalInfo}`;
        
        // Verificação do comprimento do URL e simplificação se necessário
        if (whatsappMessage.length > 2000) {
            alert("A mensagem é muito longa para ser enviada pelo WhatsApp.");
        } else {
            const whatsappUrl = `https://api.whatsapp.com/send?phone=5561994078277&text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');
        }
    });
});

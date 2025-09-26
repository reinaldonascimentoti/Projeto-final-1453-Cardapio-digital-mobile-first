const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function adicionarItem(nome, preco) {
  const existente = carrinho.find((item) => item.nome === nome);
  if (existente) {
    existente.quantidade += 1;
  } else {
    carrinho.push({ nome, preco, quantidade: 1 });
  }
  salvarCarrinho();
  renderizarCarrinho();
}

function alterarQuantidade(nome, delta) {
  const item = carrinho.find((i) => i.nome === nome);
  if (item) {
    item.quantidade += delta;
    if (item.quantidade <= 0) {
      const index = carrinho.indexOf(item);
      carrinho.splice(index, 1);
    }
    salvarCarrinho();
    renderizarCarrinho();
  }
}
function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function renderizarCarrinho() {
  const div = document.getElementById("carrinho");
  div.innerHTML = ``;
  let total = 0;
  let quantidadeTotal = 0;

  carrinho.forEach((item) => {
    const subtotal = item.quantidade * item.preco;
    total += subtotal;
    quantidadeTotal += item.quantidade;

    const linha = document.createElement("div");
    linha.className = "item-carrinho";
    linha.innerHTML = ` <img src="/src/Logo-saborx.png" alt="" width="60px"></td>
      ${item.nome}`;
    div.appendChild(linha);

    let linhaQuant = document.createElement("div");
    linhaQuant.className = "item-quant";
    linhaQuant.innerHTML = `<div class="controles"> 
    <div id="box-quant">
    <div>
    <button id="btn-mais" onclick="adicionarItem('${item.nome}', ${
      item.preco
    })">+</button>
    </div>
    <div>${item.quantidade}</div>
    <div><button id="btn-menos" onclick="alterarQuantidade('${
      item.nome
    }', -1)">- </button>
    </div>
    </div>
    <div id="sub-total">
        <span>R$ ${subtotal.toFixed(2).replace(".", ",")}</span>
      </div>
         </div>
         <div>
         <hr>
         </div>

         
    `;
    div.appendChild(linhaQuant);
  });

  const totalDiv = document.createElement("div");
  totalDiv.className = "cart-total";
  totalDiv.innerHTML = `
  <div>
   <strong>Total: R$ ${total.toFixed(2).replace(".", ",")}</strong>
    </div>`;
  div.appendChild(totalDiv);

  // Atualiza o contador no ícone
  const contador = document.getElementById("carrinho-contador");
  if (quantidadeTotal > 0) {
    contador.textContent = quantidadeTotal;
    contador.style.display = "inline-block";
  } else {
    contador.style.display = "none";
  }
}

// const icone = document.getElementById("carrinho-icon");
// const menu = document.querySelector(".container-produto");
// icone.addEventListener("click", () => {
//   menu.classList = "hidden";
// });

renderizarCarrinho();

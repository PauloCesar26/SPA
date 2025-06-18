const app = document.getElementById("app");
const links = document.querySelectorAll("a[data-link]");
const routes = {
  "/": "/pages/index.html",
  "/page1": "/pages/page1/index.html",
  "/page2": "/pages/page2/index.html",
};

// Carrega e exibe o conteúdo da rota
//path é a parte da URL e rota atual como "/", "/page1" que é usado para identificar qual conteudo deve ser carregado no SPA
    //path é passado quando o user clica em um link ou rota 
const render = async (path) => {
    const route = routes[path] || "/pages/index.html";

    try{
        const req = await fetch(route);
        if(!req.ok){
            app.innerHTML = `<h1>Erro ${req.status}</h1>`;
        }
        const res = await req.text();
        app.innerHTML = res;
    }
    catch{
        console.error("Erro ao carregar a página:", err);
        app.innerHTML = "<h1>Erro ao carregar a página</h1>";
    }
};

// Navega para nova rota
//history.pushState() é um metodo que permite mudar a URL da barra de navegação sem recarregar a pagina 
    //ele muda a URL e a function render muda o conteudo da pagina pegando o path atual, que foi clicado
const navigate = (e) => {
    e.preventDefault();
    const path = e.target.getAttribute("href");
    history.pushState({}, "", path);
    render(path);
};

//Evento quando clica voltar/avançar no navegador
window.onpopstate = () => {
    render(location.pathname);   
};

//DOMContentLoaded é um evento disparado quando o navegador termina de carregar todo o HTML foi lido e o DOM está completamente montado
document.addEventListener("DOMContentLoaded", () => {
  links.forEach(link => {
    link.addEventListener("click", navigate);
  });
  render(location.pathname);
});

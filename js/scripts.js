/* $("#div1").mouseenter(function () {
    alert("Ingresaste al div 1!");
}); */

/* $("#div1").mouseleave(function () {
    alert("Saliste del div 1!");
}); */

function disparar(mostrar) {
    Toastify({
        text: mostrar,
        duration: 3500,
        close: true
    }).showToast();
}

function handlerDispar(evento) {
    console.log("evento", evento);
    const texto = evento.type === "mousedown"
        ? $(evento.target).data("text")
        : $(evento.target).data("text2")
    disparar(texto)
}


$("#div1").mousedown(
    handlerDispar
);

function alerta() {
    alert("Texto")
}

$("#div1").click(
    alerta
)

$("#div1").mouseup(
    handlerDispar
);

/* $("#div1")
.on("mouseenter",() => {
    Toastify({
        text: "Entraste",
        duration: 1500,
        close: true
    }).showToast();
})
.on("mouseleave", ()=>{
    Toastify({
        text: "Saliste",
        duration: 1500,
        close: true
    }).showToast();
}); */

/* setTimeout(function () {

    $("#div1").mousedown()
},6000) */

$("#div1")
    .hover(
        handlerDispar    
    , () => {
        Toastify({
            text: "Saliste",
            duration: 1500,
            close: true
        }).showToast();
    })
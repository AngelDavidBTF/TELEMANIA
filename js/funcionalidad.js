var articulos;

/* FUNCIONES GENERICAS*/
function AJAXCrearObjeto() {
    if (window.XMLHttpRequest) {
// navegadores que siguen los estándares
        objetoAjax = new XMLHttpRequest();
    } else {
// navegadores obsoletos
        objetoAjax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return objetoAjax;
}

function cargarCategorias(){
	objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', 'php/getCategorias.php');
    objetoAjax.send();
    objetoAjax.onreadystatechange = function () {
        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
           // alert(objetoAjax.responseText);
           	mostrarCategorias();
           	pantallaPrincipal();
        }
    }
}

function pantallaPrincipal(){
	objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', 'php/getPantallaPrincipal.php');
    objetoAjax.send();
    objetoAjax.onreadystatechange = function () {
        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
           	var datos = objetoAjax.responseText;
   		 	var objeto = JSON.parse(datos);
   		 	articulos=objeto;
   		 	var padre = document.getElementById("padrePrinp");
   		 	for (var i = 0; i < articulos.length; i++) {
   		 		articulos[i].cantidad = 0;
				var div = document.createElement("div");
			    div.setAttribute("class", "row");
			    padre.appendChild(div);
			    var div2 = document.createElement("div");
			    div2.setAttribute("class", "col-xs-12 col-md-12 col-lg-12 content_home");
			    div.appendChild(div2);
			    var h2 = document.createElement("h2");
			    h2.setAttribute("id","articulo"+i);
			    div2.appendChild(h2);
			    var a = document.createElement("a");
			   	div2.appendChild(a);
			   	var img = document.createElement("img");
			   	img.setAttribute("class", "pull-left book_home_r");
			   	img.setAttribute("id","imagenArticulo"+i);
			   	img.setAttribute("width", "50%");
			   	a.appendChild(img);
			   	var p = document.createElement("p");
			    p.setAttribute("id", "descripcionArticulo"+i);
			    div2.appendChild(p);
			    var p2 = document.createElement("p");
			    p2.setAttribute("class","lead");
			    div2.appendChild(p2);
			    var h1 = document.createElement("h1");
			    h1.setAttribute("id","precio"+i);
			    p2.appendChild(h1);
			    var boton = document.createElement("button");
			    boton.setAttribute("class", "btn btn-default");

			    boton.setAttribute("onclick", "addCarrito("+articulos[i].idArticulo+");");

			    p2.appendChild(boton);

			    var boton1 = document.createElement("button");
			    boton1.setAttribute("class", "btn btn-default");
			    boton1.setAttribute("onclick", "detalleArticulo("+articulos[i].idArticulo+");");
			    p2.appendChild(boton1);
			    var detalle = document.createTextNode("VER MÁS");
			    boton1.appendChild(detalle);

			    var icon = document.createElement("i");
			    icon.setAttribute("class","fas fa-cart-plus");
			    icon.setAttribute("aria-hidden","true");
			    boton.appendChild(icon);
			    var carrito = document.createTextNode(" Añadir al carrito");
			    boton.appendChild(carrito);
			    var nombreArticulo = document.getElementById("articulo"+i);
	   		 	var articulo = document.getElementById("descripcionArticulo"+i);
	   		 	var imagenArticulo = document.getElementById("imagenArticulo"+i);
	   		 	var precioArticulo = document.getElementById("precio"+i);
	   		 	precioArticulo.style.color = '#e67300';
	   		 	precioArticulo.innerHTML = articulos[i].precioArtAlmacen + " €";
	   		 	nombreArticulo.innerHTML = articulos[i].denomArticulo;
	   		 	articulo.innerHTML = articulos[i].descripcionArticulo;
	   		 	imagenArticulo.setAttribute("src", articulos[i].fotoArticulo);
    		}
        }
    }
}

function cargarInterfazCategoria(cat){
	borrarPadre();
	var divP = document.getElementById("conteinedir");
			var padre = document.createElement("section");
			padre.setAttribute("id","padre");
			divP.appendChild(padre);
			var contenido = document.createElement("div");
		    contenido.setAttribute("class", "row");
		    padre.appendChild(contenido);

	var categoria = [];

	for (var i = 0; i < articulos.length ; i++) {
	    if (articulos[i].idCatArticulo == cat) {
	        categoria.push(articulos[i]);
	    }
	}

	for (var i = 0; i < categoria.length; i++) {
		    var fila = document.createElement("div");
		    fila.setAttribute("class", "col-md-4");
		    contenido.appendChild(fila);
		    var paneld = document.createElement("div");
		    paneld.setAttribute("class", "panel panel-default");
		    fila.appendChild(paneld);
		    var panelb = document.createElement("div");
		    paneld.setAttribute("class", "panel-body");
		    paneld.appendChild(panelb);
		    var divFila = document.createElement("div");
		    divFila.setAttribute("class","row");
		    panelb.appendChild(divFila);
		    var divMd = document.createElement("div");
		    divMd.setAttribute("class","col-md-4");
		    divFila.appendChild(divMd);
		    var img = document.createElement("img");
		    img.setAttribute("id","imagenArticulo"+i);
		    img.setAttribute("class","img-responsive");
		    divMd.appendChild(img);
		    var divMd8 = document.createElement("div");
		    divMd8.setAttribute("class","col-md-8");
		    divFila.appendChild(divMd8);
		    var h6 = document.createElement("h6");
		    h6.setAttribute("id","articulo"+i);
		    divMd8.appendChild(h6);
		    var p = document.createElement("p");
		    p.setAttribute("style","font-size: 12px;");
		    p.setAttribute("id","descripcionArticulo"+i);
		    divMd8.appendChild(p);

		    var h1 = document.createElement("h4");
			h1.setAttribute("id","precio"+i);
			divMd8.appendChild(h1);

		    var boton = document.createElement("button");
			boton.setAttribute("class", "btn btn-success btn-xs");
			boton.setAttribute("onclick", "addCarrito("+categoria[i].idArticulo+");");
			divMd8.appendChild(boton);
			var icon = document.createElement("i");
			icon.setAttribute("class","fas fa-cart-plus");
			icon.setAttribute("aria-hidden","true");
			boton.appendChild(icon);
			var carrito = document.createTextNode(" Añadir al carrito");
			boton.appendChild(carrito);
			var boton1 = document.createElement("button");
			boton1.setAttribute("class", "btn btn-default btn-xs");
			boton1.setAttribute("onclick", "detalleArticulo("+articulos[i].idArticulo+");");
			divMd8.appendChild(boton1);
			var detalle = document.createTextNode("VER MÁS");
			boton1.appendChild(detalle);

			var nombreArticulo = document.getElementById("articulo"+i);
		    var articulo = document.getElementById("descripcionArticulo"+i);
		   	var imagenArticulo = document.getElementById("imagenArticulo"+i);
		   	var precioArticulo = document.getElementById("precio"+i);
		   	precioArticulo.style.color = '#e67300';
	   		precioArticulo.innerHTML =categoria[i].precioArtAlmacen + " €";
		   	nombreArticulo.innerHTML = categoria[i].denomArticulo;
	   		articulo.innerHTML = categoria[i].descripcionArticulo;
	   		imagenArticulo.setAttribute("src", categoria[i].fotoArticulo);
		}
}

function mostrarCategorias() {
    var datos = objetoAjax.responseText;
    var objeto = JSON.parse(datos);
    for (var i = 0; i < objeto.length; i++) {
			var categoria = document.getElementById("categoria-"+i);
			categoria.innerHTML = " "+objeto[i];	
	    }
} 

function cargarMarcas(cat){
           	objetoAjax = AJAXCrearObjeto(); //crea el objeto
		    objetoAjax.open('GET', 'php/getMarcas.php');
		    objetoAjax.send();
		    objetoAjax.onreadystatechange = function () {
		    if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
           //alert(objetoAjax.responseText);
           	mostrarMarcas(cat);
        }
    }
}

function mostrarMarcas(cat) {
     var datos = objetoAjax.responseText;
	 var objeto = JSON.parse(datos);

    if(cat == 1){
	   	var padre = document.getElementById("collapse1");
	   	var ul = document.getElementById("ulPadreMarca");
	   	if(document.getElementById("ulPadreMarca")){
	   	padre.removeChild(ul);
	   	}
		var ul = document.createElement("ul");
		ul.setAttribute("class","list-group");
		ul.setAttribute("id","ulPadreMarca");
		padre.appendChild(ul);
		var contador = 0;
	    for (var i = 0; i < objeto.length; i++) {
	    	if(objeto[i].idCatArticulo == 1){
				var li = document.createElement("li");
			    li.setAttribute("class", "list-group-item");
			    ul.appendChild(li);
			    var a = document.createElement("a");
			    a.setAttribute("id", "marca-"+i);
			    a.setAttribute("onclick","cargarInterfazMarca(1,this.textContent)");
			    a.setAttribute("style","cursor: pointer;");
			    li.appendChild(a);
			   	a.innerHTML = objeto[i].marca;
			   	contador++;
			   	var numeroMarca = document.getElementById("numeroMarca");
	    		numeroMarca.innerHTML = contador;
				}
	    }
	}
	if(cat == 2){
	   	var padre = document.getElementById("collapse4");
	   	var ul = document.getElementById("ulPadreMarcaM");
	   	if(document.getElementById("ulPadreMarcaM")){
	   	padre.removeChild(ul);
	   	}
		var ul = document.createElement("ul");
		ul.setAttribute("class","list-group");
		ul.setAttribute("id","ulPadreMarcaM");
		padre.appendChild(ul);
		var contador = 0;
	    for (var i = 0; i < objeto.length; i++) {
	    	if(objeto[i].idCatArticulo == 2){
				var li = document.createElement("li");
			    li.setAttribute("class", "list-group-item");
			    ul.appendChild(li);
			    var a = document.createElement("a");
			    a.setAttribute("id", "marca-"+i);
			    a.setAttribute("onclick","cargarInterfazMarca(2,this.textContent)");
			    a.setAttribute("style","cursor: pointer;");
			    li.appendChild(a);
			    a.innerHTML = objeto[i].marca;
			    contador++;
			    var numeroMarca = document.getElementById("numeroMarcaM");
	    		numeroMarca.innerHTML = contador;
			}
	    }
	}
}


function cargarInterfazMarca(cat, marc){
	borrarPadre();
	var divP = document.getElementById("conteinedir");
			var padre = document.createElement("section");
			padre.setAttribute("id","padre");
			divP.appendChild(padre);
			var contenido = document.createElement("div");
		    contenido.setAttribute("class", "row");
		    padre.appendChild(contenido);

	 var marcas = [];
	 for (var i = 0; i < articulos.length ; i++) {
	    if (articulos[i].idCatArticulo == cat && articulos[i].marca == marc) {
	        marcas.push(articulos[i]);
	    }
	}

	for (var i = 0; i < marcas.length; i++) {
		    var fila = document.createElement("div");
		    fila.setAttribute("class", "col-md-4");
		    contenido.appendChild(fila);
		    var paneld = document.createElement("div");
		    paneld.setAttribute("class", "panel panel-default");
		    fila.appendChild(paneld);
		    var panelb = document.createElement("div");
		    paneld.setAttribute("class", "panel-body");
		    paneld.appendChild(panelb);
		    var divFila = document.createElement("div");
		    divFila.setAttribute("class","row");
		    panelb.appendChild(divFila);
		    var divMd = document.createElement("div");
		    divMd.setAttribute("class","col-md-4");
		    divFila.appendChild(divMd);
		    var img = document.createElement("img");
		    img.setAttribute("id","imagenArticulo"+i);
		    img.setAttribute("class","img-responsive");
		    divMd.appendChild(img);
		    var divMd8 = document.createElement("div");
		    divMd8.setAttribute("class","col-md-8");
		    divFila.appendChild(divMd8);
		    var h6 = document.createElement("h6");
		    h6.setAttribute("id","articulo"+i);
		    divMd8.appendChild(h6);
		    var p = document.createElement("p");
		    p.setAttribute("style","font-size: 12px;");
		    p.setAttribute("id","descripcionArticulo"+i);
		    divMd8.appendChild(p);

		    var h1 = document.createElement("h4");
			h1.setAttribute("id","precio"+i);
			divMd8.appendChild(h1);

		    var boton = document.createElement("button");
			boton.setAttribute("class", "btn btn-success btn-xs");
			boton.setAttribute("onclick", "addCarrito("+marcas[i].idArticulo+");");
			divMd8.appendChild(boton);
			var icon = document.createElement("i");
			icon.setAttribute("class","fas fa-cart-plus");
			icon.setAttribute("aria-hidden","true");
			boton.appendChild(icon);
			var carrito = document.createTextNode(" Añadir al carrito");
			boton.appendChild(carrito);
			var boton1 = document.createElement("button");
			boton1.setAttribute("class", "btn btn-default btn-xs");
			boton1.setAttribute("onclick", "detalleArticulo("+marcas[i].idArticulo+");");
			divMd8.appendChild(boton1);
			var detalle = document.createTextNode("VER MÁS");
			boton1.appendChild(detalle);

			var nombreArticulo = document.getElementById("articulo"+i);
		    var articulo = document.getElementById("descripcionArticulo"+i);
		   	var imagenArticulo = document.getElementById("imagenArticulo"+i);
		   	var precioArticulo = document.getElementById("precio"+i);
		   	precioArticulo.style.color = '#e67300';
	   		precioArticulo.innerHTML = marcas[i].precioArtAlmacen + " €";
		   	nombreArticulo.innerHTML = marcas[i].denomArticulo;
	   		articulo.innerHTML = marcas[i].descripcionArticulo;
	   		imagenArticulo.setAttribute("src", marcas[i].fotoArticulo);
		}
}


function cargarResolucion(cat){
	objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', 'php/getResolucion.php');
    objetoAjax.send();
    objetoAjax.onreadystatechange = function () {
        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
           //alert(objetoAjax.responseText);
           mostrarResolucion(cat);
        }
    }
}

function mostrarResolucion(cat) {
   	var datos = objetoAjax.responseText;
	var objeto = JSON.parse(datos);
   	if(cat == 1){
	   	var padre = document.getElementById("collapse2");
	   	var ul = document.getElementById("ulPadreResolucion");
	   	if(document.getElementById("ulPadreResolucion")){
	   	padre.removeChild(ul);
	   	}
		var ul = document.createElement("ul");
		ul.setAttribute("class","list-group");
		ul.setAttribute("id","ulPadreResolucion");
		padre.appendChild(ul);
		var contador = 0;
	    for (var i = 0; i < objeto.length; i++) {
	    	if(objeto[i].idCatArticulo == 1){
				var li = document.createElement("li");
			    li.setAttribute("class", "list-group-item");
			    ul.appendChild(li);
			    var a = document.createElement("a");
			    a.setAttribute("id", "resolucion-"+i);
			    a.setAttribute("onclick","cargarInterfazResolucion(1,this.textContent)");
			    a.setAttribute("style","cursor: pointer;");
			    li.appendChild(a);
			    a.innerHTML = objeto[i].resolucion;
			    contador++;
			    var numeroResolucion = document.getElementById("numeroResolucion");
	    		numeroResolucion.innerHTML = contador;
	    	}
	    }
	}
	if(cat == 2){
	   	var padre = document.getElementById("collapse5");
	   	var ul = document.getElementById("ulPadreResolucionM");
	   	if(document.getElementById("ulPadreResolucionM")){
	   	padre.removeChild(ul);
	   	}
		var ul = document.createElement("ul");
		ul.setAttribute("class","list-group");
		ul.setAttribute("id","ulPadreResolucionM");
		padre.appendChild(ul);
		var contador = 0;
	    for (var i = 0; i < objeto.length; i++) {
	    	if(objeto[i].idCatArticulo == 2){
				var li = document.createElement("li");
			    li.setAttribute("class", "list-group-item");
			    ul.appendChild(li);
			    var a = document.createElement("a");
			    a.setAttribute("id", "resolucion-"+i);
			    a.setAttribute("onclick","cargarInterfazResolucion(2,this.textContent)");
			    a.setAttribute("style","cursor: pointer;");
			    li.appendChild(a);
			    a.innerHTML = objeto[i].resolucion;
			    contador++;
			    var numeroResolucion = document.getElementById("numeroResolucionM");
	    		numeroResolucion.innerHTML = contador;
	    	}
	    }
	}
}

function cargarInterfazResolucion(cat, resoluc){
	borrarPadre();
	var divP = document.getElementById("conteinedir");
			var padre = document.createElement("section");
			padre.setAttribute("id","padre");
			divP.appendChild(padre);
			var contenido = document.createElement("div");
		    contenido.setAttribute("class", "row");
		    padre.appendChild(contenido);

		var resolu = [];
		 for (var i = 0; i < articulos.length ; i++) {
		    if (articulos[i].idCatArticulo == cat && articulos[i].resolucion == resoluc) {
		        resolu.push(articulos[i]);
		    }
		}

	for (var i = 0; i < resolu.length; i++) {
		    var fila = document.createElement("div");
		    fila.setAttribute("class", "col-md-4");
		    contenido.appendChild(fila);
		    var paneld = document.createElement("div");
		    paneld.setAttribute("class", "panel panel-default");
		    fila.appendChild(paneld);
		    var panelb = document.createElement("div");
		    paneld.setAttribute("class", "panel-body");
		    paneld.appendChild(panelb);
		    var divFila = document.createElement("div");
		    divFila.setAttribute("class","row");
		    panelb.appendChild(divFila);
		    var divMd = document.createElement("div");
		    divMd.setAttribute("class","col-md-4");
		    divFila.appendChild(divMd);
		    var img = document.createElement("img");
		    img.setAttribute("id","imagenArticulo"+i);
		    img.setAttribute("class","img-responsive");
		    divMd.appendChild(img);
		    var divMd8 = document.createElement("div");
		    divMd8.setAttribute("class","col-md-8");
		    divFila.appendChild(divMd8);
		    var h6 = document.createElement("h6");
		    h6.setAttribute("id","articulo"+i);
		    divMd8.appendChild(h6);
		    var p = document.createElement("p");
		    p.setAttribute("style","font-size: 12px;");
		    p.setAttribute("id","descripcionArticulo"+i);
		    divMd8.appendChild(p);
		    var h1 = document.createElement("h4");
			h1.setAttribute("id","precio"+i);
			divMd8.appendChild(h1);
		    var boton = document.createElement("button");
			boton.setAttribute("class", "btn btn-success btn-xs");
			boton.setAttribute("onclick", "addCarrito("+resolu[i].idArticulo+");");
			divMd8.appendChild(boton);
			var icon = document.createElement("i");
			icon.setAttribute("class","fas fa-cart-plus");
			icon.setAttribute("aria-hidden","true");
			boton.appendChild(icon);
			var carrito = document.createTextNode(" Añadir al carrito");
			boton.appendChild(carrito);
			var boton1 = document.createElement("button");
			boton1.setAttribute("class", "btn btn-default btn-xs");
			boton1.setAttribute("onclick", "detalleArticulo("+resolu[i].idArticulo+");");
			divMd8.appendChild(boton1);
			var detalle = document.createTextNode("VER MÁS");
			boton1.appendChild(detalle);

			var nombreArticulo = document.getElementById("articulo"+i);
		    var articulo = document.getElementById("descripcionArticulo"+i);
		   	var imagenArticulo = document.getElementById("imagenArticulo"+i);
		   	
			var precioArticulo = document.getElementById("precio"+i);
	   		precioArticulo.style.color = '#e67300';
	   		precioArticulo.innerHTML = resolu[i].precioArtAlmacen + " €";
		   	nombreArticulo.innerHTML = resolu[i].denomArticulo;
	   		articulo.innerHTML = resolu[i].descripcionArticulo;
	   		imagenArticulo.setAttribute("src", resolu[i].fotoArticulo);
	}
}

function cargarPulgadas(cat){
	objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', 'php/getPulgadas.php');
    objetoAjax.send();
    objetoAjax.onreadystatechange = function () {
        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
           //alert(objetoAjax.responseText);
           		mostrarPulgadas(cat);
        }
    }
}

function mostrarPulgadas(cat) {
    var datos = objetoAjax.responseText;
    var objeto = JSON.parse(datos);
	if(cat == 1){
	   	var padre = document.getElementById("collapse3");
	   	var ul = document.getElementById("ulPadrePulgadas");
	   	if(document.getElementById("ulPadrePulgadas")){
	   	padre.removeChild(ul);
	   	}
		var ul = document.createElement("ul");
		ul.setAttribute("class","list-group");
		ul.setAttribute("id","ulPadrePulgadas");
		padre.appendChild(ul);
		var contador = 0;
	    for (var i = 0; i < objeto.length; i++) {
	    	if(objeto[i].idCatArticulo == 1){
				var li = document.createElement("li");
			    li.setAttribute("class", "list-group-item");
			    ul.appendChild(li);
			    var a = document.createElement("a");
			    a.setAttribute("id", "pulgadas-"+i);
			    a.setAttribute("onclick","cargarInterfazPulgadas(1,this.textContent)");
			    a.setAttribute("style","cursor: pointer;");
			    li.appendChild(a);
			    a.innerHTML = objeto[i].pulgadas;
			    contador++;
			    var numeroPulgadas = document.getElementById("numeroPulgadas");
	    		numeroPulgadas.innerHTML = contador;
			}
	    }
	}

	if(cat == 2){
		var padre = document.getElementById("collapse6");
	   	var ul = document.getElementById("ulPadrePulgadasM");
	   	if(document.getElementById("ulPadrePulgadasM")){
	   	padre.removeChild(ul);
	   	}
		var ul = document.createElement("ul");
		ul.setAttribute("class","list-group");
		ul.setAttribute("id","ulPadrePulgadasM");
		padre.appendChild(ul);
		var contador = 0;
	    for (var i = 0; i < objeto.length; i++) {
	    	if(objeto[i].idCatArticulo == 2){
				var li = document.createElement("li");
			    li.setAttribute("class", "list-group-item");
			    ul.appendChild(li);
			    var a = document.createElement("a");
			    a.setAttribute("id", "pulgadas-"+i);
			    a.setAttribute("onclick","cargarInterfazPulgadas(2,this.textContent)");
			    a.setAttribute("style","cursor: pointer;");
			    li.appendChild(a);
			    a.innerHTML = objeto[i].pulgadas;
			    contador++;
			    var numeroPulgadas = document.getElementById("numeroPulgadasM");
	    		numeroPulgadas.innerHTML = contador;
			}
	    }
	}
}

function cargarInterfazPulgadas(cat,pulgada){
	borrarPadre();
	var divP = document.getElementById("conteinedir");
			var padre = document.createElement("section");
			padre.setAttribute("id","padre");
			divP.appendChild(padre);
			var contenido = document.createElement("div");
		    contenido.setAttribute("class", "row");
		    padre.appendChild(contenido);

		    var pulgad = [];
			 for (var i = 0; i < articulos.length ; i++) {
			    if (articulos[i].idCatArticulo == cat && articulos[i].pulgadas == pulgada) {
			        pulgad.push(articulos[i]);
			    }
			}

		for (var i = 0; i < pulgad.length; i++) {
		    var fila = document.createElement("div");
		    fila.setAttribute("class", "col-md-4");
		    contenido.appendChild(fila);
		    var paneld = document.createElement("div");
		    paneld.setAttribute("class", "panel panel-default");
		    fila.appendChild(paneld);
		    var panelb = document.createElement("div");
		    paneld.setAttribute("class", "panel-body");
		    paneld.appendChild(panelb);
		    var divFila = document.createElement("div");
		    divFila.setAttribute("class","row");
		    panelb.appendChild(divFila);
		    var divMd = document.createElement("div");
		    divMd.setAttribute("class","col-md-4");
		    divFila.appendChild(divMd);
		    var img = document.createElement("img");
		    img.setAttribute("id","imagenArticulo"+i);
		    img.setAttribute("class","img-responsive");
		    divMd.appendChild(img);
		    var divMd8 = document.createElement("div");
		    divMd8.setAttribute("class","col-md-8");
		    divFila.appendChild(divMd8);
		    var h6 = document.createElement("h6");
		    h6.setAttribute("id","articulo"+i);
		    divMd8.appendChild(h6);
		    var p = document.createElement("p");
		    p.setAttribute("style","font-size: 12px;");
		    p.setAttribute("id","descripcionArticulo"+i);
		    divMd8.appendChild(p);
		    var boton = document.createElement("button");
			boton.setAttribute("class", "btn btn-success btn-xs");
			boton.setAttribute("onclick", "addCarrito("+pulgad[i].idArticulo+");");
			divMd8.appendChild(boton);
			var icon = document.createElement("i");
			icon.setAttribute("class","fas fa-cart-plus");
			icon.setAttribute("aria-hidden","true");
			boton.appendChild(icon);
			var carrito = document.createTextNode(" Añadir al carrito");
			boton.appendChild(carrito);
			var boton1 = document.createElement("button");
			boton1.setAttribute("class", "btn btn-default btn-xs");
			boton1.setAttribute("onclick", "detalleArticulo("+pulgad[i].idArticulo+");");
			divMd8.appendChild(boton1);
			var detalle = document.createTextNode("VER MÁS");
			boton1.appendChild(detalle);

			var nombreArticulo = document.getElementById("articulo"+i);
		    var articulo = document.getElementById("descripcionArticulo"+i);
		   	var imagenArticulo = document.getElementById("imagenArticulo"+i);

		   	nombreArticulo.innerHTML = pulgad[i].denomArticulo;
	   		articulo.innerHTML = pulgad[i].descripcionArticulo;
	   		imagenArticulo.setAttribute("src", pulgad[i].fotoArticulo);
	}
}

function detalleArticulo(idArt){
	borrarPadre();
	var divP = document.getElementById("conteinedir");
	var padre = document.createElement("section");
	padre.setAttribute("id","padre");
	divP.appendChild(padre);
	var contenido = document.createElement("div");
	contenido.setAttribute("class", "row");
	padre.appendChild(contenido);

	for (var i = 0; i < articulos.length; i++) {	
		if(idArt == articulos[i].idArticulo){
			$('#padre').append('<div class="col-xs-12 col-md-12 col-lg-12 content_home"> <h2 id="nombre">Detalle del libro</h2> <img class="pull-left book_home_r" id="imagen" src="" alt="imagen de artículo" title="imagen de artículo" style="width: 50%;"> <p><strong>Marca:</strong><span id="marca"></span></p> <p><strong>Pulgadas:</strong><span id="pulgadas"></span></p> <p><strong>Resolucion:</strong> <span id="resolucion"></span></p> <p><strong>Tipo de panel:</strong> <span id="tipoPanel"></span></p> <p><strong>Smart TV:</strong> <span id="smart"></span></p><p><strong>Stock:</strong><span id="stock"></span></p> <div class="row"> <div class="col-xs-12 col-md-12 col-lg-12"> <p class="lead"><button class="btn btn-default btn_comprar_detalle" id="carrito"><i class="fas fa-cart-plus" aria-hidden="true" ></i></i> Añadir al carrito</button></p> <h4><strong>Descripción Articulo</strong></h4> <p id="descripcion"></p> </div> </div> </div>');
			
			var nombreArticulo = document.getElementById("nombre");
			var imagenArticulo = document.getElementById("imagen");
			var marcaArticulo = document.getElementById("marca");
			var pulgadasArticulo = document.getElementById("pulgadas");
			var resolucionArticulo = document.getElementById("resolucion");
			var panelArticulo = document.getElementById("tipoPanel");
			var smartArticulo = document.getElementById("smart");
			var boton = document.getElementById("carrito");
			var desc = document.getElementById("descripcion");
			var stock = document.getElementById("stock");

			nombreArticulo.innerHTML = articulos[i].denomArticulo;
			marcaArticulo.innerHTML = articulos[i].marca;
			imagenArticulo.setAttribute("src", articulos[i].fotoArticulo);
			pulgadasArticulo.innerHTML = articulos[i].pulgadas +'""';
			resolucionArticulo.innerHTML= articulos[i].resolucion;
			panelArticulo.innerHTML = articulos[i].tipoPanel;
			smartArticulo.innerHTML = articulos[i].SmartTV;
			boton.setAttribute("onclick", "addCarrito("+articulos[i].idArticulo+");");
			desc.innerHTML = articulos[i].descripcionLarga;
			stock.innerHTML = " "+articulos[i].stockArtAlmacen;
		}
	}
}


var artCarrito = [];
//Carrito
function addCarrito(idArt){
	for (var i = 0; i < articulos.length; i++) {	
		if(idArt == articulos[i].idArticulo){
			if(articulos[i].stockArtAlmacen > articulos[i].cantidad){
				//Aumentamos la cantidad
				articulos[i].cantidad = articulos[i].cantidad +1;
				//Array Con los articulos del carrito
				artCarrito.push(articulos[i]);
				var salirBucle;
				for (var i2 = 0; i2 < articulos.length; i2++) {
					if(idArt == articulos[i2].idArticulo && articulos[i2].cantidad > 1){
						var cantidadArticulo = document.getElementById("cantidad"+i);
						cantidadArticulo.innerHTML = " x " + articulos[i].cantidad;
						//borramos el item pero la cantidad se añade igualmente
						artCarrito.removeItem(articulos[i2]);
						salirBucle = "salir";
						break;
					}
				}
				if(salirBucle == "salir"){
					break;
				}
				//Interfaz
				var padre = document.getElementById("carrito");
				var span = document.createElement("span");
				span.setAttribute("class","item");
				span.setAttribute("id","padBorr"+i);
				padre.appendChild(span);
				var span2 = document.createElement("span");
				span2.setAttribute("class","item-left");
				span.appendChild(span2);
				var img = document.createElement("img");
				img.setAttribute("id","image"+i);
				span2.appendChild(img);
				var span3 = document.createElement("span");
				span3.setAttribute("class","item-info");
				span2.appendChild(span3);
				var span4 = document.createElement("span");
				span4.setAttribute("id","nombre"+i);
				span3.appendChild(span4);
				var span5 = document.createElement("span");
				span5.setAttribute("id","prece"+i);
				span5.setAttribute("class","prec");
				span3.appendChild(span5);
				var span6 = document.createElement("span");
				span6.setAttribute("id",articulos[i].idArticulo);
				span6.setAttribute("class","item-right");
				span.appendChild(span6);
				var span7 = document.createElement("span");
				span7.setAttribute("id","cantidad"+i);
				span7.setAttribute("class","cantidad");
				span6.appendChild(span7);
				var boton = document.createElement("button");
				boton.setAttribute("class","btn btn-xs btn-danger pull-right");
				boton.setAttribute("onclick", "deleteCarrito("+articulos[i].idArticulo+");");
				var x = document.createTextNode("X");
				boton.appendChild(x);
				span6.appendChild(boton);

				var nombreArticulo = document.getElementById("nombre"+i);
				var imagenArticulo = document.getElementById("image"+i);
				var precioArticulo = document.getElementById("prece"+i);
				var cantidadArticulo = document.getElementById("cantidad"+i);
				nombreArticulo.innerHTML = articulos[i].denomArticulo;
				precioArticulo.innerHTML = articulos[i].precioArtAlmacen + " €";
				imagenArticulo.setAttribute("src", articulos[i].fotoArticulo);
				cantidadArticulo.innerHTML = " x " + articulos[i].cantidad;
				var articulosCarrito = document.getElementById("ArtCarrito");
				articulosCarrito.innerHTML= (artCarrito.length) + " - Articulos";
			}else{
				alert("No disponemos de la cantidad solicitada de este producto");
			}
		}
	}
}

function deleteCarrito(idArt){
	for (var i = 0; i < articulos.length; i++) {
		if(idArt == articulos[i].idArticulo){
				//Reducimos la cantidad
				articulos[i].cantidad = articulos[i].cantidad -1;
				var salirBucle;
				for (var i2 = 0; i2 < artCarrito.length; i2++) {
					if(idArt == artCarrito[i2].idArticulo && artCarrito[i2].cantidad >= 1){
						//artCarrito[i2].cantidad = artCarrito[i2].cantidad -1;
						var cantidadArticulo = document.getElementById("cantidad"+ i);
						cantidadArticulo.innerHTML = " x " + artCarrito[i2].cantidad;
						salirBucle = "salir";
						break;
					}
				}
				if(salirBucle == "salir"){
					break;
				}
			artCarrito.removeItem(articulos[i]);
			var carrito = document.getElementById("carrito");
			var padre = document.getElementById("padBorr"+i);
			carrito.removeChild(padre);
			var articulosCarrito = document.getElementById("ArtCarrito");
			articulosCarrito.innerHTML= (artCarrito.length) + " - Articulos";
		}
	}
}
// CARRITO FINAL
var totalCompra = 0;
function cargarInterfazCarrito(){
	borrarPadre();
	var divP = document.getElementById("conteinedir");
			var padre = document.createElement("section");
			padre.setAttribute("id","padre");
			divP.appendChild(padre);
			var contenido = document.createElement("div");
		    contenido.setAttribute("class", "row");
		    padre.appendChild(contenido);
	var fila = document.createElement("div");
		    fila.setAttribute("class", "col-xs-8");
		    contenido.appendChild(fila);
		    var paneld = document.createElement("div");
		    paneld.setAttribute("class", "panel panel-info");
		    fila.appendChild(paneld);
		    var panelb = document.createElement("div");
		    panelb.setAttribute("class", "panel-heading");
		    paneld.appendChild(panelb);
		    var divFila = document.createElement("div");
		    divFila.setAttribute("class","panel-title");
		    panelb.appendChild(divFila);
		    var divMd = document.createElement("div");
		    divMd.setAttribute("class","row");
		    divFila.appendChild(divMd);
		    var divXs = document.createElement("div");
		    divXs.setAttribute("class","col-xs-6");
		    divMd.appendChild(divXs);
		    var h5 = document.createElement("h5");
		    divXs.appendChild(h5);
		    var span = document.createElement("span");
		    span.setAttribute("class","glyphicon glyphicon-shopping-cart");
		    h5.appendChild(span);
		    h5.innerHTML = "Carrito de Compra";
		    var div1 = document.createElement("div");
		    div1.setAttribute("class", "col-xs-6");
		    divMd.appendChild(div1);
		    var boton = document.createElement("button");
			boton.setAttribute("class","btn btn-primary btn-sm btn-block");
			boton.setAttribute("onclick","location.href='index.html';");
			var x = document.createElement("span");
			x.setAttribute("class","glyphicon glyphicon-share-alt");
			var x1 = document.createTextNode("Continuar Compra");
			boton.appendChild(x);
			boton.appendChild(x1);
			div1.appendChild(boton);
			var divP = document.createElement("div");
		    divP.setAttribute("class","panel-body");
		    paneld.appendChild(divP);

		    for (var i = 0; i < artCarrito.length; i++) {
			    var divR = document.createElement("div");
			    divR.setAttribute("class","row");
			    divP.appendChild(divR);
			    var div2 = document.createElement("div");
			    div2.setAttribute("class", "col-xs-2");
			    divR.appendChild(div2);
			    var img = document.createElement("img");
				img.setAttribute("id","imag"+i);
				div2.appendChild(img);
			    var divXs4 = document.createElement("div");
			    divXs4.setAttribute("class","col-xs-4");
			    divR.appendChild(divXs4);
			    var h4 = document.createElement("h4");
			    h4.setAttribute("class","product-name");
			    divXs4.appendChild(h4);
			    var s = document.createElement("strong");
			    s.setAttribute("id","nombr"+i);
			    h4.appendChild(s);
			    var h42 = document.createElement("h4");
			    divXs4.appendChild(h42);
			    var small = document.createElement("small");
			    small.setAttribute("id","descripcionArticulo"+i);
			    h42.appendChild(small);
			    var div6t = document.createElement("div");
			    div6t.setAttribute("class","col-xs-6");
			    divR.appendChild(div6t);
			    var div6tt = document.createElement("div");
			    div6tt.setAttribute("class","col-xs-6 text-right");
			    div6t.appendChild(div6tt);
			    var h6 = document.createElement("h6");
			    div6tt.appendChild(h6);
			    var st = document.createElement("strong");
			    st.setAttribute("id","prec"+i);
			    h6.appendChild(st);
			    var sp = document.createElement("span");
			    sp.setAttribute("class","text-muted");
			   	st.appendChild(sp);
			   	sp.innerHTML = "x";
			   	var divX4 = document.createElement("div");
			    divX4.setAttribute("class","col-xs-4");
			    div6t.appendChild(divX4);
			    var input = document.createElement("input");
			    input.setAttribute("id","cantid"+i);
			    input.setAttribute("class","form-control input-sm");
			    input.setAttribute("type","number");
			    input.readOnly = true;
			    input.setAttribute("min","1");
			    input.setAttribute("value","1");
			    divX4.appendChild(input);
			    var divX2 = document.createElement("div");
			    divX2.setAttribute("class","col-xs-2");
			    div6t.appendChild(divX2);
			    var boton1 = document.createElement("button");
				boton1.setAttribute("class","btn btn-link btn-xs");
				boton1.setAttribute("onclick","deleteCarrito("+artCarrito[i].idArticulo+");");
				var spn = document.createElement("span");
				spn.setAttribute("class","glyphicon glyphicon-trash");
				boton1.appendChild(spn);
				divX2.appendChild(boton1);
				var hr = document.createElement("hr");
				divP.appendChild(hr);

				var nombreArticulo = document.getElementById("nombr"+i);
				var imagenArticulo = document.getElementById("imag"+i);
				var descripcionArticulo = document.getElementById("descripcionArticulo"+i);
				var precioArticulo = document.getElementById("prec"+i);
				var cantidadArticulo = document.getElementById("cantid"+i);

				nombreArticulo.innerHTML = artCarrito[i].denomArticulo;
				precioArticulo.innerHTML = artCarrito[i].precioArtAlmacen + " €";
				imagenArticulo.setAttribute("src", artCarrito[i].fotoArticulo);
				descripcionArticulo.innerHTML = artCarrito[i].descripcionArticulo;
				cantidadArticulo.setAttribute("value",artCarrito[i].cantidad);

				totalCompra = (totalCompra + parseFloat(artCarrito[i].precioArtAlmacen)*artCarrito[i].cantidad);
			}

		var panelf = document.createElement("div");
		panelf.setAttribute("class", "panel-footer");
	    paneld.appendChild(panelf);
	    var panelw = document.createElement("div");
		panelw.setAttribute("class", "row text-center");
	    panelf.appendChild(panelw);
	    var panels9 = document.createElement("div");
		panels9.setAttribute("class", "col-xs-9");
	    panelw.appendChild(panels9);
		var h4total = document.createElement("h4");
		h4total.setAttribute("class", "text-right");
	    panels9.appendChild(h4total);
	    h4total.innerHTML = "Total: ";
	    var strongg = document.createElement("strong");
		strongg.setAttribute("id", "total");
		strongg.setAttribute("class","prec");
	    h4total.appendChild(strongg);
	    var panels3 = document.createElement("div");
		panels3.setAttribute("class", "col-xs-3");
	    panelw.appendChild(panels3);
	    var botonConfirmar = document.createElement("button");
		botonConfirmar.setAttribute("class","btn btn-success btn-block");
		botonConfirmar.setAttribute("onclick","cargarLogin();");
		botonConfirmar.setAttribute("href","#signup");
		botonConfirmar.setAttribute("data-toggle","modal");
		botonConfirmar.setAttribute("data-target",".bs-modal-sm");
		var confirmar = document.createTextNode("Comprar");
		botonConfirmar.appendChild(confirmar);
		panels3.appendChild(botonConfirmar);
		var ttCompra = document.getElementById("total");
		ttCompra.innerHTML = totalCompra + "€";
}

var contador = 0;
function cargarLogin(){
	
	contador=contador+1;
	if(contador <= 1 && totalCompra !== 0){
		var padre = document.getElementById("padre");
		var divModal = document.createElement("div");
		divModal.setAttribute("class", "modal fade bs-modal-sm");
		divModal.setAttribute("id", "myModal");
		divModal.setAttribute("tabindex", "-1");
		divModal.setAttribute("role", "dialog");
		divModal.setAttribute("aria-labelledby", "mySmallModalLabel");
		divModal.setAttribute("aria-hidden", "true");
		padre.appendChild(divModal);
		var divModal2 = document.createElement("div");
		divModal2.setAttribute("class","modal-dialog modal-sm");
		divModal.appendChild(divModal2);
		var divModal2 = document.createElement("div");
		divModal2.setAttribute("class","modal-dialog modal-sm");
		divModal.appendChild(divModal2);
		var divM3 = document.createElement("div");
		divM3.setAttribute("class","modal-content");
		divModal2.appendChild(divM3);
		var br = document.createElement("br");
		divM3.appendChild(br);
		var divM4 = document.createElement("div");
		divM4.setAttribute("class","bs-example bs-example-tabs");
		divM3.appendChild(divM4);
		var ul = document.createElement("ul");
		ul.setAttribute("class","nav nav-tabs");
		ul.setAttribute("id","myTab");
		divM4.appendChild(ul);
		var li = document.createElement("li");
		li.setAttribute("class","active");
		ul.appendChild(li);
		var a = document.createElement("a");
		a.setAttribute("href","#signin");
		a.setAttribute("data-toggle","tab");
		li.appendChild(a);
		a.innerHTML = "Iniciar sesion";
		var li1 = document.createElement("li");
		ul.appendChild(li1);
		var a1 = document.createElement("a");
		a1.setAttribute("href","#signup");
		a1.setAttribute("data-toggle","tab");
		li1.appendChild(a1);
		a1.innerHTML = "Registrarse";
		var divMB = document.createElement("div");
		divMB.setAttribute("class","modal-body");
		divMB.setAttribute("id","modal-bady");
		divM3.appendChild(divMB);
		$('#modal-bady').append('<div id="myTabContent" class="tab-content"><div class="tab-pane fade in" id="why"><p>Por favor para completar la compra inicia sesion o registrate</p></div><div class="tab-pane fade active in" id="signin"><form class="form-horizontal"><fieldset><div class="control-group"><label class="control-label" for="dnil">DNI:</label><div class="controls"><input id="dnil" name="dnil" class="form-control" placeholder="07839322G" class="input-medium" required=""></div></div><div class="control-group"><label class="control-label" for="passwordinput">Contraseña:</label><div class="controls"><input required="" id="passwordinput" name="passwordinput" class="form-control" type="password" placeholder="Contraseña" class="input-medium"></div></div><div class="control-group"><label class="control-label" for="signin"></label><div class="controls"><button id="signinBoton" name="signin" class="btn btn-success" type="button" >Iniciar Sesion</button></div></div></fieldset></form></div><div class="tab-pane fade" id="signup"><form class="form-horizontal" method="GET"><fieldset><div class="control-group"><label class="control-label" for="Email">Email:</label><div class="controls"><input id="Emailr" name="Email" class="form-control" type="text" placeholder="ejemplo@ejemplo.com" class="input-large" required=""></div></div><div class="control-group"><label class="control-label" for="password">Contraseña:</label><div class="controls"><input id="passwordinputr" name="password" class="form-control" type="password" placeholder="Contraseña" class="input-large" required=""></div></div><div class="control-group"><label class="control-label" for="userid">Nombre:</label><div class="controls"><input id="useridr" name="userid" class="form-control" type="text" placeholder="Pedro Perez" class="input-large" required=""><div class="control-group"><label class="control-label" for="dni">DNI:</label><div class="controls"><input id="dni" name="dni" class="form-control" type="text" placeholder="07546276F" maxlength="9" class="input-large" required=""></div></div><div class="control-group"><label class="control-label" for="direcc">Dirección:</label><div class="controls"><input id="direcc" name="direcc" class="form-control" type="text" placeholder="Calle Juan, 4" class="input-large" required=""></div></div><div class="control-group"><label class="control-label" for="poblacion">Población:</label><div class="controls"><input id="poblacion" name="poblacion" class="form-control" type="text" placeholder="Munera" class="input-large" required=""></div></div><div class="control-group"><label class="control-label" for="ciudad">Ciudad:</label><div class="controls"><input id="ciudad" name="ciudad" class="form-control" type="text" placeholder="ciudad" class="input-large" required=""></div></div><div class="control-group"><label class="control-label" for="pais">País:</label><div class="controls"><input id="pais" name="pais" class="form-control" type="text" placeholder="España" class="input-large" required=""></div></div><div class="control-group"><label class="control-label" for="confirmsignup"></label><div class="controls"><button id="confirmsignupBoton" name="confirmsignup" class="btn btn-success" type="button">Registrarse</button></div></div></fieldset></form></div></div>');
		$('.modal-content').append('<div class="modal-footer"><center><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></center></div>');
		var botonLogin = document.getElementById("signinBoton");
		botonLogin.setAttribute("onclick","comprobarLogin(document.getElementById('dnil').value, document.getElementById('passwordinput').value);");

		var botonRegistrar = document.getElementById("confirmsignupBoton");
		botonRegistrar.setAttribute("onclick","registrar(document.getElementById('useridr').value, document.getElementById('dni').value, document.getElementById('Emailr').value, document.getElementById('passwordinputr').value, document.getElementById('direcc').value, document.getElementById('poblacion').value, document.getElementById('ciudad').value, document.getElementById('pais').value);");
	}	
}

//Comprobacion de inicio de sesion
var DNIusuarioActual;
function comprobarLogin(user, pass){
		if(user=="" || pass==""){
			alert("Faltan campos por completar");
			}else{
				objetoAjax = AJAXCrearObjeto(); //crea el objeto
			    objetoAjax.open('POST', 'php/login.php', true);
			    var variables = "dni="+user+"&pass="+pass;
			    objetoAjax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			    objetoAjax.send(variables);
			    objetoAjax.onreadystatechange = function () {
			        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
			           	var datos = objetoAjax.responseText;
			        }
			   	if(datos == "1"){
			   		//cargo pagina para pago
			   		DNIusuarioActual = user;
			   		cargarFormaEnvio();
			   	}
			   	if(datos == "2"){
			   		alert("DNI o Contraseña incorrecta")
			   	}			    
			}   	
		}
}

//Funcion que registra a un usuario

function registrar(nombre, dni, email, contrasena,direccion,poblacion,ciudad,pais){
	if(nombre=="" || dni=="" || email=="" || contrasena=="" || direccion=="" || poblacion=="" || ciudad=="" || pais==""){
		alert("Faltan campos por completar");
		}else{
			objetoAjax = AJAXCrearObjeto(); //crea el objeto
		    objetoAjax.open('POST', 'php/registro.php', true);
		    var variables = "nombre="+nombre+"&dni="+dni+"&email="+email+"&pass="+contrasena+"&direccion="+direccion+"&poblacion="+poblacion+"&ciudad="+ciudad+"&pais="+pais;
		    objetoAjax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		    objetoAjax.send(variables);
		   	objetoAjax.onreadystatechange = function () {
		        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
		           	var datos = objetoAjax.responseText;
		           	var objeto = JSON.parse(datos);
		        }
		        	//cargo pagina para pago
		   			DNIusuarioActual = dni;
		   			cargarFormaEnvio();
		   }
	}
}

var selecionado;
function cargarFormaEnvio(){
	$('#myModal').modal('toggle');
	$('.modal-open').removeClass();
	borrarPadre();
	$('#aside').remove();
	var divP = document.getElementById("conteinedir");
	var padre = document.createElement("section");
	padre.setAttribute("id","padre");
	divP.appendChild(padre);
	$('#padre').append('<h2>Por favor seleccione el método de envio</h2> <div class="row form-group product-chooser"> <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4"> <div class="product-chooser-item selected"> <img src="img/domicilio.png" class="img-rounded col-xs-4 col-sm-4 col-md-12 col-lg-12" alt="Domicilio"> <div class="col-xs-8 col-sm-8 col-md-12 col-lg-12"> <span class="title">Domicilio Personal</span> <span class="description">Si seleccionas esta opcion el pedido se enviará a la dirección que se utilizó para registrarse. El coste de este envío son <strong class="prec">20€</strong>.</span> <input type="radio" name="product" value="domicilio" checked="checked"> </div> <div class="clear"></div> </div> </div> <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4"> <div class="product-chooser-item"> <img src="img/agencia.png" class="img-rounded col-xs-4 col-sm-4 col-md-12 col-lg-12" alt="Agencia"> <div class="col-xs-8 col-sm-8 col-md-12 col-lg-12"> <span class="title">Agencia de trasporte</span> <span class="description">Al seleccionar esta opción el envio se realizara a la agencia de transporte que más le convenga. El coste de este envio es <strong class="prec">GRATUITO</strong>.</span> <input type="radio" name="product" value="agencia"> </div> <div class="clear"></div> </div> </div> <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4"> <div class="product-chooser-item"> <img src="img/otro.png" class="img-rounded col-xs-4 col-sm-4 col-md-12 col-lg-12" alt="Mobile"> <div class="col-xs-8 col-sm-8 col-md-12 col-lg-12"> <span class="title">Otro domicilio</span> <span class="description">Sí seleccionas esta opcíon te pediremos los datos de un domicilio al que envíar el paquete, perfecto si es un regalo, el coste de este envío es de <strong class="prec">20€</strong>.</span> <input type="radio" name="product" value="otro"> </div> <div class="clear"></div> </div> </div>');
	$(function(){
		$('div.product-chooser').not('.disabled').find('div.product-chooser-item').on('click', function(){
			$(this).parent().parent().find('div.product-chooser-item').removeClass('selected');
			$(this).addClass('selected');
			$(this).find('input[type="radio"]').prop("checked", true);
			selecionado = $('input[name=product]:checked', 'div.product-chooser').val();
			enviar.setAttribute("onclick","envio('"+selecionado+"');");
		});
		$('#padre').append('<button type="button" id="enviar" class="btn btn-success btn-lg col-md-12 col-sm-12">Continuar</button>');
		var enviar = document.getElementById("enviar");
	});
	//cargamos el objeto del usuario con todos sus datos menos la clave.
	objetoAjax = AJAXCrearObjeto(); //crea el objeto
		    objetoAjax.open('POST', 'php/getUsuario.php', true);
		    var variables = "dni="+DNIusuarioActual;
		    objetoAjax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		    objetoAjax.send(variables);
		   	objetoAjax.onreadystatechange = function () {
		        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
		           	var datos = objetoAjax.responseText;
		           	var objeto = JSON.parse(datos);
		           	dirUsu = objeto;
		        }
		    }

}

var dirUsu;
var agenciaaa;
var envioNormal;
function envio(selecionado){
	
	switch(selecionado) {
	    case "domicilio":
	        borrarPadre();
	        var divP = document.getElementById("conteinedir");
			var padre = document.createElement("section");
			padre.setAttribute("id","padre");
			divP.appendChild(padre);
	        $('#padre').append('<div class="panel panel-primary"> <div class="panel-heading">Confirme su dirección</div> <div class="panel-body"><h3 id="nom"></h3> <h4 id="dir"></h4> </div> <br> <button type="button" id="confirmDir" class="btn btn-success btn-lg col-md-6 col-sm-6" onclick="factura(0)">Confirmar</button> </div>');
	        var nom = document.getElementById("nom");
	        nom.innerHTML = dirUsu[0].nombreUsuario;
	        var dir = document.getElementById("dir");
	        dir.innerHTML = dirUsu[0].direccionUsuario + ", " + dirUsu[0].poblacionUsuario + ", " + dirUsu[0].ciudadUsuario + ", " + dirUsu[0].paisUsuario;
	        totalCompra = totalCompra + 20;
	        envioNormal = 20;
	        break;
	    case "agencia":
	        borrarPadre();
	        var divP = document.getElementById("conteinedir");
			var padre = document.createElement("section");
			padre.setAttribute("id","padre");
			divP.appendChild(padre);
	        $('#padre').append('<div class="panel panel-primary"> <div class="panel-heading">Confirme su agencia</div> <div class="panel-body"><h3 id="nom"></h3> <h4 id="dir"></h4> </div> </div>');
	        var nom = document.getElementById("nom");
	        nom.innerHTML = dirUsu[0].nombreUsuario;
	        var dir = document.getElementById("dir");
	        dir.innerHTML = dirUsu[0].direccionUsuario + ", " + dirUsu[0].poblacionUsuario + ", " + dirUsu[0].ciudadUsuario + ", " + dirUsu[0].paisUsuario;
	        $('#padre').append('<div class="row"> <div class="paymentCont"> <div class="headingWrap"> <h3 class="headingTop text-center">Seleccione la agencia de envio preferida</h3> <p class="text-center">Estos resultados estan basados en su localidad</p> </div> <div class="paymentWrap"> <div class="btn-group paymentBtnGroup btn-group-justified" data-toggle="buttons"> <label class="btn paymentMethod active"> <div class="method correos"></div> <input type="radio" name="options" value="correos" checked> </label> <label class="btn paymentMethod"> <div class="method nacex"></div> <input type="radio" name="options" value="nacex"> </label> <label class="btn paymentMethod"> <div class="method seur"></div> <input type="radio" name="options" value="seur"> </label> </div> </div> </div> </div>');
	        $('#padre').append('<button type="button" id="confirmAgen" class="btn btn-success btn-lg col-md-4 col-sm-4">Confirmar</button>');

	        $("#confirmAgen").click(function () {	 
				var selec = $('input:radio[name=options]:checked').val();
				agenciaaa = selec;
				enviarAgen(selec);
			});
	       	
	        break;
	    case "otro":
	         borrarPadre();
	        var divP = document.getElementById("conteinedir");
			var padre = document.createElement("section");
			padre.setAttribute("id","padre");
			divP.appendChild(padre);
	       	$('#padre').append('<form> <div class="form-group"> <label for="dni">Introduzca la direccion completa de envio:</label> <input type="input" class="form-control" id="dir"> </div> <button type="button" class="btn btn-success" id="botdir">Confirmar</button> </form>');
			var botdir = document.getElementById('botdir');
			$("#botdir").one("onmouseover", factura(2));
			botdir.setAttribute("onclick","confirmDir(document.getElementById('dir').value)");
			break;
	}
}

function factura(forma){
	//Obtenemos la fecha Completa
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //Enero es 0!
	var yyyy = today.getFullYear();
	if(dd<10){
	    dd='0'+dd;
	} 
	if(mm<10){
	    mm='0'+mm;
	} 
	var today = yyyy+'/'+mm+'/'+dd;

	//Hacemos un AJAX para guardar todos los datos de la factura
	objetoAjax = AJAXCrearObjeto(); //crea el objeto
		    objetoAjax.open('POST', 'php/Factura.php', true);
		    var variables = "id="+dirUsu[0].idUsuario+"&fecha="+today+"&formaEnvio="+forma;
		    objetoAjax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		    objetoAjax.send(variables);
		   	objetoAjax.onreadystatechange = function () {
		        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
		           	var datos = objetoAjax.responseText;
		           	var objeto = JSON.parse(datos);
		           	if(objeto == "bien" && forma == 0){
		        	//cargo funcion para introducir los detalles de la factura
		   			detFactura();
		        }
		        }
		    }
}

function detFactura(){
		var arti = artCarrito;
		var jsonString=JSON.stringify(arti);
		

		objetoAjax = AJAXCrearObjeto(); //crea el objeto
		    objetoAjax.open('POST', 'php/detFactura.php', true);
		    var variables = "jsonString="+jsonString;
		    objetoAjax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		    objetoAjax.send(variables);
		   	objetoAjax.onreadystatechange = function () {
		        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
		           	var datos = objetoAjax.responseText;
		           	var objeto = JSON.parse(datos);
		           	if(objeto == "bien"){
		      			visualFact();
		        	}
		        }
		    }

}

function visualFact(){
	borrarPadre();
	var divP = document.getElementById("conteinedir");
	var padre = document.createElement("section");
	padre.setAttribute("id","padre");
	divP.appendChild(padre);
	$('#padre').append('<div class="row"> <div class="col-md-12"> <div class="invoice-title"> <h2>FACTURA</h2> <hr> </div> <div class="row"> <div class="col-xs-6"> <address> <strong>Factura para:</strong><br> <span id="nombreUsu1"></span><br> <span id="direcUsu"></span><br> <span id="poblacionUsu"></span>,<span id="ciudadUsu"></span><br> <span id="paisUsu"></span> </address> </div> <div class="col-xs-6 text-right"> <address> <strong>Enviado:</strong><br> <span id="nombreUsu2"></span><br> <span id="direcUsu2"></span><br> <span id="poblacionUsu2"></span>,<span id="ciudadUsu2"></span><br> <span id="paisUsu2"></span> </address> </div> </div> </div> </div> <div class="row"> <div class="col-md-12"> <div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title"><strong>PEDIDO</strong></h3> </div> <div class="panel-body"> <div class="table-responsive"> <table class="table table-condensed" id="articulos"> <thead> <tr> <td><strong>Producto</strong></td> <td class="text-center"><strong>Precio</strong></td> <td class="text-center"><strong>Cantidad</strong></td> <td class="text-center"><strong>Descripción</strong></td> </tr> </thead></table> </div> </div> </div> </div> </div> <div class="row"> <div class="col-md-12"> <div class="col-md-4"> <h3 class="text-center">TOTAL</h3><hr> <div class="pull-left"><h4>Subtotal</h4> </div> <div class="pull-right"><h4 class="text-right" id="stotal"></h4></div> <div class="clearfix"></div> <div class="pull-left"><h4>Envio</h4> </div> <div class="pull-right"><h4 class="text-right" id="valueEnvio"></h4></div> <div class="clearfix"></div> <div class="pull-left"><h4>TOTAL</h4> </div> <div class="pull-right"><h4 class="text-right" id="grandTotal"></h4></div> <div class="clearfix"></div> </div> <div class="col-md-4 offset-md-1"> <h3 class="text-center">Forma de envio</h3><hr> <div class="text-center"> <strong id="envio"></strong><br> </div> </div> </div> </div>');	
		var articu = document.getElementById("articulos");
		var tbody = document.createElement("tbody");
		articu.appendChild(tbody);
		for (var i = 0; i < artCarrito.length; i++) {
			var tr = document.createElement("tr");
			tbody.appendChild(tr);
			var td = document.createElement("td");
			td.setAttribute("class","col-md-3");
			tr.appendChild(td);
			var div = document.createElement("div");
			div.setAttribute("class","media");
			td.appendChild(div);
			var img = document.createElement("img");
			img.setAttribute("class","media-object");
			img.setAttribute("id","img"+i);
			img.setAttribute("style","width: 72px; height: 72px;");
			div.appendChild(img);
			var div2 = document.createElement("div");
			div2.setAttribute("class","media-body");
			div.appendChild(div2);
			var h4 = document.createElement("h4");
			h4.setAttribute("class","media-heading");
			h4.setAttribute("id","nombreArt"+i);
			div2.appendChild(h4);
			var h5 = document.createElement("h5");
			h5.setAttribute("class","media-heading");
			h5.setAttribute("id","idArti"+i);
			div2.appendChild(h5);
			var td1 = document.createElement("td");
			td1.setAttribute("class","text-center");
			td1.setAttribute("style","width: 12%;");
			td1.setAttribute("id","totalArt"+i);
			tr.appendChild(td1);
			var td2 = document.createElement("td");
			td2.setAttribute("class","text-center");
			td2.setAttribute("id","cantArt"+i);
			tr.appendChild(td2);
			var td3 = document.createElement("td");
			tr.appendChild(td3);
			var div3 = document.createElement("div");
			div3.setAttribute("class","col-md-13");
			div3.setAttribute("id","descArt"+i);
			td3.appendChild(div3);

			var nombreArticulo = document.getElementById("nombreArt"+i);
			var idArticul = document.getElementById("idArti"+i);
			var precioArticulo = document.getElementById("totalArt"+i);
			var canti = document.getElementById("cantArt"+i);
			var imge = document.getElementById("img"+i);
			var desc = document.getElementById("descArt"+i);

			imge.setAttribute("src",artCarrito[i].fotoArticulo);
			idArticul.innerHTML = "ID: "+artCarrito[i].idArticulo;
			nombreArticulo.innerHTML = artCarrito[i].denomArticulo;
			precioArticulo.innerHTML =  parseFloat(artCarrito[i].precioArtAlmacen)*artCarrito[i].cantidad + " €";
			canti.innerHTML = artCarrito[i].cantidad;
			desc.innerHTML = artCarrito[i].descripcionArticulo;
		}

		var totalCompraa = document.getElementById("stotal");
			totalCompraa.innerHTML = totalCompra+" €";
		var totalCompraa1 = document.getElementById("valueEnvio");
			totalCompraa1.innerHTML = "- €";
		if(dirOtro){
			totalCompraa1.innerHTML.innerHTML = "20 €";
		}
		if(envioNormal){
			totalCompraa1.innerHTML.innerHTML = "20 €";
		}
		
		var totalCompraa2 = document.getElementById("grandTotal");
			totalCompraa2.innerHTML = totalCompra+" €";
		var envio = document.getElementById("envio");
			envio.innerHTML = "Domicilio";
		if(dirOtro){
			envio.innerHTML = "Otro domicilio: "+dirOtro;
		}

		if(agenciaaa){
			envio.innerHTML = "Agencia: "+agenciaaa;
		}

		var nombrUsu = document.getElementById("nombreUsu1");
			nombrUsu.innerHTML = dirUsu[0].nombreUsuario;
		var direcUsu = document.getElementById("direcUsu");
			direcUsu.innerHTML = dirUsu[0].direccionUsuario;
		var poblacionUsu = document.getElementById("poblacionUsu");
			poblacionUsu.innerHTML = dirUsu[0].poblacionUsuario;
		var ciudadUsu = document.getElementById("ciudadUsu");
			ciudadUsu.innerHTML = dirUsu[0].ciudadUsuario;
		var paisUsu = document.getElementById("paisUsu");
			paisUsu.innerHTML = dirUsu[0].paisUsuario;

		var nombrUsu2 = document.getElementById("nombreUsu2");
			nombrUsu2.innerHTML = dirUsu[0].nombreUsuario;
		var direcUsu = document.getElementById("direcUsu2");
			direcUsu2.innerHTML = dirUsu[0].direccionUsuario;
		var poblacionUsu2 = document.getElementById("poblacionUsu2");
			poblacionUsu2.innerHTML = dirUsu[0].poblacionUsuario;
		var ciudadUsu2 = document.getElementById("ciudadUsu2");
			ciudadUsu2.innerHTML = dirUsu[0].ciudadUsuario;
		var paisUsu2 = document.getElementById("paisUsu2");
			paisUsu2.innerHTML = dirUsu[0].paisUsuario;

		$('#conteinedir').append('<br>');
		$('#conteinedir').append('<button type="button" id="generaPDF" onclick="generaPdf();" class="btn btn-success btn-lg col-md-3 col-sm-3">Generar PDF</button>');
		$('#conteinedir').append('<button type="button" id="continuar" class="btn btn-success btn-lg col-md-3 col-sm-3">Ir a la pantalla Principal</button>');
		var boton =document.getElementById("continuar");
		boton.setAttribute("onclick","location.href='index.html';");
}

function enviarAgen(agen){
	borrarPadre();
	var divP = document.getElementById("conteinedir");
	var padre = document.createElement("section");
	padre.setAttribute("id","padre");
	divP.appendChild(padre);
	var agenci;
	if(agen == 'seur'){
		agenci = 2;
	}
	if(agen == 'nacex'){
		agenci = 1;
	}
	if(agen == 'correos'){
		agenci = 3;
	}
	$('#padre').append('<form> <div class="form-group"> <label for="dni">Introduce el DNI de la persona que va a recogerlo:</label> <input type="input" class="form-control" id="dni"> </div> <button type="button" class="btn btn-success" id="botDNI">Confirmar</button> </form>');
	var botDNI = document.getElementById('botDNI');
	$("#botDNI").one("onmouseover", factura(1));
	botDNI.setAttribute("onclick","confirmAgenDNI(document.getElementById('dni').value,'"+agenci+"')");
}

function confirmAgenDNI(dni, agen){
	//Hacemos un AJAX para guardar todos los datos de la agencia
	objetoAjax = AJAXCrearObjeto(); //crea el objeto
		    objetoAjax.open('POST', 'php/FacturaAgencia.php', true);
		    var variables = "dni="+dni+"&IDagencia="+agen;
		    objetoAjax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		    objetoAjax.send(variables);
		   	objetoAjax.onreadystatechange = function () {
		        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
		           	var datos = objetoAjax.responseText;
		           	var objeto = JSON.parse(datos);
		           	if(objeto == "bien"){
		           		detFactura();
		           	}	
		        }
		    }
}

var dirOtro;
function confirmDir(direc){
	//Hacemos un AJAX para guardar todos los datos de la agencia
	objetoAjax = AJAXCrearObjeto(); //crea el objeto
		    objetoAjax.open('POST', 'php/FacturaOtro.php', true);
		    var variables = "direccion="+direc;
		    dirOtro = direc;
		    objetoAjax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		    objetoAjax.send(variables);
		   	objetoAjax.onreadystatechange = function () {
		        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
		           	var datos = objetoAjax.responseText;
		           	var objeto = JSON.parse(datos);
		           	if(objeto == "bien"){
		           		detFactura();
		           	}	
		        }
		    }
}

   function generaPdf() {
        var pdf = new jsPDF('p', 'pt', 'letter');
        source = $('#padre')[0];

        specialElementHandlers = {
            '#bypassme': function (element, renderer) {
                return true
            }
        };
        margins = {
            top: 10,
            bottom: 10,
            left: 15,
            width: 400
        };

        pdf.fromHTML(
            source, 
            margins.left, // x coord
            margins.top, { // y coord
                'width': margins.width,
                'elementHandlers': specialElementHandlers
            },

            function (dispose) {
                pdf.save('Factura.pdf');
            }, margins
        );
    }

function borrarPadre(){
	var contenedor = document.getElementById("conteinedir");
	var padre = document.getElementById("padre");
    contenedor.removeChild(padre);
}

//eliminar elemento de un array
Array.prototype.removeItem = function (a) {
	 for (var i = 0; i < this.length; i++) {
	  if (this[i] == a) {
	   for (var i2 = i; i2 < this.length - 1; i2++) {
	    this[i2] = this[i2 + 1];
	   }
	   this.length = this.length - 1;
	   return;
	  }
	 }
};
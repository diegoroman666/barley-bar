// Menú de Barley Terraza Restobar - Rancagua
// Extraído y estructurado desde la carta oficial (PDF)

const menu = [
  {
    id: "pizzas",
    nombre: "Pizzas",
    descripcion: "Masa artesanal delgada y crujiente, estilo napolitana. Único tamaño 32 cms.",
    items: [
      { id: "p1", nombre: "Margarita", desc: "Salsa pomodoro, mozzarella fresca, hojas de albahaca, parmesano rallado.", precio: 11500 },
      { id: "p2", nombre: "Fomeke", desc: "Salsa pomodoro, queso mantecoso, cebolla morada, champiñones, aceitunas, pimentón, albahaca.", precio: 12500 },
      { id: "p3", nombre: "Peperoni", desc: "Salsa pomodoro, pepperonis, queso mantecoso.", precio: 13000 },
      { id: "p4", nombre: "Chilena", desc: "Salsa pomodoro, carne mechada, queso mantecoso, cebolla caramelizada, champiñones, ají verde.", precio: 13000 },
      { id: "p5", nombre: "Kevin", desc: "Salsa pesto, tocino, queso mantecoso, aceitunas, cebolla morada, salsa bbq, parmesano.", precio: 13000 },
      { id: "p6", nombre: "Johnny", desc: "Salsa pomodoro, jamón serrano, queso mantecoso, champiñones, albahaca, salsa bbq, parmesano.", precio: 13500 },
      { id: "p7", nombre: "Genoveza", desc: "Salsa pesto, jamón serrano, mozzarella fresca, tomate cherry, albahaca, parmesano.", precio: 14000 },
      { id: "p8", nombre: "Prochuto", desc: "Salsa pomodoro, jamón serrano, mozzarella fresca, pepperonis, tomate cherry, albahaca, parmesano.", precio: 14000 }
    ]
  },
  {
    id: "burgers",
    nombre: "Burgers",
    descripcion: "En pan de papa, 150 grs de carne vacuno, todas acompañadas de papas fritas delgadas y crujientes.",
    items: [
      { id: "b1", nombre: "Clásica", desc: "Queso cheddar, lechuga, tomate, pepinillos, salsa big mac.", precios: { normal: 8000, doble: 10500 } },
      { id: "b2", nombre: "Blushiz", desc: "Queso azul, champiñones, mayonesa.", precios: { normal: 9000, doble: 11500 } },
      { id: "b3", nombre: "Americana", desc: "Queso cheddar, tocino, pepinillos, cebolla morada, salsa bbq, salsa big mac.", precios: { normal: 9000, doble: 11500 } },
      { id: "b4", nombre: "Pican Tex", desc: "Queso cheddar, lechuga, tomate, jalapeños, cebolla morada, chili picante, mayo chipotle.", precios: { normal: 9000, doble: 11500 } },
      { id: "b5", nombre: "Pearl Jam", desc: "Queso cheddar, pepinillos, lechuga, tocino crispy, salsa polinesia (agridulce).", precios: { normal: 9500, doble: 12000 } },
      { id: "b6", nombre: "Barley", desc: "Tocino, queso cheddar, queso mantecoso, huevo frito, lechuga, cebolla caramelizada, salsa big mac.", precios: { normal: 10500, doble: 12500 } }
    ]
  },
  {
    id: "sandwiches",
    nombre: "Sándwiches",
    descripcion: "En pan ciabatta, acompañados de papas fritas delgadas y crujientes. Precios: chico / mediano / grande.",
    items: [
      { id: "s1", nombre: "Barros", desc: "Solo con queso mantecoso.", precios: { chico: 8000, mediano: 8000, grande: 9000 } },
      { id: "s2", nombre: "Chacarero", desc: "Tomate, poroto verde, ají verde, mayonesa.", precios: { chico: 8000, mediano: 8500, grande: 9000 } },
      { id: "s3", nombre: "Brasileño", desc: "Palta, queso mantecoso, mayonesa.", precios: { chico: 8500, mediano: 9000, grande: 9500 } },
      { id: "s4", nombre: "Italiano", desc: "Palta, tomate, mayonesa.", precios: { chico: 8500, mediano: 9000, grande: 9500 } },
      { id: "s5", nombre: "Tejano", desc: "Queso mantecoso, guacamole, jalapeños, mayo chipotle (picor medio-bajo).", precios: { chico: 9000, mediano: 9500, grande: 10000 } },
      { id: "s6", nombre: "Mediterráneo", desc: "Queso mantecoso, tomate asado, aceitunas, champiñones, salsa pimentón asado.", precios: { chico: 9000, mediano: 9500, grande: 10000 } },
      { id: "s7", nombre: "Casa", desc: "Queso cheddar, lechuga, tomate, pepinillos, chucrut morado, mayonesa.", precios: { chico: 9000, mediano: 9500, grande: 10000 } },
      { id: "s8", nombre: "Chemilico", desc: "Cebolla caramelizada, queso mantecoso, champiñones, huevo frito y mayonesa (estilo Barley).", precios: { chico: 9000, mediano: 9500, grande: 10000 } },
      { id: "s9", nombre: "Panino", desc: "Jamón serrano, tomate cherry, queso mozzarella fresca, orégano y un toque de aceite de oliva.", precio: 8000 },
      { id: "s10", nombre: "Vegetariano", desc: "Zapallo italiano, champiñones, tomate, lechuga, mayonesa.", precio: 7500 },
      { id: "s11", nombre: "Flat Iron", desc: "200 grs. de carne de vacuno, queso mantecoso, tomate cherry, lechuga, mayonesa.", precio: 12000 }
    ]
  },
  {
    id: "hotdogs",
    nombre: "Hot Dogs",
    descripcion: "En pan de papa y salchicha artesanal. Precios: individual / doble.",
    items: [
      { id: "h1", nombre: "Solo", desc: "Salchicha artesanal.", precios: { individual: 6500, doble: 11000 } },
      { id: "h2", nombre: "Camarón", desc: "Salchicha artesanal con camarón.", precios: { individual: 7500, doble: 12000 } },
      { id: "h3", nombre: "Mechada", desc: "Salchicha artesanal con carne mechada.", precios: { individual: 8500, doble: 13000 } },
      { id: "h4", nombre: "Gringo", desc: "Queso cheddar, cebolla caramelizada, pepinillos, tocino crispy, salsa bbq.", precio: 8000 },
      { id: "h5", nombre: "Mexicano", desc: "Queso mantecoso, tomate, cebolla caramelizada, jalapeños, tocino crispy, mayo chipotle.", precio: 8500 },
      { id: "h6", nombre: "Italiano", desc: "Palta, tomate, mayonesa.", precio: 7500 },
      { id: "h7", nombre: "Completo", desc: "Tomate, chucrut, salsa americana, mayonesa.", precio: 7000 }
    ]
  },
  {
    id: "papas",
    nombre: "Papas Fritas para compartir",
    descripcion: "Precios: mediana / grande.",
    items: [
      { id: "pf1", nombre: "Chorrillana", desc: "Carne mechada, pollo, salchicha artesanal, huevo frito, cebolla caramelizada.", precios: { mediana: 15000, grande: 20000 } },
      { id: "pf2", nombre: "Pajarita", desc: "Salchicha artesanal, champiñones y tomate cherry.", precios: { mediana: 14500, grande: 18500 } },
      { id: "pf3", nombre: "Salchipapas", precios: { mediana: 14000, grande: 18000 } },
      { id: "pf4", nombre: "Golden", desc: "Cubierta en salsa queso cheddar.", precios: { mediana: 11000, grande: 15000 } },
      { id: "pf5", nombre: "Solas", precios: { mediana: 5500, grande: 11000 } }
    ]
  },
  {
    id: "alitas",
    nombre: "Alitas",
    descripcion: "6 alitas gordas de pollo, acompañadas de papitas zig zag y salsa de la casa.",
    items: [
      { id: "a1", nombre: "Alitas BBQ", desc: "Terminadas en salsa barbacoa y un toque de perejil.", precio: 9000 },
      { id: "a2", nombre: "Alitas Hot", desc: "Terminadas en ají picante, acompañadas de pepinillos.", precio: 9000 }
    ]
  },
  {
    id: "quesadillas",
    nombre: "Quesadillas",
    descripcion: "Base: queso mantecoso y cebolla caramelizada.",
    items: [
      { id: "q1", nombre: "Pollo", desc: "Base + pollo.", precio: 8000 },
      { id: "q2", nombre: "Mechada", desc: "Base + carne mechada.", precio: 8500 },
      { id: "q3", nombre: "Doble proteína", desc: "Base + solo 2 proteínas.", precio: 9500 },
      { id: "q4", nombre: "Vegetariana", desc: "Champiñones, zapallo italiano y pimentones asados.", precio: 8000 }
    ]
  },
  {
    id: "costillas",
    nombre: "Costillas",
    items: [
      { id: "c1", nombre: "Baby Ribs", desc: "6 costillitas de cerdo asadas en salsa bbq, acompañadas de coleslaw y papas zig-zag.", precio: 13000 }
    ]
  },
  {
    id: "otros_platos",
    nombre: "Otras entradas y platos",
    items: [
      { id: "o1", nombre: "Empanaditas", desc: "Acompañadas de salsa pebre.", precio: 5000 },
      { id: "o2", nombre: "Ceviche de verduras", desc: "Champiñones, palmitos, cebolla morada, pimentones con toques de perejil y jugo de limón.", precio: 6500 },
      { id: "o3", nombre: "Ostiones a la parmesana", desc: "8 ostiones en su concha con queso derretido, jugo de limón natural y perejil picado.", precio: 13500 },
      { id: "o4", nombre: "Crudo Barley", desc: "Carne magra de vacuno con aceite de oliva y perejil, salsa alioli, alcaparras, pepinillos, cebolla morada, nueces y limón sutil grillado más tostadas.", precio: 12000 }
    ]
  },
  {
    id: "tablas",
    nombre: "Tablas para compartir",
    items: [
      { id: "t1", nombre: "Carnes", desc: "500 grs. de vacuno (entraña y flat iron), trozos de pollo a la plancha, vegetales asados con papitas zig-zag y 2 salsas de la casa.", precio: 30000 },
      { id: "t2", nombre: "TexMex", desc: "Costillitas de cerdo bbq, alitas hot, alitas bbq, miniquesadillas con papitas zig-zag y 2 salsas de la casa.", precio: 25000 }
    ]
  },
  {
    id: "postres",
    nombre: "Postres",
    items: [
      { id: "d1", nombre: "Volcán de Chocolate", desc: "Bizcocho de chocolate con centro fundido, bolita de helado y nueces.", precio: 6500 },
      { id: "d2", nombre: "Crudo Barley Dulce", desc: "2 bolitas de helado con salsa de arándano, nueces y merengue.", precio: 3500 }
    ]
  },
  {
    id: "bebidas_sa",
    nombre: "Bebestibles sin alcohol",
    items: [
      { id: "bs1", nombre: "Jugo de pulpa natural (470cc)", desc: "Frutilla, frambuesa, piña o mango.", precio: 5000 },
      { id: "bs2", nombre: "Limonada (470cc)", precio: 5500 },
      { id: "bs3", nombre: "Coca Cola / Pepsi (220cc)", precio: 1500 },
      { id: "bs4", nombre: "Coca Cola / Pepsi (350cc)", precio: 2500 },
      { id: "bs5", nombre: "Fanta / Sprite (220cc)", precio: 1500 },
      { id: "bs6", nombre: "Agua mineral (600cc)", precio: 2000 },
      { id: "bs7", nombre: "Ginger / Tónica (220cc)", precio: 1500 },
      { id: "bs8", nombre: "Red Bull variedades (250cc)", precio: 3000 }
    ]
  },
  {
    id: "cervezas",
    nombre: "Cervezas",
    descripcion: "Precios: schop/botella / pitcher 1.800cc (cuando aplica).",
    items: [
      { id: "cv1", nombre: "Corona (330cc)", precio: 4000 },
      { id: "cv2", nombre: "Heineken", precios: { botella: 4500, pitcher: 13000 } },
      { id: "cv3", nombre: "Heineken 0° sin alcohol (330cc)", precio: 3000 },
      { id: "cv4", nombre: "Kunstmann Torobayo", precios: { botella: 5000, pitcher: 14000 } },
      { id: "cv5", nombre: "Kunstmann Gran Torobayo (500cc)", precio: 6000 },
      { id: "cv6", nombre: "Austral Calafate", precios: { botella: 5500, pitcher: 15000 } },
      { id: "cv7", nombre: "Dolbek Maqui", precios: { botella: 5500, pitcher: 15000 } },
      { id: "cv8", nombre: "Kross Golden/Stout/Pils", precios: { botella: 5500, pitcher: 15000 } },
      { id: "cv9", nombre: "Kross 5° Aniversario (750cc)", precio: 8000 },
      { id: "cv10", nombre: "Estrella Damm (schop 500cc)", precios: { schop: 5000, pitcher: 14000 } },
      { id: "cv11", nombre: "Kastel Rouge/Rubus (lata 500cc)", precio: 6000 },
      { id: "cv12", nombre: "Delirium (330cc)", precio: 6000 },
      { id: "cv13", nombre: "Erdinger (500cc)", desc: "Weissbier, Dunkel o sin alcohol.", precio: 5500 },
      { id: "cv14", nombre: "Primator (500cc)", desc: "Lager, Medové, Weizen, Chipper o IPA.", precio: 4500 },
      { id: "cv15", nombre: "Jester (botella/schop)", precios: { botella: 6000, pitcher: 16000 } },
      { id: "cv16", nombre: "Cuello Negro (botella/schop)", precios: { botella: 6000, pitcher: 16000 } },
      { id: "cv17", nombre: "Viejo Lobo Blanca/Original", precio: 6000 },
      { id: "cv18", nombre: "Viejo Lobo Triple", precio: 6500 }
    ]
  },
  {
    id: "cocteles",
    nombre: "Cócteles",
    items: [
      { id: "co1", nombre: "Rockero!!", precio: 10000 },
      { id: "co2", nombre: "Orgasmo", precio: 8000 },
      { id: "co3", nombre: "Tropical", precio: 8500 },
      { id: "co4", nombre: "Clavo", precio: 8500 },
      { id: "co5", nombre: "Gin", precio: 8000 },
      { id: "co6", nombre: "Espresso Martini", precio: 8000 },
      { id: "co7", nombre: "Piña Colada", precio: 7500 },
      { id: "co8", nombre: "Pisco Sour (Con Mistral 35°)", precio: 7000 },
      { id: "co9", nombre: "Collins", precio: 7000 },
      { id: "co10", nombre: "Tequila Sunrise", precio: 7000 },
      { id: "co11", nombre: "Daiquiri", precio: 7000 },
      { id: "co12", nombre: "Padrino (Whisky amaretto)", precio: 7000 },
      { id: "co13", nombre: "Madrina (Vodka amaretto)", precio: 6000 },
      { id: "co14", nombre: "Negroni", precio: 6000 },
      { id: "co15", nombre: "Ruso", precio: 6000 },
      { id: "co16", nombre: "Caipiriña", precio: 6500 },
      { id: "co17", nombre: "Caipiroska", precio: 6500 },
      { id: "co18", nombre: "Sangría (jarro)", precio: 6000 },
      { id: "co19", nombre: "Ramazotti Spritz", precio: 6500 },
      { id: "co20", nombre: "JägerBomb", precio: 9000 },
      { id: "co21", nombre: "2 Cortos Jäger", precio: 6000 }
    ]
  },
  {
    id: "destilados",
    nombre: "Destilados",
    descripcion: "Precios: vaso / botella (cuando aplica).",
    items: [
      { id: "de1", nombre: "Chivas 12", precios: { vaso: 8000, botella: 55000 } },
      { id: "de2", nombre: "Jack Daniels", precios: { vaso: 7000, botella: 50000 } },
      { id: "de3", nombre: "Whisky Doble Negro", precio: 8000 },
      { id: "de4", nombre: "Whisky Negro", precios: { vaso: 7000, botella: 50000 } },
      { id: "de5", nombre: "Whisky Rojo", precios: { vaso: 6500, botella: 48000 } },
      { id: "de6", nombre: "Whisky sabores (Manzana/Fire/Honey)", precio: 4000 },
      { id: "de7", nombre: "Stolichnaya (Vodka)", precio: 6000 },
      { id: "de8", nombre: "Havanna (Ron)", precio: 6000 },
      { id: "de9", nombre: "Del Carmen 40° doble (Pisco)", precio: 6000 },
      { id: "de10", nombre: "Del Carmen 35° (Pisco)", precio: 5000 },
      { id: "de11", nombre: "Mistral 40°", precio: 5500 },
      { id: "de12", nombre: "Mistral 35°", precios: { vaso: 5000, botella: 48000 } },
      { id: "de13", nombre: "De Los Andes (Pisco)", precio: 6500 },
      { id: "de14", nombre: "Branca", precio: 6000 },
      { id: "de15", nombre: "Jäger", precio: 3500 },
      { id: "de16", nombre: "Tequila corto", precio: 3000 },
      { id: "de17", nombre: "Hidromiel variedades (botella 500cc)", precio: 5500 }
    ]
  },
  {
    id: "aperitivos",
    nombre: "Aperitivos",
    items: [
      { id: "ap1", nombre: "Base Michelada (Limón/Sal/Merkén)", precio: 2000 },
      { id: "ap2", nombre: "Base Michelada completa (+ Tabasco/Salsa inglesa)", precio: 2500 }
    ]
  }
];

module.exports = menu;

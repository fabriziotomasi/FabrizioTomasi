const mongoose = require("mongoose");
const Exp = require("../models/exp");

mongoose.connect("mongodb://localhost:27017/fabrizio-tomasi");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const seedDB = async () => {
    const exp = new Exp(
        {
            _id: "4",
            donde: "Arca Ship Suppliers (Arcapieflo S.R.L.)",
            cuando: "01/09/17 a la actualidad.",
            haciendoQue: "Entré en Arcapieflo S.R.L. en sus comienzos, como encargado del sector de cotizaciones y compras. Dentro de las tareas principales del cargo, se encuentran: Cotizaciones de listados de provisiones y materiales para barcos (mayoritariamente cruceros), luego una vez aprobado el pedido por el cliente, el proceso continua con la confeccion de las ordenes de compras y su envio a los proveedores correspondientes, una vez reunida la mercadería, se ingresan las facturas de compra al sistema de gestion y finalmente la emision de las facturas y documentacion de aduana correspondiente. En Diciembre de 2020, Arcapieflo S.R.L., abre en paralelo a la proveeduria marítima, un supermercado con venta minorista al publico general, donde tambien me encargo de las compras de mercadería. ."
        },
        {
            _id: "3",
            donde: "South Atlantic Ship Supplies (Datyfyl S.A.)",
            cuando: "02/02/09 a 28/06/2017",
            haciendoQue: "Cotización de listados de provisiones en inglés, confección de órdenes de compra a proveedores de plaza y en tránsito. Ingreso de facturas de compra y facturación de los pedidos. Confección de documentos y gestión de trámites ante la DNA (Aprovisionamiento de buques y Reembarcos de mercadería en tránsito), Controles y ajustes de stock"
        },
        {
            _id: "2",
            donde: "Harrington S.A.",
            cuando: "22/01/07 a 01/02/09",
            haciendoQue: "Ingreso de facturas de compra e importaciones al sistema contable, Distribución de la mercadería a los diferentes locales, Recuentos y ajustes de stock(en todas las sucursales), Cubrir licencias del encargado de depósito."
        },
        {
            _id: "1",
            donde: "Macromercado Mayorista S.A. (Carrasco)",
            cuando: "14/02/05 a 20/01/07",
            haciendoQue: "Recuentos y ajustes de stock, Realizacion de inventarios mensuales de las secciones de venta de mercadería a granel , Confección de informes de venta, utilidad, y ajustes de stock en base a estos recuentos."
        });
    await exp.save();
};

seedDB().then(() => {
    mongoose.connection.close();
});
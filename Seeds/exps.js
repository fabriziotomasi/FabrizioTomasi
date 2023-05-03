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
      logo: "media/imagenes/arca.jpg",
      donde: "Arca Ship Suppliers (Arcapieflo S.R.L.)",
      cuando: "01/09/17 a la actualidad.",
      haciendoQue:
        "Como encargado del sector de cotizaciones y compras en Arca Ship Supplies, cotizo listados de provisiones y materiales para barcos, mayoritariamente cruceros. Una vez aprobado el pedido por el cliente, continúo con la confección de órdenes de compra y su envío a los proveedores correspondientes. Cuando la mercadería llega, ingreso las facturas de compra al sistema de gestión y emito las facturas y documentación de aduana correspondiente. Durante mi tiempo en Arca Ship Supplies, he adquirido una gran habilidad en la negociación con proveedores y clientes para obtener las mejores condiciones comerciales y el cumplimiento de los plazos de entrega. Además, como parte de la expansión del negocio, Arca Ship Supplies abrió un supermercado con venta minorista al público general, donde también me encargo de las compras de mercadería y aplico mis conocimientos y habilidades en la gestión de compras y el control de inventario. En este sentido, estoy continuamente buscando formas de optimizar los procesos de compra y mejorar la calidad de los productos ofrecidos a nuestros clientes.",
    },
    {
      _id: "3",
      logo: "media/imagenes/sass.jpg",
      donde: "South Atlantic Ship Supplies (Datyfyl S.A.)",
      cuando: "02/02/09 a 28/06/2017",
      haciendoQue:
        "Cotizé y negocié precios de proveedores nacionales y extranjeros para las provisiones requeridas, asegurando la calidad de los productos y el cumplimiento de los plazos de entrega. Confeccioné órdenes de compra y seguimiento de los pedidos, asegurando una comunicación efectiva con proveedores para garantizar la correcta entrega de los productos. Realicé el ingreso de facturas de compra al sistema contable y facturación de los pedidos, asegurándome de la exactitud de los datos y la correcta facturación de los productos y cantidades vendidas. Confeccioné documentos y gestioné trámites ante la Dirección Nacional de Aduanas (DNA) para la exportación de mercadería, asegurando el cumplimiento de las normativas requeridas. Realicé controles y ajustes de stock para asegurar una gestión eficiente del inventario, optimizando los recursos y previniendo pérdidas.",
    },
    {
      _id: "2",
      donde: "Harrington S.A.",
      logo: "media/imagenes/harrington.png",
      cuando: "22/01/07 a 01/02/09",
      haciendoQue:
        "Realicé el ingreso de facturas de compra e importaciones al sistema contable, asegurándome de que la información estuviera completa y precisa. Fui responsable de la distribución de la mercadería a los diferentes locales, coordinando con el personal de cada uno de ellos para asegurar un proceso fluido y eficiente. Realicé recuentos y ajustes de stock en todas las sucursales, manteniendo un riguroso control de las existencias y verificando la correcta aplicación de precios. Cubrí las licencias del encargado de depósito, asegurando que el trabajo se realizara de manera efectiva y en tiempo y forma. Mantuve una comunicación efectiva con los supervisores y gerentes para coordinar las actividades del depósito y asegurar el cumplimiento de los objetivos establecidos.",
    },
    {
      _id: "1",
      donde: "Macromercado Mayorista S.A. (Carrasco)",
      logo: "media/imagenes/macromercado.jpg",
      cuando: "14/02/05 a 20/01/07",
      haciendoQue:
        "Realicé recuentos y ajustes de stock de forma periódica para asegurar la exactitud de los niveles de inventario. Lideré la realización de inventarios mensuales de las secciones de venta de mercadería a granel, manteniendo un riguroso control de las existencias y verificando la correcta aplicación de precios. Elaboré informes detallados de venta, utilidad y ajustes de stock, basados en los recuentos realizados y las ventas registradas. Coordiné con otros miembros del equipo para asegurar una gestión eficiente de las tareas y el cumplimiento de los plazos establecidos. Mantuve una comunicación efectiva con los supervisores y gerentes para reportar los resultados y tomar decisiones en conjunto para mejorar los procesos y optimizar los recursos.",
    }
  );
  await exp.save();
};

seedDB().then(() => {
  mongoose.connection.close();
});

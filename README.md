<h1>Documentación del Proyecto TiendaMia</h1>

Este proyecto ha sido desarrollado como respuesta al desafío técnico de TiendaMia. Consiste en una aplicación que permite gestionar órdenes de venta, ofreciendo una interfaz para revisar estas órdenes y sus detalles, así como proporcionando reportes específicos relacionados con el estado y la promesa de entrega de las órdenes.

<h2>Descripción General</h2>

La solución cuenta con una aplicación de back-end construida en Node.js que proporciona servicios REST para gestionar las órdenes de venta. La interfaz de usuario ha sido desarrollada en React.js.

<h2>Funcionalidades y Uso</h2>

Una vez que la aplicación esté en funcionamiento, la interfaz principal muestra todas las órdenes de venta existentes. Además, presenta un menú de navegación (navbar) con las siguientes opciones:

<ul><li><p>🏠 <strong>Home</strong>: Dirige al usuario de vuelta a la página principal donde se listan todas las órdenes de venta.</p></li><li><p>⏳ <strong>Close to Shipping Promise Report</strong>: Dirige al usuario a un reporte que muestra todas las órdenes en estado "Approve" que están a menos de dos días de su promesa de entrega (<code>ShippingPromise</code>).</p></li><li><p>🚚 <strong>Traveling Orders Report</strong>: Dirige al usuario a una página donde puede especificar un rango de fechas (fecha de inicio y fecha de finalización). Una vez ingresadas estas fechas, el sistema mostrará todas las órdenes en estado "Traveling" dentro de ese rango de tiempo.</p></li></ul>
<h2>Ejecución del Proyecto</h2>

Para poner en marcha el proyecto, sigue estos pasos:

<ol><li>Ejecutar el comando: <code>docker compose build</code></li><li>Una vez finalizado el build, ejecutar: <code>docker compose up</code></li></ol>
Tras realizar estos pasos, la aplicación debería estar funcionando y disponible para su uso.
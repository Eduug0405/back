const db = require('../configs/db.config');
const Venta = require('../models/venta.model');
const DetalleVenta = require('../models/detalleVenta.model');

const Pusher = require("pusher");

const index = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const offset = (page - 1) * limit;
        const {sort, order} = req.query;

        const ventas = await DetalleVenta.getAll({offset, limit}, {sort, order});

        let response = {
            message: "ventas obtenidas exitosamente",
            data: ventas
        };

        if (page && limit) {
            const totalVentas = await Venta.count();
            response = {
                ...response,
                total: totalVentas,
                totalPages: Math.ceil(totalVentas / limit),
                currentPage: page
            };
        }

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al obtener las ventas",
            error: error.message
        });
    }
}

const create = async (req, res) => {
    try {
        const venta = new Venta({
            total: req.body.total,
            fecha: req.body.fecha
        });

        const idVenta = await venta.save();

        for (d of req.body.detalle) {
            const detalle = new DetalleVenta({ idVenta, ...d });
            await detalle.save();
        }

        return res.status(200).json({
            message: "venta creada exitosamente",
        })

    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al crear la venta",
            error: error.message
        })
    }
}

const createWithTransaction = async (req, res) => {
    const connection = await db.createConnection();
    console.log(req.body);
    try {
        await connection.beginTransaction();

        const venta = new Venta({
            total: req.body.total
        });

        const idVenta = await venta.saveWithTransaction(connection);

        for (d of req.body.detalle) {
            const detalle = new DetalleVenta({ idVenta, ...d });
            await detalle.saveWithTransaction(connection);
        }

        await connection.commit();

        let query = "SELECT p.nombre, d.cantidad, d.total FROM productos p INNER JOIN detalle_venta d ON p.id = d.id_producto WHERE DATE(d.created_at) = CURDATE()";
        const [rows] = await connection.query(query);
        
        const pusher = new Pusher({
            appId: "1713464",
            key: "2af397cf5e411ee2665d",
            secret: "eb15572c25487745179d",
            cluster: "us2",
            useTLS: true
        });

        pusher.trigger("ventas", "nueva-venta", {
            data: rows
        });

        return res.status(200).json({
            message: "venta creada exitosamente",
        })

    } catch (error) {
        await connection.rollback();

        return res.status(500).json({
            message: "ocurrió un error al crear la venta",
            error: error.message
        })
    }
}

module.exports = {
    index,
    create: createWithTransaction
}
import { Router } from "express";
import ProductManager from "../ProductsManager.js";

const router = Router();

const productManager = new ProductManager();
let products = [];
const PM = async () => {
    let productsPM = await productManager.getProducts();
    products = productsPM;
    return products;
};

router.get("/", (req, res) => {
    let limit = parseInt(req.query.limit);
    PM();
    if (limit > 0) {
        let newProd = products.slice(0, limit);
        res.send(newProd);
    } else {
        res.send(products);
    }
});

router.get("/:pid", (req, res) => {
    PM();
    let productId = req.params.pid;
    console.log("asd", productId);
    let usuario = products.find((u) => u.id === parseInt(productId));
    if (!usuario) return res.send("Usuario no encontrado");
    res.send(usuario);
});

router.post("/", (req, res) => {
    const {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category,
        status,
    } = req.body;
    productManager.addProduct(
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category,
        status
    );
    res.send({ status: "success" });
});

router.put("/:pid", (req, res) => {
    const prodID = parseInt(req.params.pid);
    const prodToUpdate= req.body;
    const fieldToUpdate = Object.keys(prodToUpdate)
    const valueForUpdate = Object.values(prodToUpdate).toString()
    // console.log("updating", prodToUpdate, fieldToUpdate, valueForUpdate);
    productManager.updateProduct(prodID, fieldToUpdate, valueForUpdate)
})

router.delete("/:pid",  (req, res) => {
    try {
        const prodID = parseInt(req.params.pid);
        productManager.deleteProduct(prodID);
        res.send("Eliminado");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los datos");
    }
});

export default router;

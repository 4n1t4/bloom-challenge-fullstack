import { Router } from "express";
import routerBrands from "@/api/brands";

const router = Router();

router.get("/", (req, res) => {
	res.send("API Bloom Reuse is working.");
});
router.use("/brands", routerBrands);

export default router;

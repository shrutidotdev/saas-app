import express from "express";
import { AuthService } from "../services/auth.service";

const router = express.Router();
const authService = new AuthService();

router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const result = await authService.register(name, email, password);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});
router.post("/login", async(req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
})

router.post("/refresh-token", async( req ,res ) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refreshToken(refreshToken);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
})

export default router;
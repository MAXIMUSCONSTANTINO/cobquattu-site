import { Router } from "express";
import {
  hashPassword,
  verifyPassword,
  generateToken,
  isValidEmail,
  isValidPassword,
  verifyToken
} from "../auth";

import {
  createUser,
  getUserByEmail,
  getUserByEmailOrPhone,
  createSession,
  getUserById
} from "../db";

const router = Router();

/**
 * LOGIN
 */
router.post("/login", async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    const user = await getUserByEmailOrPhone(emailOrPhone);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const valid = await verifyPassword(password, user.password);

    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user.id);

    await createSession({
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    // 🔥 ADICIONAR COOKIE (ESSENCIAL)
    res.cookie("cobquattu_session", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      token,
      user,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Login failed" });
  }
});

export default router;
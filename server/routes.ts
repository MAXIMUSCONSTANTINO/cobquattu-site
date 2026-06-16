import { Router, Request, Response } from "express";
import {
  hashPassword,
  verifyPassword,
  generateToken,
  isValidEmail,
  isValidPassword,
} from "./auth";

import {
  createUser,
  getUserByEmail,
  getUserByEmailOrPhone,
  createSession,
  createProprietario,
  createEmpresario,
  createParceiro,
} from "./db";

import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../shared/const";
import type { RegisterRequest, LoginRequest } from "../shared/types";

const router = Router();

/**
 * POST /auth/register
 */
router.post("/auth/register", async (req: Request, res: Response) => {
  try {
    const data = req.body as RegisterRequest;

    if (!data.email || !data.password || !data.firstName || !data.userType) {
      return res.status(400).json({
        success: false,
        message: ERROR_MESSAGES.MISSING_FIELDS,
      });
    }

    if (!isValidEmail(data.email)) {
      return res.status(400).json({
        success: false,
        message: ERROR_MESSAGES.INVALID_EMAIL,
      });
    }

    if (!isValidPassword(data.password)) {
      return res.status(400).json({
        success: false,
        message: ERROR_MESSAGES.INVALID_PASSWORD,
      });
    }

    const existingUser = await getUserByEmail(data.email);

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: ERROR_MESSAGES.USER_EXISTS,
      });
    }

    const hashedPassword = await hashPassword(data.password);

    await createUser({
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      profession: data.profession,
      userType: data.userType,
    });

    const createdUser = await getUserByEmail(data.email);

    if (!createdUser) {
      throw new Error("User created but not found");
    }

    const userId = createdUser.id;

    if (data.userType === "proprietario" && data.matricula) {
      await createProprietario({
        userId,
        matricula: data.matricula,
        valorSugerido: data.valorSugerido,
        descricaoImovel: data.descricaoImovel,
      });
    } else if (data.userType === "empresario" && data.nomeProjeto) {
      await createEmpresario({
        userId,
        nomeProjeto: data.nomeProjeto,
        caracteristicas: data.caracteristicas,
        valorNecessario: data.valorNecessario,
      });
    } else if (data.userType === "parceiro") {
      await createParceiro({ userId });
    }

    const token = generateToken(userId);

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await createSession({
      userId,
      token,
      expiresAt,
    });

    res.cookie("cobquattu_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: SUCCESS_MESSAGES.REGISTRATION_SUCCESS,
      token,
      user: {
        id: userId,
        email: createdUser.email,
        firstName: createdUser.firstName,
        userType: createdUser.userType,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
    });
  }
});

/**
 * POST /auth/login
 */
router.post("/auth/login", async (req: Request, res: Response) => {
  try {
    const { emailOrPhone, password } = req.body as LoginRequest;

    if (!emailOrPhone || !password) {
      return res.status(400).json({
        success: false,
        message: ERROR_MESSAGES.MISSING_FIELDS,
      });
    }

    const identifier = emailOrPhone.trim();

    console.log("LOGIN ATTEMPT:", identifier);

    const user = await getUserByEmailOrPhone(identifier);

    console.log("USER FOUND:", user?.email);

    console.log("USER:", user);
    console.log("PASSWORD EXISTS:", !!user?.password);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: ERROR_MESSAGES.INVALID_CREDENTIALS,
      });
    }

    const isPasswordValid = await verifyPassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: ERROR_MESSAGES.INVALID_CREDENTIALS,
      });
    }

    const token = generateToken(user.id);

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    try {
      await createSession({
        userId: user.id,
        token,
        expiresAt,
      });
    } catch (e) {
      console.error("SESSION ERROR:", e);
    }

    res.cookie("cobquattu_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        userType: user.userType,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
    });
  }
});

/**
 * POST /auth/logout
 */
router.post("/auth/logout", (req: Request, res: Response) => {
  res.clearCookie("cobquattu_session");

  return res.json({
    success: true,
    message: SUCCESS_MESSAGES.LOGOUT_SUCCESS,
  });
});

/**
 * GET /auth/me
 */
router.get("/auth/me", async (req: Request, res: Response) => {
  try {
    const token = req.cookies.cobquattu_session;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: ERROR_MESSAGES.UNAUTHORIZED,
      });
    }

    const { verifyToken } = await import("./auth");

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: ERROR_MESSAGES.UNAUTHORIZED,
      });
    }

    const { getUserById } = await import("./db");

    const user = await getUserById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: ERROR_MESSAGES.UNAUTHORIZED,
      });
    }

    return res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        userType: user.userType,
      },
    });
  } catch (error) {
    console.error("Auth me error:", error);

    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
    });
  }
});

export default router;


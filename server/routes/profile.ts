import { Router, Request, Response } from "express";
import { getUserById, updateUser, deleteUser, createPlatformLog } from "../db";
import { verifyToken, hashPassword, verifyPassword } from "../auth";
import { ERROR_MESSAGES } from "../../shared/const";

const router = Router();

/**
 * Middleware de autenticação
 */
function authMiddleware(req: Request, res: Response, next: Function) {
  const token = req.cookies.cobquattu_session;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: ERROR_MESSAGES.UNAUTHORIZED,
    });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: ERROR_MESSAGES.UNAUTHORIZED,
    });
  }

  (req as any).userId = decoded.userId;
  next();
}

/**
 * GET /api/profile
 * Obter dados do perfil do usuário autenticado
 */
router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
      });
    }

    return res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        profession: user.profession,
        userType: user.userType,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
    });
  }
});

/**
 * PUT /api/profile
 * Atualizar dados pessoais do usuário
 */
router.put("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { firstName, lastName, email, phone, profession } = req.body;

    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
      });
    }

    const updateData: any = {};

    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (profession) updateData.profession = profession;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Nenhum campo para atualizar",
      });
    }

    await updateUser(userId, updateData);

    await createPlatformLog({
      userId,
      action: "profile_updated",
      details: "User profile updated",
    });

    return res.json({
      success: true,
      message: "Perfil atualizado com sucesso",
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
    });
  }
});

/**
 * POST /api/profile/change-password
 * Alterar senha do usuário
 */
router.post("/change-password", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Todos os campos são obrigatórios",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "As senhas não coincidem",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "A nova senha deve ter no mínimo 8 caracteres",
      });
    }

    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
      });
    }

    // Verifica senha atual
    const isPasswordValid = await verifyPassword(currentPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Senha atual incorreta",
      });
    }

    // Hash da nova senha
    const hashedPassword = await hashPassword(newPassword);

    // Atualiza senha
    await updateUser(userId, { password: hashedPassword });

    await createPlatformLog({
      userId,
      action: "password_changed",
      details: "User password changed",
    });

    return res.json({
      success: true,
      message: "Senha alterada com sucesso",
    });
  } catch (error) {
    console.error("Change password error:", error);
    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
    });
  }
});

/**
 * DELETE /api/profile
 * Deletar conta do usuário
 */
router.delete("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Senha é obrigatória para deletar a conta",
      });
    }

    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
      });
    }

    // Verifica senha
    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Senha incorreta",
      });
    }

    // Deleta usuário
    await deleteUser(userId);

    await createPlatformLog({
      userId,
      action: "account_deleted",
      details: "User account deleted",
    });

    // Limpa cookie
    res.clearCookie("cobquattu_session");

    return res.json({
      success: true,
      message: "Conta deletada com sucesso",
    });
  } catch (error) {
    console.error("Delete account error:", error);
    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
    });
  }
});

export default router;

import { Router, Request, Response } from "express";
import { verifyToken } from "../auth";
import {
  getNotificationsByUserId,
  markNotificationAsRead,
  createNotification
} from "../db";

const router = Router();

/**
 * GET /api/notifications
 * Retorna todas as notificações do usuário autenticado
 */
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const notifications = await getNotificationsByUserId(userId);

    return res.json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error("Erro ao buscar notificações:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao buscar notificações",
    });
  }
});

/**
 * PUT /api/notifications/:id/read
 * Marca uma notificação como lida
 */
router.put("/:id/read", verifyToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    const notification = await markNotificationAsRead(id, userId);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notificação não encontrada",
      });
    }

    return res.json({
      success: true,
      notification,
    });
  } catch (error) {
    console.error("Erro ao marcar notificação como lida:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao marcar notificação como lida",
    });
  }
});

export default router;
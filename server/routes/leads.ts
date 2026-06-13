import { Router, Request, Response } from "express";
import {
  createLead,
  getLeadsByUserId,
  getLeadById,
  updateLead,
  deleteLead,
  getAllLeads,
  createPlatformLog,
} from "../db";
import { verifyToken } from "../auth";
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
 * POST /api/leads
 * Criar novo lead/cliente
 */
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { name, type, phone, email, city, observations, status } = req.body;
    const userId = (req as any).userId;

    if (!name || !type) {
      return res.status(400).json({
        success: false,
        message: "Campos obrigatórios: name, type",
      });
    }

    if (!["proprietario", "empresario"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Tipo deve ser 'proprietario' ou 'empresario'",
      });
    }

    const result = await createLead({
      userId,
      name,
      type,
      phone,
      email,
      city,
      observations,
      status: status || "novo",
    });

    await createPlatformLog({
      userId,
      action: "lead_created",
      details: `Lead ${name} created`,
    });

    return res.status(201).json({
      success: true,
      message: "Lead criado com sucesso",
      leadId: (result as any).insertId,
    });
  } catch (error) {
    console.error("Create lead error:", error);
    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
    });
  }
});

/**
 * GET /api/leads
 * Listar leads do usuário autenticado (parceiro)
 */
router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const leads = await getLeadsByUserId(userId);

    return res.json({
      success: true,
      leads,
    });
  } catch (error) {
    console.error("Get leads error:", error);
    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
    });
  }
});

/**
 * GET /api/leads/:id
 * Obter detalhes de um lead específico
 */
router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    const lead = await getLeadById(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead não encontrado",
      });
    }

    if (lead.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "Acesso negado",
      });
    }

    return res.json({
      success: true,
      lead,
    });
  } catch (error) {
    console.error("Get lead error:", error);
    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
    });
  }
});

/**
 * PUT /api/leads/:id
 * Atualizar lead
 */
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;
    const { name, type, phone, email, city, observations, status } = req.body;

    const lead = await getLeadById(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead não encontrado",
      });
    }

    if (lead.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "Acesso negado",
      });
    }

    await updateLead(id, {
      name: name || lead.name,
      type: type || lead.type,
      phone: phone || lead.phone,
      email: email || lead.email,
      city: city || lead.city,
      observations: observations || lead.observations,
      status: status || lead.status,
    });

    await createPlatformLog({
      userId,
      action: "lead_updated",
      details: `Lead ${id} updated`,
    });

    return res.json({
      success: true,
      message: "Lead atualizado com sucesso",
    });
  } catch (error) {
    console.error("Update lead error:", error);
    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
    });
  }
});

/**
 * DELETE /api/leads/:id
 * Deletar lead
 */
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    const lead = await getLeadById(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead não encontrado",
      });
    }

    if (lead.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "Acesso negado",
      });
    }

    await deleteLead(id);

    await createPlatformLog({
      userId,
      action: "lead_deleted",
      details: `Lead ${id} deleted`,
    });

    return res.json({
      success: true,
      message: "Lead deletado com sucesso",
    });
  } catch (error) {
    console.error("Delete lead error:", error);
    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
    });
  }
});

export default router;

import { Router, Request, Response } from "express";
import {
  createProperty,
  getPropertiesByUserId,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getAllProperties,
  createPlatformLog,
} from "../db";
import { verifyToken } from "../auth";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../../shared/const";

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
 * POST /api/properties
 * Criar novo imóvel
 */
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { title, matricula, city, state, area, value, description, status } = req.body;
    const userId = (req as any).userId;

    if (!title || !matricula || !city || !state) {
      return res.status(400).json({
        success: false,
        message: "Campos obrigatórios: title, matricula, city, state",
      });
    }

    const result = await createProperty({
      userId,
      title,
      matricula,
      city,
      state,
      area,
      value,
      description,
      status: status || "disponivel",
    });

    await createPlatformLog({
      userId,
      action: "property_created",
      details: `Property ${title} created`,
    });

    return res.status(201).json({
      success: true,
      message: "Imóvel criado com sucesso",
      propertyId: (result as any).insertId,
    });
  } catch (error) {
    console.error("Create property error:", error);
    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
    });
  }
});

/**
 * GET /api/properties
 * Listar imóveis do usuário autenticado
 */
router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const properties = await getPropertiesByUserId(userId);

    return res.json({
      success: true,
      properties,
    });
  } catch (error) {
    console.error("Get properties error:", error);
    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
    });
  }
});

/**
 * GET /api/properties/:id
 * Obter detalhes de um imóvel específico
 */
router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    const property = await getPropertyById(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Imóvel não encontrado",
      });
    }

    if (property.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "Acesso negado",
      });
    }

    return res.json({
      success: true,
      property,
    });
  } catch (error) {
    console.error("Get property error:", error);
    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
    });
  }
});

/**
 * PUT /api/properties/:id
 * Atualizar imóvel
 */
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;
    const { title, city, state, area, value, description, status } = req.body;

    const property = await getPropertyById(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Imóvel não encontrado",
      });
    }

    if (property.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "Acesso negado",
      });
    }

    await updateProperty(id, {
      title: title || property.title,
      city: city || property.city,
      state: state || property.state,
      area: area !== undefined ? area : property.area,
      value: value !== undefined ? value : property.value,
      description: description || property.description,
      status: status || property.status,
    });

    await createPlatformLog({
      userId,
      action: "property_updated",
      details: `Property ${id} updated`,
    });

    return res.json({
      success: true,
      message: "Imóvel atualizado com sucesso",
    });
  } catch (error) {
    console.error("Update property error:", error);
    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
    });
  }
});

/**
 * DELETE /api/properties/:id
 * Deletar imóvel
 */
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    const property = await getPropertyById(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Imóvel não encontrado",
      });
    }

    if (property.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "Acesso negado",
      });
    }

    await deleteProperty(id);

    await createPlatformLog({
      userId,
      action: "property_deleted",
      details: `Property ${id} deleted`,
    });

    return res.json({
      success: true,
      message: "Imóvel deletado com sucesso",
    });
  } catch (error) {
    console.error("Delete property error:", error);
    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
    });
  }
});

export default router;

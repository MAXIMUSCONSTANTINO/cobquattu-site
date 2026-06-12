import { Router, Request, Response } from "express";
import {
  createProject,
  getProjectsByUserId,
  getProjectById,
  updateProject,
  deleteProject,
  getAllProjects,
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
 * POST /api/projects
 * Criar novo projeto
 */
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { name, segment, requiredValue, capturedValue, deadline, description, status } = req.body;
    const userId = (req as any).userId;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Campo obrigatório: name",
      });
    }

    const result = await createProject({
      userId,
      name,
      segment,
      requiredValue,
      capturedValue: capturedValue || 0,
      deadline,
      description,
      status: status || "planejamento",
    });

    await createPlatformLog({
      userId,
      action: "project_created",
      details: `Project ${name} created`,
    });

    return res.status(201).json({
      success: true,
      message: "Projeto criado com sucesso",
      projectId: (result as any).insertId,
    });
  } catch (error) {
    console.error("Create project error:", error);
    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
    });
  }
});

/**
 * GET /api/projects
 * Listar projetos do usuário autenticado
 */
router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const projects = await getProjectsByUserId(userId);

    return res.json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error("Get projects error:", error);
    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
    });
  }
});

/**
 * GET /api/projects/:id
 * Obter detalhes de um projeto específico
 */
router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    const project = await getProjectById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Projeto não encontrado",
      });
    }

    if (project.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "Acesso negado",
      });
    }

    return res.json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("Get project error:", error);
    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
    });
  }
});

/**
 * PUT /api/projects/:id
 * Atualizar projeto
 */
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;
    const { name, segment, requiredValue, capturedValue, deadline, description, status } = req.body;

    const project = await getProjectById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Projeto não encontrado",
      });
    }

    if (project.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "Acesso negado",
      });
    }

    await updateProject(id, {
      name: name || project.name,
      segment: segment || project.segment,
      requiredValue: requiredValue !== undefined ? requiredValue : project.requiredValue,
      capturedValue: capturedValue !== undefined ? capturedValue : project.capturedValue,
      deadline: deadline || project.deadline,
      description: description || project.description,
      status: status || project.status,
    });

    await createPlatformLog({
      userId,
      action: "project_updated",
      details: `Project ${id} updated`,
    });

    return res.json({
      success: true,
      message: "Projeto atualizado com sucesso",
    });
  } catch (error) {
    console.error("Update project error:", error);
    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
    });
  }
});

/**
 * DELETE /api/projects/:id
 * Deletar projeto
 */
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    const project = await getProjectById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Projeto não encontrado",
      });
    }

    if (project.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "Acesso negado",
      });
    }

    await deleteProject(id);

    await createPlatformLog({
      userId,
      action: "project_deleted",
      details: `Project ${id} deleted`,
    });

    return res.json({
      success: true,
      message: "Projeto deletado com sucesso",
    });
  } catch (error) {
    console.error("Delete project error:", error);
    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
    });
  }
});

export default router;

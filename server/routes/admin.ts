import { Router, Request, Response } from "express";
import {
  getAllUsers,
  getUsersByType,
  getAllProperties,
  getAllProjects,
  getAllLeads,
  deleteUser,
  updateUser,
  getUserById,
  createPlatformLog,
} from "../db";
import { verifyToken } from "../auth";
import { ERROR_MESSAGES } from "../../shared/const";

const router = Router();

/**
 * Middleware de autenticação e verificação de admin
 */
function adminMiddleware(req: Request, res: Response, next: Function) {
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
 * Verificar se usuário é admin (será implementado após adicionar campo admin ao schema)
 */
async function isAdmin(userId: string): Promise<boolean> {
  const user = await getUserById(userId);
  return user?.userType === "admin";
}

/**
 * GET /api/admin/dashboard
 * Obter estatísticas gerais da plataforma
 */
router.get("/dashboard", adminMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    if (!(await isAdmin(userId))) {
      return res.status(403).json({
        success: false,
        message: "Acesso negado. Apenas administradores podem acessar.",
      });
    }

    const allUsers = await getAllUsers();
    const allProperties = await getAllProperties();
    const allProjects = await getAllProjects();
    const allLeads = await getAllLeads();

    const proprietarios = await getUsersByType("proprietario");
    const empresarios = await getUsersByType("empresario");
    const parceiros = await getUsersByType("parceiro");

    const stats = {
      users: {
        total: allUsers.length,
        proprietarios: proprietarios.length,
        empresarios: empresarios.length,
        parceiros: parceiros.length,
      },
      properties: {
        total: allProperties.length,
        totalValue: allProperties.reduce((sum: number, p: any) => sum + (p.value || 0), 0),
      },
      projects: {
        total: allProjects.length,
        requiredValue: allProjects.reduce((sum: number, p: any) => sum + (p.requiredValue || 0), 0),
        capturedValue: allProjects.reduce((sum: number, p: any) => sum + (p.capturedValue || 0), 0),
      },
      leads: {
        total: allLeads.length,
        converted: allLeads.filter((l: any) => l.status === "convertido").length,
      },
    };

    return res.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);
    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
    });
  }
});

/**
 * GET /api/admin/users
 * Listar todos os usuários
 */
router.get("/users", adminMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    if (!(await isAdmin(userId))) {
      return res.status(403).json({
        success: false,
        message: "Acesso negado. Apenas administradores podem acessar.",
      });
    }

    const users = await getAllUsers();

    return res.json({
      success: true,
      users: users.map((u: any) => ({
        id: u.id,
        email: u.email,
        firstName: u.firstName,
        lastName: u.lastName,
        userType: u.userType,
        createdAt: u.createdAt,
      })),
    });
  } catch (error) {
    console.error("Get users error:", error);
    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
    });
  }
});

/**
 * GET /api/admin/users/:id
 * Obter detalhes de um usuário
 */
router.get("/users/:id", adminMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    if (!(await isAdmin(userId))) {
      return res.status(403).json({
        success: false,
        message: "Acesso negado. Apenas administradores podem acessar.",
      });
    }

    const { id } = req.params;
    const user = await getUserById(id);

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
    console.error("Get user error:", error);
    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
    });
  }
});

/**
 * PUT /api/admin/users/:id
 * Editar usuário
 */
router.put("/users/:id", adminMiddleware, async (req: Request, res: Response) => {
  try {
    const adminId = (req as any).userId;

    if (!(await isAdmin(adminId))) {
      return res.status(403).json({
        success: false,
        message: "Acesso negado. Apenas administradores podem acessar.",
      });
    }

    const { id } = req.params;
    const { firstName, lastName, email, phone, profession } = req.body;

    const user = await getUserById(id);

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

    await updateUser(id, updateData);

    await createPlatformLog({
      userId: adminId,
      action: "user_edited",
      details: `User ${id} edited by admin`,
    });

    return res.json({
      success: true,
      message: "Usuário atualizado com sucesso",
    });
  } catch (error) {
    console.error("Update user error:", error);
    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
    });
  }
});

/**
 * DELETE /api/admin/users/:id
 * Deletar usuário
 */
router.delete("/users/:id", adminMiddleware, async (req: Request, res: Response) => {
  try {
    const adminId = (req as any).userId;

    if (!(await isAdmin(adminId))) {
      return res.status(403).json({
        success: false,
        message: "Acesso negado. Apenas administradores podem acessar.",
      });
    }

    const { id } = req.params;

    if (id === adminId) {
      return res.status(400).json({
        success: false,
        message: "Você não pode deletar sua própria conta",
      });
    }

    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
      });
    }

    await deleteUser(id);

    await createPlatformLog({
      userId: adminId,
      action: "user_deleted",
      details: `User ${id} deleted by admin`,
    });

    return res.json({
      success: true,
      message: "Usuário deletado com sucesso",
    });
  } catch (error) {
    console.error("Delete user error:", error);
    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
    });
  }
});

/**
 * GET /api/admin/properties
 * Listar todos os imóveis
 */
router.get("/properties", adminMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    if (!(await isAdmin(userId))) {
      return res.status(403).json({
        success: false,
        message: "Acesso negado. Apenas administradores podem acessar.",
      });
    }

    const properties = await getAllProperties();

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
 * GET /api/admin/projects
 * Listar todos os projetos
 */
router.get("/projects", adminMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    if (!(await isAdmin(userId))) {
      return res.status(403).json({
        success: false,
        message: "Acesso negado. Apenas administradores podem acessar.",
      });
    }

    const projects = await getAllProjects();

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
 * GET /api/admin/leads
 * Listar todos os leads
 */
router.get("/leads", adminMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    if (!(await isAdmin(userId))) {
      return res.status(403).json({
        success: false,
        message: "Acesso negado. Apenas administradores podem acessar.",
      });
    }

    const leads = await getAllLeads();

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

export default router;

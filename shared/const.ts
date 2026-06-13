export const COOKIE_NAME = "cobquattu_session";
export const TOKEN_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 dias
export const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;

/**
 * Mensagens de erro comuns
 */
export const ERROR_MESSAGES = {
  INVALID_EMAIL: "E-mail inválido",
  INVALID_PASSWORD: "Senha deve ter no mínimo 8 caracteres",
  USER_EXISTS: "Este e-mail já está registrado",
  INVALID_CREDENTIALS: "E-mail ou senha incorretos",
  MISSING_FIELDS: "Por favor, preencha todos os campos obrigatórios",
  SERVER_ERROR: "Erro no servidor. Tente novamente mais tarde",
  UNAUTHORIZED: "Você não está autenticado",
  FORBIDDEN: "Você não tem permissão para acessar este recurso",
};

/**
 * Mensagens de sucesso
 */
export const SUCCESS_MESSAGES = {
  REGISTRATION_SUCCESS: "Cadastro realizado com sucesso!",
  LOGIN_SUCCESS: "Bem-vindo ao ecossistema Cobquattu!",
  LOGOUT_SUCCESS: "Você foi desconectado",
  UPDATE_SUCCESS: "Informações atualizadas com sucesso",
};

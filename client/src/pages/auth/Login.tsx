import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowRight, Mail, Phone, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { api } from "@/lib/api";

export default function Login() {
  const auth = useAuth(); // 🔥 mais seguro
  const [, navigate] = useLocation();

  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.emailOrPhone || !formData.password) {
      toast.error("Por favor, preencha todos os campos.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        emailOrPhone: formData.emailOrPhone,
        password: formData.password,
      });

      if (response.data.success) {
        const user = response.data.user;

        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(user));

        // 🔥 atualiza estado global com segurança
        auth?.setUser?.(user);

        toast.success(
          response.data.message || "Bem-vindo ao ecossistema Cobquattu!"
        );

        const userType = user.userType;

        if (userType === "parceiro") navigate("/dashboard/parceiro");
        else if (userType === "proprietario")
          navigate("/dashboard/proprietario");
        else if (userType === "empresario")
          navigate("/dashboard/empresario");
        else if (userType === "admin") navigate("/dashboard/admin");
        else navigate("/dashboard");
      } else {
        toast.error(response.data.message || "Erro ao fazer login");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Erro ao fazer login. Tente novamente.";
      toast.error(errorMessage);
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold">COBQUATTU</h1>
          <p className="text-sm text-accent">Inteligência Territorial</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label>Email ou Telefone</label>
            <Input
              name="emailOrPhone"
              value={formData.emailOrPhone}
              onChange={handleInputChange}
              placeholder="Digite aqui"
            />
          </div>

          <div>
            <label>Senha</label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Sua senha"
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Autenticando..." : "Acessar"}
            <LogIn className="w-4 h-4 ml-2" />
          </Button>
        </form>
      </div>
    </div>
  );
}
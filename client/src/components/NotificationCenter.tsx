import { useState, useEffect } from 'react';
import { Bell, X, Check } from 'lucide-react';
import { api } from '@/lib/api';
import { toast } from 'sonner';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadNotifications();
    // Atualizar notificações a cada 30 segundos
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await axios.get('/api/notifications');
      if (response.data.success) {
        setNotifications(response.data.notifications);
      }
    } catch (error) {
      console.error('Erro ao carregar notificações:', error);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await axios.put(`/api/notifications/${id}/read`);
      setNotifications(notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      ));
    } catch (error) {
      console.error('Erro ao marcar notificação como lida:', error);
    }
  };

  const handleDeleteNotification = async (id: string) => {
    try {
      await axios.delete(`/api/notifications/${id}`);
      setNotifications(notifications.filter(n => n.id !== id));
    } catch (error) {
      console.error('Erro ao deletar notificação:', error);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/20 border-green-500/30';
      case 'warning':
        return 'bg-yellow-500/20 border-yellow-500/30';
      case 'error':
        return 'bg-red-500/20 border-red-500/30';
      default:
        return 'bg-blue-500/20 border-blue-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-blue-400';
    }
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-border rounded-lg transition relative"
      >
        <Bell className="w-5 h-5 text-foreground/60" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-background">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-background border border-border rounded-lg shadow-lg z-50">
          {/* Header */}
          <div className="px-4 py-3 border-b border-border flex justify-between items-center">
            <h3 className="font-bold text-foreground">Notificações</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-border rounded transition"
            >
              <X className="w-4 h-4 text-foreground/60" />
            </button>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <Bell className="w-8 h-8 text-foreground/20 mx-auto mb-2" />
                <p className="text-foreground/60 text-sm">Nenhuma notificação</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 border-b border-border last:border-b-0 ${
                    !notification.read ? 'bg-accent/5' : ''
                  }`}
                >
                  <div className="flex gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${getTypeIcon(notification.type)}`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm">{notification.title}</p>
                      <p className="text-foreground/60 text-xs mt-1">{notification.message}</p>
                      <p className="text-foreground/40 text-xs mt-2">
                        {new Date(notification.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      {!notification.read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="p-1 hover:bg-border rounded transition"
                          title="Marcar como lida"
                        >
                          <Check className="w-4 h-4 text-foreground/60" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteNotification(notification.id)}
                        className="p-1 hover:bg-red-500/20 rounded transition"
                        title="Deletar"
                      >
                        <X className="w-4 h-4 text-foreground/60" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-2 border-t border-border text-center">
              <button className="text-sm text-accent hover:text-accent/80 font-medium">
                Ver todas as notificações
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/Layout/MobileLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  MapPin,
  Bell,
  Globe,
  LogOut,
  ChevronRight,
  Shield,
  HelpCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [notifications, setNotifications] = useState(true);
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: t("profile.loggedOut"),
      description: t("profile.loggedOutDesc"),
    });
    navigate("/");
  };

  return (
    <MobileLayout>
      {/* Header */}
      <div className="gradient-primary p-4 rounded-b-3xl">
        <h1 className="text-2xl font-bold text-primary-foreground">{t("profile.title")}</h1>
        <p className="text-primary-foreground/80 text-sm">
          {t("profile.subtitle")}
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile Card */}
        <Card className="p-6 rounded-2xl card-shadow">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-10 w-10 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">Rakesh Sharma</h2>
              <p className="text-sm text-muted-foreground">{t("profile.farmer")}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3" />
                Green Valley CHC
              </p>
            </div>
          </div>
        </Card>

        {/* Settings */}
        <Card className="rounded-2xl overflow-hidden card-shadow divide-y">
          <div className="p-4 space-y-3">
            <Label>{t("profile.language")}</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="h-11 rounded-xl">
                <Globe className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">{t("profile.notifications")}</p>
                <p className="text-xs text-muted-foreground">
                  {t("profile.notificationsDesc")}
                </p>
              </div>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>
        </Card>

        {/* Menu Items */}
        <Card className="rounded-2xl overflow-hidden card-shadow divide-y">
          <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-medium">{t("profile.privacySecurity")}</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>

          <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <HelpCircle className="h-5 w-5 text-primary" />
              <span className="font-medium">{t("profile.helpSupport")}</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        </Card>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="destructive"
          className="w-full h-12 rounded-xl"
        >
          <LogOut className="h-4 w-4 mr-2" />
          {t("profile.logout")}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          {t("profile.version")}
        </p>
      </div>
    </MobileLayout>
  );
};

export default Profile;

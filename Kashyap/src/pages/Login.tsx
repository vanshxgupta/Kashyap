import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tractor } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [role, setRole] = useState("farmer");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleLogin = () => {
    if (!mobile || !otp) {
      toast({
        title: "Missing Information",
        description: "Please enter mobile number and OTP",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Login Successful",
      description: "Welcome to Smart CRM",
    });
    navigate("/home");
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto bg-primary rounded-2xl flex items-center justify-center elevated-shadow">
            <Tractor className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">{t("login.title")}</h1>
          <p className="text-muted-foreground">{t("login.subtitle")}</p>
        </div>

        {/* Form */}
        <div className="bg-card rounded-3xl p-6 card-shadow space-y-6">
          <div className="space-y-2">
            <Label htmlFor="mobile">{t("login.mobile")}</Label>
            <Input
              id="mobile"
              type="tel"
              placeholder={t("login.mobilePlaceholder")}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="h-12 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="otp">{t("login.otp")}</Label>
            <Input
              id="otp"
              type="text"
              placeholder={t("login.otpPlaceholder")}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="h-12 rounded-xl"
            />
          </div>

          <div className="space-y-3">
            <Label>{t("login.role")}</Label>
            <RadioGroup value={role} onValueChange={setRole}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="farmer" id="farmer" />
                <Label htmlFor="farmer" className="cursor-pointer">{t("login.farmer")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="chc" id="chc" />
                <Label htmlFor="chc" className="cursor-pointer">{t("login.chcOperator")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="agent" id="agent" />
                <Label htmlFor="agent" className="cursor-pointer">{t("login.localAgent")}</Label>
              </div>
            </RadioGroup>
          </div>

          <Button
            onClick={handleLogin}
            className="w-full h-12 gradient-primary hover:opacity-90 transition-opacity"
          >
            {t("login.continue")}
          </Button>

          <button
            onClick={() => navigate("/home")}
            className="w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {t("login.guest")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

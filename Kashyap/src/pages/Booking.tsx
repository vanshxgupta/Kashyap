import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/Layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, CheckCircle2, Tractor } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Booking = () => {
  const [duration, setDuration] = useState("2");
  const [payment, setPayment] = useState("upi");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleConfirm = () => {
    setShowSuccess(true);
    setTimeout(() => {
      toast({
        title: t("booking.success"),
        description: t("booking.successMsg"),
      });
      navigate("/bookings");
    }, 2000);
  };

  if (showSuccess) {
    return (
      <MobileLayout showBottomNav={false}>
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 mx-auto bg-success/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-16 w-16 text-success" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">{t("booking.success")}</h2>
              <p className="text-muted-foreground">
                {t("booking.successMsg")}
              </p>
            </div>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout showBottomNav={false}>
      {/* Header */}
      <div className="gradient-primary p-4 rounded-b-3xl">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-primary-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-primary-foreground">
            {t("booking.title")}
          </h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Machine Summary */}
        <Card className="p-4 rounded-2xl card-shadow">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Tractor className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">Super Seeder Pro</h3>
              <p className="text-sm text-muted-foreground">Green Valley CHC</p>
              <p className="text-sm text-muted-foreground mt-1">
                {t("track.operator")}: Rajesh Kumar
              </p>
            </div>
          </div>
        </Card>

        {/* Duration */}
        <Card className="p-4 rounded-2xl card-shadow space-y-3">
          <Label>{t("booking.duration")}</Label>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger className="h-11 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 {t("common.hours")}</SelectItem>
              <SelectItem value="2">2 {t("common.hours")}</SelectItem>
              <SelectItem value="4">4 {t("common.hours")}</SelectItem>
              <SelectItem value="8">8 {t("common.hours")}</SelectItem>
            </SelectContent>
          </Select>
        </Card>

        {/* Cost Breakdown */}
        <Card className="p-4 rounded-2xl card-shadow space-y-3">
          <h3 className="font-semibold">{t("booking.totalCost")}</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("machine.cost")}</span>
              <span>₹500</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("booking.duration")}</span>
              <span>{duration} {t("common.hours")}</span>
            </div>
            <div className="flex justify-between pt-2 border-t font-semibold text-lg">
              <span>{t("booking.totalCost")}</span>
              <span className="text-primary">₹{500 * parseInt(duration)}</span>
            </div>
          </div>
        </Card>

        {/* Payment Method */}
        <Card className="p-4 rounded-2xl card-shadow space-y-3">
          <Label>{t("booking.payment")}</Label>
          <RadioGroup value={payment} onValueChange={setPayment}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="upi" id="upi" />
              <Label htmlFor="upi" className="cursor-pointer">{t("booking.upi")}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cash" id="cash" />
              <Label htmlFor="cash" className="cursor-pointer">{t("booking.cash")}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="subsidy" id="subsidy" />
              <Label htmlFor="subsidy" className="cursor-pointer">
                {t("booking.subsidy")}
              </Label>
            </div>
          </RadioGroup>
        </Card>

        {/* Confirm Button */}
        <Button
          onClick={handleConfirm}
          className="w-full h-12 rounded-xl gradient-primary text-lg"
        >
          {t("booking.confirm")}
        </Button>
      </div>
    </MobileLayout>
  );
};

export default Booking;

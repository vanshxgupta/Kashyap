import { useState } from "react";
import MobileLayout from "@/components/Layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Camera, Send, MessageCircle, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Support = () => {
  const [issue, setIssue] = useState("");
  const [remarks, setRemarks] = useState("");
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = () => {
    if (!issue || !remarks) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: t("support.reportSuccess"),
      description: t("support.reportSuccess"),
    });
    setIssue("");
    setRemarks("");
  };

  return (
    <MobileLayout>
      {/* Header */}
      <div className="gradient-primary p-4 rounded-b-3xl">
        <h1 className="text-2xl font-bold text-primary-foreground">{t("support.title")}</h1>
        <p className="text-primary-foreground/80 text-sm">
          {t("support.subtitle")}
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* Quick Contact */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 rounded-2xl card-shadow flex flex-col items-center gap-2 cursor-pointer hover:elevated-shadow transition-shadow">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xs font-medium">{t("support.callSupport")}</span>
          </Card>
          <Card className="p-4 rounded-2xl card-shadow flex flex-col items-center gap-2 cursor-pointer hover:elevated-shadow transition-shadow">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xs font-medium">{t("support.whatsapp")}</span>
          </Card>
          <Card className="p-4 rounded-2xl card-shadow flex flex-col items-center gap-2 cursor-pointer hover:elevated-shadow transition-shadow">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xs font-medium">Email</span>
          </Card>
        </div>

        {/* Report Issue Form */}
        <Card className="p-4 rounded-2xl card-shadow space-y-4">
          <h3 className="font-semibold text-lg">{t("support.reportIssue")}</h3>

          <div className="space-y-2">
            <Label>{t("support.issueCategory")}</Label>
            <Select value={issue} onValueChange={setIssue}>
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue placeholder={t("support.selectCategory")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="machine">{t("support.machineIssue")}</SelectItem>
                <SelectItem value="delay">{t("support.delay")}</SelectItem>
                <SelectItem value="overcharge">{t("support.overcharge")}</SelectItem>
                <SelectItem value="other">{t("support.other")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>{t("support.remarks")}</Label>
            <Textarea
              placeholder={t("support.remarksPlaceholder")}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="min-h-32 rounded-xl resize-none"
            />
          </div>

          <Button
            variant="outline"
            className="w-full h-11 rounded-xl"
          >
            <Camera className="h-4 w-4 mr-2" />
            {t("support.uploadImage")}
          </Button>

          <Button
            onClick={handleSubmit}
            className="w-full h-12 rounded-xl gradient-primary"
          >
            <Send className="h-4 w-4 mr-2" />
            {t("support.submit")}
          </Button>
        </Card>

        {/* FAQ Section */}
        <Card className="p-4 rounded-2xl card-shadow">
          <h3 className="font-semibold mb-3">{t("support.faq")}</h3>
          <div className="space-y-3">
            <div className="pb-3 border-b">
              <p className="font-medium text-sm mb-1">
                {t("support.howToBook")}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("support.howToBookAns")}
              </p>
            </div>
            <div className="pb-3 border-b">
              <p className="font-medium text-sm mb-1">
                {t("support.paymentMethods")}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("support.paymentMethodsAns")}
              </p>
            </div>
            <div>
              <p className="font-medium text-sm mb-1">
                {t("support.cancelBooking")}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("support.cancelBookingAns")}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default Support;

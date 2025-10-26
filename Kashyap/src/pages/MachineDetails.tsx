import { useNavigate, useParams } from "react-router-dom";
import MobileLayout from "@/components/Layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  ArrowLeft,
  Star,
  MapPin,
  Phone,
  Calendar,
  Clock,
  User,
  Tractor,
} from "lucide-react";

const MachineDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <MobileLayout showBottomNav={false}>
      {/* Header */}
      <div className="gradient-primary p-4 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-primary-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-primary-foreground">{t("machine.details")}</h1>
        </div>
      </div>

      {/* Machine Image */}
      <div className="p-4">
        <Card className="h-56 rounded-2xl overflow-hidden card-shadow bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
          <Tractor className="h-24 w-24 text-primary" />
        </Card>
      </div>

      {/* Details */}
      <div className="px-4 space-y-4">
        <div>
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-2xl font-bold">Super Seeder Pro</h2>
              <p className="text-muted-foreground">Green Valley CHC</p>
            </div>
            <Badge className="bg-success text-success-foreground">
              <Star className="h-3 w-3 mr-1 fill-current" />
              4.8
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              2.3 {t("common.km")}
            </span>
            <span className="text-2xl font-bold text-primary">₹500/{t("common.hr")}</span>
          </div>
        </div>

        {/* Operator Info */}
        <Card className="p-4 rounded-2xl card-shadow">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <User className="h-4 w-4" />
            {t("machine.operator")}
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">Rajesh Kumar</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("machine.rating")}</span>
              <span className="font-medium flex items-center gap-1">
                <Star className="h-3 w-3 fill-primary text-primary" />
                4.9 (156 bookings)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Experience</span>
              <span className="font-medium">8 years</span>
            </div>
          </div>
        </Card>

        {/* Availability */}
        <Card className="p-4 rounded-2xl card-shadow">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {t("machine.availability")}
          </h3>
          <div className="grid grid-cols-7 gap-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
              <div
                key={day}
                className={`text-center p-2 rounded-lg text-xs ${
                  i < 5 ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                }`}
              >
                {day}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {t("machine.available")}: 6:00 AM - 8:00 PM
          </p>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 pb-6">
          <Button
            variant="outline"
            className="flex-1 h-12 rounded-xl"
            onClick={() => window.open("tel:+911234567890")}
          >
            <Phone className="h-4 w-4 mr-2" />
            {t("machine.callOperator")}
          </Button>
          <Button
            className="flex-1 h-12 rounded-xl gradient-primary"
            onClick={() => navigate("/booking")}
          >
            {t("machine.bookNow")}
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default MachineDetails;

import MobileLayout from "@/components/Layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Calendar, Clock, Tractor } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const bookings = [
  {
    id: 1,
    machine: "Super Seeder Pro",
    date: "Today, 10:00 AM",
    duration: "2 hours",
    cost: 1000,
    status: "active",
  },
  {
    id: 2,
    machine: "Hay Baler Max",
    date: "15 Jan 2025",
    duration: "4 hours",
    cost: 3000,
    status: "completed",
  },
  {
    id: 3,
    machine: "Harvest King 3000",
    date: "20 Jan 2025",
    duration: "1 day",
    cost: 9600,
    status: "upcoming",
  },
];

const Bookings = () => {
  const { t } = useLanguage();

  // Helper: return class names for buttons by status
  const getButtonStyle = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500 hover:bg-green-600 text-white";
      case "completed":
        return "bg-red-500 hover:bg-red-600 text-white";
      default:
        return "bg-yellow-400 hover:bg-yellow-500 text-black";
    }
  };

  // Helper: return badge colors by status
  const getBadgeStyle = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "completed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <MobileLayout>
      {/* Header */}
      <div className="gradient-primary p-4 rounded-b-3xl">
        <h1 className="text-2xl font-bold text-primary-foreground">
          {t("bookings.title")}
        </h1>
        <p className="text-primary-foreground/80 text-sm">
          {t("bookings.subtitle")}
        </p>
      </div>

      {/* Tabs Section */}
      <div className="p-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4 bg-muted/50 rounded-xl p-1">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
            >
              {t("bookings.all")}
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="data-[state=active]:bg-green-500 data-[state=active]:text-white rounded-lg transition-all"
            >
              {t("bookings.active")}
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-red-500 data-[state=active]:text-white rounded-lg transition-all"
            >
              {t("bookings.past")}
            </TabsTrigger>
          </TabsList>

          {/* All Bookings */}
          <TabsContent value="all" className="space-y-3 mt-0">
            {bookings.map((booking) => (
              <Card key={booking.id} className="p-4 rounded-2xl card-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Tractor className="h-7 w-7 text-primary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold">{booking.machine}</h3>
                      <Badge className={`${getBadgeStyle(booking.status)}`}>
                        {booking.status === "active"
                          ? t("bookings.active")
                          : booking.status === "completed"
                            ? t("bookings.completed")
                            : t("bookings.scheduled")}
                      </Badge>
                    </div>

                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {booking.date}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {booking.duration}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t">
                      <span className="text-lg font-bold text-primary">
                        ₹{booking.cost}
                      </span>
                      <Button
                        size="sm"
                        className={`rounded-lg transition-all ${getButtonStyle(
                          booking.status
                        )}`}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        {t("bookings.download")}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Active Bookings */}
          <TabsContent value="active" className="space-y-3 mt-0">
            {bookings
              .filter((b) => b.status === "active")
              .map((booking) => (
                <Card key={booking.id} className="p-4 rounded-2xl card-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Tractor className="h-7 w-7 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2 text-green-700">
                        {booking.machine}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {booking.date} • {booking.duration}
                      </p>
                      <Button
                        size="sm"
                        className={`mt-3 ${getButtonStyle("active")} rounded-lg`}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        {t("bookings.download")}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
          </TabsContent>

          {/* Completed Bookings */}
          <TabsContent value="completed" className="space-y-3 mt-0">
            {bookings
              .filter((b) => b.status === "completed")
              .map((booking) => (
                <Card key={booking.id} className="p-4 rounded-2xl card-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                      <Tractor className="h-7 w-7 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2 text-red-700">
                        {booking.machine}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {booking.date} • {booking.duration}
                      </p>
                      <Button
                        size="sm"
                        className={`mt-3 ${getButtonStyle("completed")} rounded-lg`}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        {t("bookings.download")}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
};

export default Bookings;

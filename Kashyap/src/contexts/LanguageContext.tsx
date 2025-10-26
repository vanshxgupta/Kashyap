import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "english" | "hindi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("app-language");
    return (saved as Language) || "english";
  });

  useEffect(() => {
    localStorage.setItem("app-language", language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations: Record<Language, Record<string, string>> = {
  english: {
    // Onboarding
    "app.name": "Smart CRM",
    "app.tagline": "Sustainable Farming, Smarter Monitoring",
    "onboarding.slide1.title": "Find & Book Machines",
    "onboarding.slide1.desc": "Discover nearby farm machines and book instantly",
    "onboarding.slide2.title": "Track in Real-Time",
    "onboarding.slide2.desc": "Monitor machine usage and location live",
    "onboarding.slide3.title": "Book via Agents",
    "onboarding.slide3.desc": "Works offline through local CHC agents",
    "onboarding.getStarted": "Get Started",

    // Login
    "login.title": "Welcome Back",
    "login.subtitle": "Login to continue",
    "login.mobile": "Mobile Number",
    "login.mobilePlaceholder": "Enter your mobile number",
    "login.otp": "OTP",
    "login.otpPlaceholder": "Enter OTP",
    "login.role": "Select Your Role",
    "login.farmer": "Farmer",
    "login.chcOperator": "CHC Operator",
    "login.localAgent": "Local Agent",
    "login.guest": "Continue as Guest",
    "login.continue": "Continue",

    // Home
    "home.title": "Smart CRM",
    "home.search": "Search machine type or nearby CHC",
    "home.filterAll": "All Machines",
    "home.filterSeeder": "Seeder",
    "home.filterBaler": "Baler",
    "home.filterHarvester": "Harvester",
    "home.available": "Available Machines",
    "home.bookNow": "Book Now",

    // Machine Details
    "machine.details": "Machine Details",
    "machine.type": "Type",
    "machine.chc": "CHC Location",
    "machine.cost": "Cost per Hour",
    "machine.operator": "Operator",
    "machine.rating": "Rating",
    "machine.availability": "Availability Calendar",
    "machine.available": "Available",
    "machine.booked": "Booked",
    "machine.bookNow": "Book Now",
    "machine.callOperator": "Call Operator",

    // Booking
    "booking.title": "Booking Summary",
    "booking.machine": "Selected Machine",
    "booking.duration": "Duration (hours)",
    "booking.selectDuration": "Select duration",
    "booking.totalCost": "Total Cost",
    "booking.payment": "Payment Method",
    "booking.upi": "UPI Payment",
    "booking.cash": "Cash Payment",
    "booking.subsidy": "Government Subsidy",
    "booking.confirm": "Confirm Booking",
    "booking.success": "Booking Confirmed!",
    "booking.successMsg": "Your booking has been confirmed successfully",

    // Track
    "track.title": "Live Tracking",
    "track.subtitle": "Track your machine in real-time",
    "track.currentLocation": "Current Location",
    "track.estimatedTime": "Estimated Time",
    "track.remaining": "remaining",
    "track.operator": "Operator",
    "track.contactOperator": "Contact Operator",
    "track.statusTimeline": "Status Timeline",
    "track.currentlyWorking": "Currently Working",
    "track.arrivedAt": "Arrived at Location",
    "track.enRoute": "En Route",
    "track.confirmed": "Booking Confirmed",
    "track.inUse": "In Use",

    // Bookings
    "bookings.title": "My Bookings",
    "bookings.subtitle": "View and manage your bookings",
    "bookings.all": "All",
    "bookings.active": "Active",
    "bookings.past": "Past",
    "bookings.duration": "Duration",
    "bookings.totalCost": "Total Cost",
    "bookings.download": "Download Receipt",
    "bookings.completed": "Completed",
    "bookings.scheduled": "Scheduled",

    // Support
    "support.title": "Support",
    "support.subtitle": "We're here to help",
    "support.quickContact": "Quick Contact",
    "support.callSupport": "Call Support",
    "support.whatsapp": "WhatsApp",
    "support.reportIssue": "Report an Issue",
    "support.issueCategory": "Issue Category",
    "support.selectCategory": "Select category",
    "support.machineIssue": "Machine Issue",
    "support.delay": "Delay in Service",
    "support.overcharge": "Overcharge",
    "support.other": "Other",
    "support.remarks": "Additional Remarks",
    "support.remarksPlaceholder": "Describe your issue...",
    "support.uploadImage": "Upload Image (Optional)",
    "support.submit": "Submit Report",
    "support.faq": "Frequently Asked Questions",
    "support.howToBook": "How to book a machine?",
    "support.howToBookAns": "Select a machine from the home screen, check availability, and click 'Book Now'. Choose your time slot and confirm payment.",
    "support.paymentMethods": "What payment methods are available?",
    "support.paymentMethodsAns": "We accept UPI, cash payments, and government subsidy schemes.",
    "support.cancelBooking": "Can I cancel my booking?",
    "support.cancelBookingAns": "Yes, you can cancel up to 2 hours before the scheduled time for a full refund.",
    "support.reportSuccess": "Report submitted successfully",

    // Profile
    "profile.title": "Profile",
    "profile.subtitle": "Manage your account",
    "profile.farmer": "Farmer",
    "profile.language": "Language",
    "profile.notifications": "Notifications",
    "profile.notificationsDesc": "Receive booking updates",
    "profile.privacySecurity": "Privacy & Security",
    "profile.helpSupport": "Help & Support",
    "profile.logout": "Logout",
    "profile.version": "Version 1.0.0",
    "profile.loggedOut": "Logged Out",
    "profile.loggedOutDesc": "You have been logged out successfully",

    // Common
    "common.km": "km",
    "common.hr": "hr",
    "common.hours": "hours",
    "common.status": "Status",
    "common.active": "active",
    "common.idle": "idle",
    "common.maintenance": "maintenance",

    // Bottom Nav
    "nav.home": "Home",
    "nav.bookings": "Bookings",
    "nav.track": "Track",
    "nav.support": "Support",
    "nav.profile": "Profile",
  },
  hindi: {
    // Onboarding
    "app.name": "स्मार्ट CRM",
    "app.tagline": "टिकाऊ खेती, बेहतर निगरानी",
    "onboarding.slide1.title": "मशीनें खोजें और बुक करें",
    "onboarding.slide1.desc": "नजदीकी कृषि मशीनें खोजें और तुरंत बुक करें",
    "onboarding.slide2.title": "रियल-टाइम ट्रैकिंग",
    "onboarding.slide2.desc": "मशीन के उपयोग और स्थान की लाइव निगरानी करें",
    "onboarding.slide3.title": "एजेंट के माध्यम से बुकिंग",
    "onboarding.slide3.desc": "स्थानीय CHC एजेंट के माध्यम से ऑफलाइन काम करता है",
    "onboarding.getStarted": "शुरू करें",

    // Login
    "login.title": "वापस स्वागत है",
    "login.subtitle": "जारी रखने के लिए लॉगिन करें",
    "login.mobile": "मोबाइल नंबर",
    "login.mobilePlaceholder": "अपना मोबाइल नंबर दर्ज करें",
    "login.otp": "OTP",
    "login.otpPlaceholder": "OTP दर्ज करें",
    "login.role": "अपनी भूमिका चुनें",
    "login.farmer": "किसान",
    "login.chcOperator": "CHC संचालक",
    "login.localAgent": "स्थानीय एजेंट",
    "login.guest": "अतिथि के रूप में जारी रखें",
    "login.continue": "जारी रखें",

    // Home
    "home.title": "स्मार्ट CRM",
    "home.search": "मशीन का प्रकार या नजदीकी CHC खोजें",
    "home.filterAll": "सभी मशीनें",
    "home.filterSeeder": "सीडर",
    "home.filterBaler": "बेलर",
    "home.filterHarvester": "हार्वेस्टर",
    "home.available": "उपलब्ध मशीनें",
    "home.bookNow": "अभी बुक करें",

    // Machine Details
    "machine.details": "मशीन विवरण",
    "machine.type": "प्रकार",
    "machine.chc": "CHC स्थान",
    "machine.cost": "प्रति घंटा लागत",
    "machine.operator": "संचालक",
    "machine.rating": "रेटिंग",
    "machine.availability": "उपलब्धता कैलेंडर",
    "machine.available": "उपलब्ध",
    "machine.booked": "बुक किया गया",
    "machine.bookNow": "अभी बुक करें",
    "machine.callOperator": "संचालक को कॉल करें",

    // Booking
    "booking.title": "बुकिंग सारांश",
    "booking.machine": "चयनित मशीन",
    "booking.duration": "अवधि (घंटे)",
    "booking.selectDuration": "अवधि चुनें",
    "booking.totalCost": "कुल लागत",
    "booking.payment": "भुगतान का तरीका",
    "booking.upi": "UPI भुगतान",
    "booking.cash": "नकद भुगतान",
    "booking.subsidy": "सरकारी सब्सिडी",
    "booking.confirm": "बुकिंग की पुष्टि करें",
    "booking.success": "बुकिंग की पुष्टि हो गई!",
    "booking.successMsg": "आपकी बुकिंग सफलतापूर्वक पुष्टि हो गई है",

    // Track
    "track.title": "लाइव ट्रैकिंग",
    "track.subtitle": "अपनी मशीन को रियल-टाइम में ट्रैक करें",
    "track.currentLocation": "वर्तमान स्थान",
    "track.estimatedTime": "अनुमानित समय",
    "track.remaining": "शेष",
    "track.operator": "संचालक",
    "track.contactOperator": "संचालक से संपर्क करें",
    "track.statusTimeline": "स्थिति समयरेखा",
    "track.currentlyWorking": "वर्तमान में काम कर रहा है",
    "track.arrivedAt": "स्थान पर पहुंचा",
    "track.enRoute": "रास्ते में",
    "track.confirmed": "बुकिंग की पुष्टि हुई",
    "track.inUse": "उपयोग में",

    // Bookings
    "bookings.title": "मेरी बुकिंग",
    "bookings.subtitle": "अपनी बुकिंग देखें और प्रबंधित करें",
    "bookings.all": "सभी",
    "bookings.active": "सक्रिय",
    "bookings.past": "पिछला",
    "bookings.duration": "अवधि",
    "bookings.totalCost": "कुल लागत",
    "bookings.download": "रसीद डाउनलोड करें",
    "bookings.completed": "पूर्ण",
    "bookings.scheduled": "निर्धारित",

    // Support
    "support.title": "सहायता",
    "support.subtitle": "हम मदद के लिए यहां हैं",
    "support.quickContact": "त्वरित संपर्क",
    "support.callSupport": "सहायता को कॉल करें",
    "support.whatsapp": "व्हाट्सएप",
    "support.reportIssue": "समस्या की रिपोर्ट करें",
    "support.issueCategory": "समस्या श्रेणी",
    "support.selectCategory": "श्रेणी चुनें",
    "support.machineIssue": "मशीन की समस्या",
    "support.delay": "सेवा में देरी",
    "support.overcharge": "अधिक शुल्क",
    "support.other": "अन्य",
    "support.remarks": "अतिरिक्त टिप्पणियां",
    "support.remarksPlaceholder": "अपनी समस्या का वर्णन करें...",
    "support.uploadImage": "छवि अपलोड करें (वैकल्पिक)",
    "support.submit": "रिपोर्ट जमा करें",
    "support.faq": "अक्सर पूछे जाने वाले प्रश्न",
    "support.howToBook": "मशीन कैसे बुक करें?",
    "support.howToBookAns": "होम स्क्रीन से एक मशीन चुनें, उपलब्धता जांचें, और 'अभी बुक करें' पर क्लिक करें। अपना समय स्लॉट चुनें और भुगतान की पुष्टि करें।",
    "support.paymentMethods": "कौन से भुगतान के तरीके उपलब्ध हैं?",
    "support.paymentMethodsAns": "हम UPI, नकद भुगतान और सरकारी सब्सिडी योजनाओं को स्वीकार करते हैं।",
    "support.cancelBooking": "क्या मैं अपनी बुकिंग रद्द कर सकता हूं?",
    "support.cancelBookingAns": "हां, आप पूर्ण रिफंड के लिए निर्धारित समय से 2 घंटे पहले तक रद्द कर सकते हैं।",
    "support.reportSuccess": "रिपोर्ट सफलतापूर्वक जमा हुई",

    // Profile
    "profile.title": "प्रोफाइल",
    "profile.subtitle": "अपने खाते को प्रबंधित करें",
    "profile.farmer": "किसान",
    "profile.language": "भाषा",
    "profile.notifications": "सूचनाएं",
    "profile.notificationsDesc": "बुकिंग अपडेट प्राप्त करें",
    "profile.privacySecurity": "गोपनीयता और सुरक्षा",
    "profile.helpSupport": "सहायता और समर्थन",
    "profile.logout": "लॉग आउट",
    "profile.version": "संस्करण 1.0.0",
    "profile.loggedOut": "लॉग आउट हो गया",
    "profile.loggedOutDesc": "आप सफलतापूर्वक लॉग आउट हो गए हैं",

    // Common
    "common.km": "किमी",
    "common.hr": "घंटा",
    "common.hours": "घंटे",
    "common.status": "स्थिति",
    "common.active": "सक्रिय",
    "common.idle": "निष्क्रिय",
    "common.maintenance": "रखरखाव",

    // Bottom Nav
    "nav.home": "होम",
    "nav.bookings": "बुकिंग",
    "nav.track": "ट्रैक",
    "nav.support": "सहायता",
    "nav.profile": "प्रोफाइल",
  },
};

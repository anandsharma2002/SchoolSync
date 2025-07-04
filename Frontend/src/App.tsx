
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Classes from "./pages/dashboard/Classes";
import Teachers from "./pages/dashboard/Teachers";
import Students from "./pages/dashboard/Students";
import Courses from "./pages/dashboard/Courses";
import Schedule from "./pages/dashboard/Schedule";
import Reports from "./pages/dashboard/Reports";
import Settings from "./pages/dashboard/Settings";
import Announcements from "./pages/dashboard/Announcements";
import Payment from "./pages/dashboard/Payment";
import Leave from "./pages/dashboard/Leave";

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes with navigation */}
          <Route path="/" element={
            <div className="min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1">
                <Home />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/about" element={
            <div className="min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1">
                <About />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/pricing" element={
            <div className="min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1">
                <Pricing />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/contact" element={
            <div className="min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1">
                <Contact />
              </main>
              <Footer />
            </div>
          } />
          
          {/* Dashboard routes without public navigation */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="classes" element={<Classes />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="students" element={<Students />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="payment" element={<Payment />} />
            <Route path="leave" element={<Leave />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

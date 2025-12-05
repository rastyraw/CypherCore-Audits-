import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import Clients from "@/pages/clients";
import Insights from "@/pages/insights";
import Contact from "@/pages/contact";
import ServiceSOC2 from "@/pages/service-soc2";
import ServiceISO27001 from "@/pages/service-iso27001";
import ServiceHIPAA from "@/pages/service-hipaa";
import ServiceNIST from "@/pages/service-nist";
import ServiceCloud from "@/pages/service-cloud";
import Team from "@/pages/team";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/team" component={Team} />
      <Route path="/services" component={Services} />
      <Route path="/services/soc2" component={ServiceSOC2} />
      <Route path="/services/iso27001" component={ServiceISO27001} />
      <Route path="/services/hipaa" component={ServiceHIPAA} />
      <Route path="/services/nist" component={ServiceNIST} />
      <Route path="/services/cloud" component={ServiceCloud} />
      <Route path="/clients" component={Clients} />
      <Route path="/insights" component={Insights} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex min-h-screen flex-col">
          <Navigation />
          <div className="flex-1">
            <Router />
          </div>
          <Footer />
        </div>
        <ChatWidget />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

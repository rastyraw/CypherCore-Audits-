import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, User, Bot, Minimize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";

interface Message {
  id: string;
  message: string;
  isFromVisitor: string;
  createdAt: string;
}

function generateVisitorId(): string {
  const stored = localStorage.getItem("ciphercore_visitor_id");
  if (stored) return stored;
  const newId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  localStorage.setItem("ciphercore_visitor_id", newId);
  return newId;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [visitorInfo, setVisitorInfo] = useState({ name: "", email: "" });
  const [visitorId] = useState(generateVisitorId);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasLoadedHistory = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const loadChatHistory = async () => {
      if (isOpen && !hasLoadedHistory.current) {
        hasLoadedHistory.current = true;
        setIsLoadingHistory(true);
        try {
          const response = await fetch(`/api/chat/${visitorId}`);
          if (response.ok) {
            const history: Message[] = await response.json();
            if (history.length > 0) {
              setMessages(history);
              setHasStarted(true);
              const storedName = localStorage.getItem("ciphercore_visitor_name");
              const storedEmail = localStorage.getItem("ciphercore_visitor_email");
              if (storedName) {
                setVisitorInfo({ name: storedName, email: storedEmail || "" });
              }
            }
          }
        } catch (error) {
          console.error("Failed to load chat history:", error);
        } finally {
          setIsLoadingHistory(false);
        }
      }
    };
    loadChatHistory();
  }, [isOpen, visitorId]);

  const handleStartChat = () => {
    if (visitorInfo.name.trim()) {
      localStorage.setItem("ciphercore_visitor_name", visitorInfo.name);
      if (visitorInfo.email) {
        localStorage.setItem("ciphercore_visitor_email", visitorInfo.email);
      }
      setHasStarted(true);
      setMessages([
        {
          id: "welcome",
          message: `Hello ${visitorInfo.name}! Welcome to CipherCore Audits. How can we help you with your cybersecurity compliance needs today?`,
          isFromVisitor: "false",
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isSending) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    setIsSending(true);

    const tempMessage: Message = {
      id: `temp_${Date.now()}`,
      message: userMessage,
      isFromVisitor: "true",
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempMessage]);

    try {
      await apiRequest("POST", "/api/chat", {
        visitorId,
        name: visitorInfo.name,
        email: visitorInfo.email || undefined,
        message: userMessage,
        isFromVisitor: "true",
      });

      setTimeout(() => {
        const autoReply: Message = {
          id: `auto_${Date.now()}`,
          message: getAutoReply(userMessage),
          isFromVisitor: "false",
          createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, autoReply]);
      }, 1000);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const getAutoReply = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("pricing")) {
      return "Our services start from $2,800 for Cloud Security Review. For detailed pricing on specific services like SOC 2 ($3,500), ISO 27001 ($4,800), HIPAA ($3,200), or NIST/CMMC ($5,000), I'd recommend scheduling a free consultation where we can discuss your specific needs.";
    }
    if (lowerMessage.includes("soc 2") || lowerMessage.includes("soc2")) {
      return "Our SOC 2 Readiness assessment prepares your organization for a successful Type I or Type II audit. Starting at $3,500, it includes comprehensive gap analysis, risk assessment, and a 30-day post-assessment support. Would you like to schedule a consultation?";
    }
    if (lowerMessage.includes("iso") || lowerMessage.includes("27001")) {
      return "ISO 27001 certification helps establish a world-class information security management system. Our readiness assessment starts at $4,800 and includes full ISMS gap analysis and certification body liaison assistance.";
    }
    if (lowerMessage.includes("hipaa")) {
      return "Our HIPAA Compliance Validation ensures your organization meets all requirements for protecting patient health information. Starting at $3,200, we cover Privacy Rule, Security Rule, and Breach Notification Rule assessments.";
    }
    if (lowerMessage.includes("timeline") || lowerMessage.includes("how long")) {
      return "Project timelines vary by service: Cloud Security Review (2-4 weeks), HIPAA (3-5 weeks), SOC 2 (4-6 weeks), ISO 27001 (6-8 weeks), and NIST/CMMC (6-10 weeks). We can discuss your specific timeline during a consultation.";
    }
    if (lowerMessage.includes("contact") || lowerMessage.includes("call") || lowerMessage.includes("schedule")) {
      return "You can schedule a free 30-minute consultation by clicking the 'Schedule Consultation' button in the header, or visit our Contact page. We typically respond within 24 hours.";
    }
    
    return "Thank you for your message! A member of our team will review this and get back to you shortly. In the meantime, feel free to browse our services or schedule a consultation for immediate assistance.";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "auto" : "500px"
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 z-50 w-[350px] md:w-[380px]"
          >
            <Card className="overflow-hidden border-border shadow-lg flex flex-col h-full">
              <CardHeader className="bg-primary text-primary-foreground py-3 px-4 flex-shrink-0">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="flex items-center gap-2 text-base font-semibold">
                    <MessageCircle className="h-5 w-5" />
                    CipherCore Support
                  </CardTitle>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                      onClick={() => setIsMinimized(!isMinimized)}
                      data-testid="button-minimize-chat"
                    >
                      <Minimize2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                      onClick={() => setIsOpen(false)}
                      data-testid="button-close-chat"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {!isMinimized && (
                <CardContent className="p-0 flex flex-col flex-1 min-h-0" data-testid="chat-content">
                  {isLoadingHistory ? (
                    <div className="flex items-center justify-center p-8" data-testid="chat-loading">
                      <div className="text-sm text-muted-foreground">Loading chat history...</div>
                    </div>
                  ) : !hasStarted ? (
                    <div className="p-4 space-y-4" data-testid="chat-start-form">
                      <p className="text-sm text-muted-foreground">
                        Welcome! Please enter your information to start chatting with our team.
                      </p>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor="chat-name">Name *</Label>
                          <Input
                            id="chat-name"
                            placeholder="Your name"
                            value={visitorInfo.name}
                            onChange={(e) =>
                              setVisitorInfo((prev) => ({ ...prev, name: e.target.value }))
                            }
                            data-testid="input-chat-name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="chat-email">Email (optional)</Label>
                          <Input
                            id="chat-email"
                            type="email"
                            placeholder="your@email.com"
                            value={visitorInfo.email}
                            onChange={(e) =>
                              setVisitorInfo((prev) => ({ ...prev, email: e.target.value }))
                            }
                            data-testid="input-chat-email"
                          />
                        </div>
                        <Button
                          className="w-full"
                          onClick={handleStartChat}
                          disabled={!visitorInfo.name.trim()}
                          data-testid="button-start-chat"
                        >
                          Start Chat
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <ScrollArea className="flex-1 p-4" data-testid="chat-messages-area">
                        <div className="space-y-4" data-testid="chat-messages-list">
                          {messages.map((msg) => (
                            <div
                              key={msg.id}
                              className={`flex gap-2 ${
                                msg.isFromVisitor === "true" ? "justify-end" : "justify-start"
                              }`}
                            >
                              {msg.isFromVisitor !== "true" && (
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                  <Bot className="h-4 w-4 text-primary" />
                                </div>
                              )}
                              <div
                                className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                                  msg.isFromVisitor === "true"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted"
                                }`}
                                data-testid={`chat-message-${msg.id}`}
                              >
                                {msg.message}
                              </div>
                              {msg.isFromVisitor === "true" && (
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                                  <User className="h-4 w-4 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                          ))}
                          <div ref={messagesEndRef} />
                        </div>
                      </ScrollArea>

                      <div className="border-t p-3 flex-shrink-0">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Type a message..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isSending}
                            data-testid="input-chat-message"
                          />
                          <Button
                            size="icon"
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim() || isSending}
                            data-testid="button-send-chat"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="fixed bottom-4 right-4 z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
          data-testid="button-toggle-chat"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </Button>
      </motion.div>
    </>
  );
}

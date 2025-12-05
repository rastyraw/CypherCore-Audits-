import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const services = [
  { value: "soc2", label: "SOC 2 Readiness" },
  { value: "iso27001", label: "ISO 27001 Readiness" },
  { value: "hipaa", label: "HIPAA Compliance" },
  { value: "nist", label: "NIST CSF / CMMC" },
  { value: "cloud", label: "Cloud Security Review" },
  { value: "other", label: "Other / Not Sure" },
];

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

interface ConsultationSchedulerProps {
  trigger?: React.ReactNode;
}

export default function ConsultationScheduler({ trigger }: ConsultationSchedulerProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    preferredDate: "",
    preferredTime: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiRequest("POST", "/api/bookings", formData);
      setIsSubmitted(true);
      toast({
        title: "Consultation Booked",
        description: "We'll confirm your appointment within 24 hours.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to book consultation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      preferredDate: "",
      preferredTime: "",
      notes: "",
    });
    setIsSubmitted(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setTimeout(resetForm, 300);
    }
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split("T")[0];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="gap-2" data-testid="button-schedule-consultation">
            <Calendar className="h-4 w-4" />
            Schedule Consultation
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        {isSubmitted ? (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl">Consultation Booked!</DialogTitle>
              <DialogDescription className="mt-2">
                Thank you for scheduling a consultation with CipherCore. We'll review your request and send a confirmation email within 24 hours.
              </DialogDescription>
            </DialogHeader>
            <Button
              className="mt-6"
              onClick={() => handleOpenChange(false)}
              data-testid="button-close-scheduler"
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Schedule a Free Consultation
              </DialogTitle>
              <DialogDescription>
                Book a 30-minute discovery call with one of our security experts. We'll discuss your compliance needs and how we can help.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="scheduler-name">Full Name *</Label>
                  <Input
                    id="scheduler-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    data-testid="input-scheduler-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scheduler-email">Email *</Label>
                  <Input
                    id="scheduler-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    data-testid="input-scheduler-email"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="scheduler-phone">Phone</Label>
                  <Input
                    id="scheduler-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    data-testid="input-scheduler-phone"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scheduler-company">Company</Label>
                  <Input
                    id="scheduler-company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    data-testid="input-scheduler-company"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="scheduler-service">Service of Interest *</Label>
                <Select
                  value={formData.service}
                  onValueChange={(value) => handleSelectChange("service", value)}
                  required
                >
                  <SelectTrigger id="scheduler-service" data-testid="select-scheduler-service">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.value} value={service.value}>
                        {service.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="scheduler-date">Preferred Date *</Label>
                  <Input
                    id="scheduler-date"
                    name="preferredDate"
                    type="date"
                    min={minDateStr}
                    value={formData.preferredDate}
                    onChange={handleChange}
                    required
                    data-testid="input-scheduler-date"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scheduler-time">Preferred Time *</Label>
                  <Select
                    value={formData.preferredTime}
                    onValueChange={(value) => handleSelectChange("preferredTime", value)}
                    required
                  >
                    <SelectTrigger id="scheduler-time" data-testid="select-scheduler-time">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          <span className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            {time}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="scheduler-notes">Additional Notes</Label>
                <Textarea
                  id="scheduler-notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Tell us about your compliance goals or any specific questions..."
                  className="min-h-[80px]"
                  data-testid="textarea-scheduler-notes"
                />
              </div>

              <Button
                type="submit"
                className="w-full gap-2"
                disabled={isSubmitting || !formData.service || !formData.preferredDate || !formData.preferredTime}
                data-testid="button-submit-booking"
              >
                {isSubmitting ? (
                  "Booking..."
                ) : (
                  <>
                    <Calendar className="h-4 w-4" />
                    Book Consultation
                  </>
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

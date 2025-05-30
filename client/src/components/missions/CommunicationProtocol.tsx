import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Linkedin, Github, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  priority: boolean;
  newsletter: boolean;
}

export function CommunicationProtocol() {
  const { toast } = useToast();
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: false,
    newsletter: false,
  });

  const contactMutation = useMutation({
    mutationFn: (data: ContactForm) => apiRequest('POST', '/api/contact', data),
    onSuccess: () => {
      toast({
        title: "Message Transmitted Successfully",
        description: "Your secure message has been sent to Agent Saurabh. Expect a response within 24-48 hours.",
      });
      setForm({
        name: '',
        email: '',
        subject: '',
        message: '',
        priority: false,
        newsletter: false,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Transmission Failed",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.name || !form.email || !form.message) {
      toast({
        title: "Incomplete Transmission",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    contactMutation.mutate(form);
  };

  const updateForm = (field: keyof ContactForm, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const contactChannels = [
    {
      icon: <Mail className="text-2xl mb-3" />,
      title: 'Direct Channel',
      value: 'saurabh@tva.temporal',
    },
    {
      icon: <Linkedin className="text-2xl mb-3" />,
      title: 'Professional Network',
      value: 'linkedin.com/in/saurabhpandey',
    },
    {
      icon: <Github className="text-2xl mb-3" />,
      title: 'Code Repository',
      value: 'github.com/saurabhpandey',
    },
  ];

  return (
    <section className="mission-content p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-orbitron font-bold text-tva-orange mb-4">
            MISSION 004: COMMUNICATION PROTOCOL
          </h1>
          <p className="text-tva-text-muted">Establish Secure Channel • Direct Link to Agent</p>
        </div>

        <div className="holographic p-8 rounded-lg">
          <h3 className="text-tva-orange font-orbitron font-bold text-xl mb-6">
            SECURE MESSAGE CONSOLE
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-tva-orange font-semibold">Agent Name *</Label>
                <Input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateForm('name', e.target.value)}
                  className="mt-2 bg-tva-dark border-tva-orange/30 text-tva-text focus:border-tva-orange"
                  placeholder="Enter your designation"
                  required
                />
              </div>
              
              <div>
                <Label className="text-tva-orange font-semibold">Communication ID *</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateForm('email', e.target.value)}
                  className="mt-2 bg-tva-dark border-tva-orange/30 text-tva-text focus:border-tva-orange"
                  placeholder="agent@tva.temporal"
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-tva-orange font-semibold">Mission Type</Label>
              <Select value={form.subject} onValueChange={(value) => updateForm('subject', value)}>
                <SelectTrigger className="mt-2 bg-tva-dark border-tva-orange/30 text-tva-text focus:border-tva-orange">
                  <SelectValue placeholder="Select Mission Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="collaboration">Collaboration Request</SelectItem>
                  <SelectItem value="project">Project Proposal</SelectItem>
                  <SelectItem value="consultation">Technical Consultation</SelectItem>
                  <SelectItem value="opportunity">Employment Opportunity</SelectItem>
                  <SelectItem value="other">Other Timeline Matter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-tva-orange font-semibold">Encrypted Message *</Label>
              <Textarea
                rows={6}
                value={form.message}
                onChange={(e) => updateForm('message', e.target.value)}
                className="mt-2 bg-tva-dark border-tva-orange/30 text-tva-text focus:border-tva-orange"
                placeholder="Compose your secure message to Agent Saurabh..."
                required
              />
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={form.priority}
                  onCheckedChange={(checked) => updateForm('priority', !!checked)}
                  className="data-[state=checked]:bg-tva-orange data-[state=checked]:border-tva-orange"
                />
                <Label className="text-tva-text">High Priority Mission</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={form.newsletter}
                  onCheckedChange={(checked) => updateForm('newsletter', !!checked)}
                  className="data-[state=checked]:bg-tva-orange data-[state=checked]:border-tva-orange"
                />
                <Label className="text-tva-text">Subscribe to Timeline Updates</Label>
              </div>
            </div>

            <div className="text-center">
              <Button
                type="submit"
                disabled={contactMutation.isPending}
                className="bg-tva-orange hover:bg-tva-orange-light px-8 py-4 text-lg font-orbitron font-bold transition-all duration-300 transform hover:scale-105 glow-orange"
              >
                <Send className="mr-2" />
                {contactMutation.isPending ? 'TRANSMITTING...' : 'TRANSMIT MESSAGE'}
              </Button>
            </div>
          </form>

          {/* Contact Information */}
          <div className="mt-12 pt-8 border-t border-tva-orange/30">
            <h4 className="text-tva-orange font-orbitron font-bold text-lg mb-6">
              ALTERNATIVE COMMUNICATION CHANNELS
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactChannels.map((channel, index) => (
                <div key={index} className="text-center p-4 bg-tva-dark/50 rounded-lg">
                  <div className="text-tva-orange">{channel.icon}</div>
                  <h5 className="text-tva-text font-semibold mb-2">{channel.title}</h5>
                  <p className="text-tva-text-muted text-sm">{channel.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

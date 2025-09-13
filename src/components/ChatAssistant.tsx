import { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

const ChatAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi there! I'm your campus assistant. How can I help you today?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const responses: { [key: string]: string } = {
    'hello': 'Hello! How can I assist you with campus information today?',
    'hi': 'Hi there! What can I help you with?',
    'library hours': 'The main library is open Monday-Friday from 8:00 AM to 10:00 PM, and on weekends from 10:00 AM to 8:00 PM.',
    'career fair': 'The Career Fair 2025 is on October 22, 2025 from 9:00 AM to 3:00 PM at the Student Union Building.',
    'cafeteria': 'The cafeteria is open Monday-Friday from 7:30 AM to 8:00 PM, and on weekends from 9:00 AM to 7:00 PM.',
    'exam schedule': 'Final exams for the Fall semester are scheduled for December 11-15, 2025.',
    'recreation center': 'The Student Recreation Center is open Monday-Friday from 6:00 AM to 11:00 PM, and on weekends from 8:00 AM to 9:00 PM.',
    'thanks': "You're welcome! Is there anything else I can help with?",
    'thank you': "You're welcome! Let me know if you need more information.",
    'events': 'We have several upcoming events: Science Symposium on Oct 15, Career Fair on Oct 22, and Food Festival on Nov 5.',
    'menu': 'Today\'s cafeteria menu includes: Grilled chicken, vegetarian pasta, fresh salads, and daily soup specials. Check the cafeteria for detailed options!',
    'default': "I'm not sure I understand. Could you please rephrase your question? You can ask me about library hours, events, academic schedules, or facility timings."
  };

  const quickQuestions = [
    'Library hours?',
    'When is the career fair?',
    'Cafeteria menu',
    'Exam schedule'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const processInput = (input: string): string => {
    const lowerInput = input.toLowerCase().trim();
    
    for (const [key, value] of Object.entries(responses)) {
      if (lowerInput.includes(key)) {
        return value;
      }
    }
    
    return responses.default;
  };

  const sendMessage = (text: string = inputValue) => {
    if (text.trim() === '') return;

    const userMessage: Message = {
      id: Date.now(),
      text: text.trim(),
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: processInput(text),
        isUser: false
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <Card className="bg-campus-card backdrop-blur-sm shadow-campus-card flex flex-col h-full">
      <CardHeader className="text-center pb-4 border-b border-border">
        <CardTitle className="flex items-center justify-center space-x-2 text-primary">
          <Bot className="w-6 h-6" />
          <span>Campus Assistant</span>
        </CardTitle>
        <p className="text-muted-foreground">Ask me about campus services, events, or schedules</p>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-4">
        <div className="flex-1 bg-muted rounded-lg p-4 mb-4 overflow-y-auto max-h-80 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.isUser
                  ? 'bg-secondary text-secondary-foreground ml-auto rounded-br-md'
                  : 'bg-accent text-accent-foreground rounded-bl-md'
              }`}
            >
              {message.text}
            </div>
          ))}
          {isTyping && (
            <div className="bg-accent text-accent-foreground max-w-[80%] p-3 rounded-2xl rounded-bl-md">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your question here..."
            className="flex-1 rounded-full"
          />
          <Button
            onClick={() => sendMessage()}
            size="icon"
            className="rounded-full w-12 h-12 bg-primary hover:bg-secondary transition-smooth"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {quickQuestions.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => sendMessage(question)}
              className="text-left justify-start rounded-full text-xs transition-bounce hover:bg-primary hover:text-primary-foreground"
            >
              {question}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatAssistant;
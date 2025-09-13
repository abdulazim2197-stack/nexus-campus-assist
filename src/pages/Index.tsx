import Header from "@/components/Header";
import InfoModules from "@/components/InfoModules";
import ChatAssistant from "@/components/ChatAssistant";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-campus-gradient p-5">
      <div className="max-w-7xl mx-auto">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <InfoModules />
          </div>
          
          <div className="lg:col-span-2">
            <ChatAssistant />
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
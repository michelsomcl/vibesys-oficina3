
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Your App</h1>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Home</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Ready to Build
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Your clean, modern project foundation is ready. Start adding your content and features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="inline-flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>

        {/* Empty State Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="p-8 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Feature One</h3>
            <p className="text-gray-600">Add your first feature description here.</p>
          </Card>

          <Card className="p-8 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Feature Two</h3>
            <p className="text-gray-600">Add your second feature description here.</p>
          </Card>

          <Card className="p-8 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Feature Three</h3>
            <p className="text-gray-600">Add your third feature description here.</p>
          </Card>
        </div>

        {/* Call to Action Section */}
        <div className="text-center mt-24">
          <Card className="max-w-2xl mx-auto p-12 bg-gradient-to-r from-blue-50 to-indigo-50 border-0">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Start Building Today
            </h3>
            <p className="text-gray-600 mb-8">
              This is your empty canvas. Begin creating something amazing.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Begin Your Journey
            </Button>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-24">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Your App. Ready for your content.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

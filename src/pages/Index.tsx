import { useState } from "react";
import SymptomChecker from "@/components/SymptomChecker";
import AnalysisResults from "@/components/AnalysisResults";
import DoctorFinder from "@/components/DoctorFinder";
import MedicineSuggestions from "@/components/MedicineSuggestions";
import { Heart } from "lucide-react";

interface PatientData {
  name: string;
  age: string;
  gender: string;
  currentSymptoms: string;
  duration: string;
  severity: string;
  medicalHistory: string;
  medications: string;
  allergies: string;
}

type ViewType = 'symptom-checker' | 'analysis' | 'doctors' | 'medicines';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('symptom-checker');
  const [patientData, setPatientData] = useState<PatientData | null>(null);

  const handleAnalysis = (data: PatientData) => {
    setPatientData(data);
    setCurrentView('analysis');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'symptom-checker':
        return <SymptomChecker onAnalysis={handleAnalysis} />;
      case 'analysis':
        return patientData ? (
          <AnalysisResults 
            patientData={patientData}
            onFindDoctors={() => setCurrentView('doctors')}
            onMedicineSuggestions={() => setCurrentView('medicines')}
            onStartOver={() => {
              setCurrentView('symptom-checker');
              setPatientData(null);
            }}
          />
        ) : null;
      case 'doctors':
        return <DoctorFinder onBack={() => setCurrentView('analysis')} />;
      case 'medicines':
        return <MedicineSuggestions onBack={() => setCurrentView('analysis')} />;
      default:
        return <SymptomChecker onAnalysis={handleAnalysis} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-medical rounded-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">RuralHealth</h1>
              <p className="text-sm text-muted-foreground">Healthcare Made Accessible</p>
            </div>
          </div>
          {currentView !== 'symptom-checker' && (
            <button
              onClick={() => {
                setCurrentView('symptom-checker');
                setPatientData(null);
              }}
              className="text-sm text-medical-primary hover:underline"
            >
              New Assessment
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-4">
        {renderCurrentView()}
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2024 RuralHealth. Bridging healthcare gaps in rural communities.</p>
          <p className="mt-1">For emergencies, call 108 immediately.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

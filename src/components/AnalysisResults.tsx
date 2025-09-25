import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  CheckCircle, 
  MapPin, 
  Pill, 
  Stethoscope,
  Clock,
  Info
} from "lucide-react";

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

interface AnalysisResultsProps {
  patientData: PatientData;
  onFindDoctors: () => void;
  onMedicineSuggestions: () => void;
  onStartOver: () => void;
}

const AnalysisResults = ({ 
  patientData, 
  onFindDoctors, 
  onMedicineSuggestions, 
  onStartOver 
}: AnalysisResultsProps) => {
  
  // Mock analysis based on symptoms (in real app, this would be AI-powered)
  const analyzeSymptoms = () => {
    const symptoms = patientData.currentSymptoms.toLowerCase();
    const severity = patientData.severity;
    
    if (symptoms.includes('headache') || symptoms.includes('fever') || symptoms.includes('cold')) {
      return {
        condition: "Common Cold/Headache",
        severity: "Minor",
        color: "success",
        icon: CheckCircle,
        description: "Based on your symptoms, this appears to be a minor condition that may resolve with rest and basic care.",
        confidence: 85,
        recommendation: "minor"
      };
    } else if (symptoms.includes('chest') || symptoms.includes('heart') || severity === 'severe') {
      return {
        condition: "Requires Medical Attention",
        severity: "Serious",
        color: "warning",
        icon: AlertTriangle,
        description: "Your symptoms indicate a condition that should be evaluated by a healthcare professional.",
        confidence: 75,
        recommendation: "doctor"
      };
    } else {
      return {
        condition: "Mild Condition",
        severity: "Minor",
        color: "success", 
        icon: CheckCircle,
        description: "Your symptoms suggest a minor condition that may be manageable with home care.",
        confidence: 80,
        recommendation: "minor"
      };
    }
  };

  const analysis = analyzeSymptoms();
  const IconComponent = analysis.icon;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
          analysis.color === 'success' ? 'bg-gradient-success' : 'bg-medical-warning'
        }`}>
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold">Analysis Results</h1>
        <p className="text-muted-foreground">
          Based on the information provided for {patientData.name}
        </p>
      </div>

      {/* Main Analysis Card */}
      <Card className="shadow-card-soft border-l-4 border-l-medical-primary">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Preliminary Assessment</span>
            <Badge variant={analysis.color === 'success' ? 'secondary' : 'destructive'}>
              {analysis.severity}
            </Badge>
          </CardTitle>
          <CardDescription>
            AI-powered analysis of your symptoms and medical information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-medical-light rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{analysis.condition}</h3>
            <p className="text-muted-foreground mb-3">{analysis.description}</p>
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-medical-primary" />
              <span className="text-sm">Confidence Level: {analysis.confidence}%</span>
            </div>
          </div>

          {/* Symptom Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-card rounded-lg border">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-medical-primary" />
                <span className="font-medium text-sm">Duration</span>
              </div>
              <p className="text-sm text-muted-foreground">{patientData.duration || 'Not specified'}</p>
            </div>
            <div className="p-3 bg-card rounded-lg border">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-medical-warning" />
                <span className="font-medium text-sm">Severity</span>
              </div>
              <p className="text-sm text-muted-foreground">{patientData.severity || 'Not specified'}</p>
            </div>
            <div className="p-3 bg-card rounded-lg border">
              <div className="flex items-center gap-2 mb-1">
                <Stethoscope className="w-4 h-4 text-medical-success" />
                <span className="font-medium text-sm">Age</span>
              </div>
              <p className="text-sm text-muted-foreground">{patientData.age} years</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="shadow-card-soft">
        <CardHeader>
          <CardTitle>Recommended Next Steps</CardTitle>
          <CardDescription>
            Choose the most appropriate action based on your analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ALWAYS show Find Doctors option */}
            <Card className="p-4 border-medical-primary bg-medical-primary/5 hover:shadow-card-hover transition-shadow cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-medical-primary/20 rounded-lg">
                  <MapPin className="w-5 h-5 text-medical-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1 text-lg">🏥 Find Nearby Doctors</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Connect with qualified doctors in your area with contact details and directions
                  </p>
                  <Button 
                    onClick={onFindDoctors}
                    className="w-full bg-medical-primary hover:shadow-medical text-white font-semibold"
                    size="lg"
                  >
                    Find Doctors Near Me
                  </Button>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 border-medical-success bg-medical-success/5 hover:shadow-card-hover transition-shadow cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-medical-success/20 rounded-lg">
                  <Pill className="w-5 h-5 text-medical-success" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1 text-lg">💊 Medicine Suggestions</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Get recommendations for over-the-counter medicines and home remedies
                  </p>
                  <Button 
                    onClick={onMedicineSuggestions}
                    className="w-full bg-medical-success hover:shadow-medical text-white font-semibold"
                    size="lg"
                  >
                    View Medicine Options
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Important Notice */}
      <Card className="shadow-card-soft border-l-4 border-l-medical-warning">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-medical-warning mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Important Notice</h3>
              <p className="text-sm text-muted-foreground">
                This is a preliminary assessment and should not replace professional medical advice. 
                If your symptoms worsen or you have concerns, please consult with a healthcare provider immediately.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button variant="outline" onClick={onStartOver}>
          Start New Assessment
        </Button>
      </div>
    </div>
  );
};

export default AnalysisResults;
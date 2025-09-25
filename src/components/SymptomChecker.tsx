import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Stethoscope, User, Clock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

interface SymptomCheckerProps {
  onAnalysis: (data: PatientData) => void;
}

const SymptomChecker = ({ onAnalysis }: SymptomCheckerProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<PatientData>({
    name: '',
    age: '',
    gender: '',
    currentSymptoms: '',
    duration: '',
    severity: '',
    medicalHistory: '',
    medications: '',
    allergies: ''
  });

  const [urgentSymptoms, setUrgentSymptoms] = useState<string[]>([]);

  const urgentSymptomsList = [
    "Chest pain or pressure",
    "Difficulty breathing",
    "Severe headache",
    "High fever (above 102°F)",
    "Sudden weakness or numbness",
    "Severe abdominal pain",
    "Heavy bleeding",
    "Loss of consciousness"
  ];

  const handleInputChange = (field: keyof PatientData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleUrgentSymptomChange = (symptom: string, checked: boolean) => {
    setUrgentSymptoms(prev => 
      checked 
        ? [...prev, symptom]
        : prev.filter(s => s !== symptom)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.age || !formData.currentSymptoms) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Check for urgent symptoms
    if (urgentSymptoms.length > 0) {
      toast({
        title: "Urgent Symptoms Detected",
        description: "Please seek immediate medical attention",
        variant: "destructive"
      });
    }

    onAnalysis(formData);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-medical rounded-full mb-4">
          <Stethoscope className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold">Health Assessment</h1>
        <p className="text-muted-foreground">
          Please provide your details and symptoms for personalized health guidance
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <Card className="shadow-card-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-medical-primary" />
              Personal Information
            </CardTitle>
            <CardDescription>Basic details to help us understand your profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  placeholder="Enter your age"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => handleInputChange('gender', value)}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Current Symptoms */}
        <Card className="shadow-card-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-medical-warning" />
              Current Symptoms
            </CardTitle>
            <CardDescription>Describe what you're experiencing right now</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="symptoms">Describe your symptoms *</Label>
              <Textarea
                id="symptoms"
                value={formData.currentSymptoms}
                onChange={(e) => handleInputChange('currentSymptoms', e.target.value)}
                placeholder="Please describe your symptoms in detail..."
                rows={4}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>How long have you had these symptoms?</Label>
                <RadioGroup
                  value={formData.duration}
                  onValueChange={(value) => handleInputChange('duration', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hours" id="hours" />
                    <Label htmlFor="hours">Few hours</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1-2days" id="1-2days" />
                    <Label htmlFor="1-2days">1-2 days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="week" id="week" />
                    <Label htmlFor="week">About a week</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weeks" id="weeks" />
                    <Label htmlFor="weeks">Several weeks</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Rate your discomfort level</Label>
                <RadioGroup
                  value={formData.severity}
                  onValueChange={(value) => handleInputChange('severity', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mild" id="mild" />
                    <Label htmlFor="mild">Mild (1-3)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="moderate" />
                    <Label htmlFor="moderate">Moderate (4-6)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="severe" id="severe" />
                    <Label htmlFor="severe">Severe (7-10)</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Urgent Symptoms Check */}
            <div className="space-y-3 p-4 bg-medical-light rounded-lg border-l-4 border-medical-warning">
              <Label className="text-medical-warning font-semibold">
                Do you have any of these urgent symptoms?
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {urgentSymptomsList.map((symptom) => (
                  <div key={symptom} className="flex items-center space-x-2">
                    <Checkbox
                      id={symptom}
                      checked={urgentSymptoms.includes(symptom)}
                      onCheckedChange={(checked) => 
                        handleUrgentSymptomChange(symptom, checked as boolean)
                      }
                    />
                    <Label htmlFor={symptom} className="text-sm">{symptom}</Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical History */}
        <Card className="shadow-card-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-medical-success" />
              Medical History
            </CardTitle>
            <CardDescription>Help us understand your medical background</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="history">Previous medical conditions</Label>
              <Textarea
                id="history"
                value={formData.medicalHistory}
                onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                placeholder="Any chronic conditions, previous surgeries, or ongoing health issues..."
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="medications">Current medications</Label>
              <Input
                id="medications"
                value={formData.medications}
                onChange={(e) => handleInputChange('medications', e.target.value)}
                placeholder="List any medications you're currently taking"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="allergies">Known allergies</Label>
              <Input
                id="allergies"
                value={formData.allergies}
                onChange={(e) => handleInputChange('allergies', e.target.value)}
                placeholder="Any drug or food allergies"
              />
            </div>
          </CardContent>
        </Card>

        <Button 
          type="submit" 
          className="w-full bg-gradient-medical hover:shadow-medical text-white h-12 text-lg font-semibold"
        >
          Analyze My Symptoms
        </Button>
      </form>
    </div>
  );
};

export default SymptomChecker;
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Pill, 
  ShoppingCart, 
  AlertTriangle, 
  Clock, 
  Info,
  CheckCircle,
  Heart,
  Thermometer,
  Package
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Medicine {
  id: string;
  name: string;
  genericName: string;
  type: string;
  dosage: string;
  frequency: string;
  duration: string;
  price: string;
  description: string;
  sideEffects: string[];
  warnings: string[];
  category: string;
}

interface MedicineSuggestionsProps {
  onBack: () => void;
}

const MedicineSuggestions = ({ onBack }: MedicineSuggestionsProps) => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock medicine data (in real app, this would come from API based on symptoms)
  const medicines: Medicine[] = [
    {
      id: "1",
      name: "Paracetamol",
      genericName: "Acetaminophen",
      type: "Tablet",
      dosage: "500mg",
      frequency: "Every 6-8 hours",
      duration: "3-5 days",
      price: "₹25",
      description: "Effective for fever, headache, and mild pain relief",
      sideEffects: ["Nausea (rare)", "Skin rash (rare)"],
      warnings: ["Do not exceed 4g in 24 hours", "Avoid alcohol"],
      category: "Pain Relief"
    },
    {
      id: "2",
      name: "Ibuprofen",
      genericName: "Ibuprofen",
      type: "Tablet",
      dosage: "200mg",
      frequency: "Every 8 hours",
      duration: "3-5 days",
      price: "₹35",
      description: "Anti-inflammatory drug for pain, fever, and inflammation",
      sideEffects: ["Stomach upset", "Drowsiness"],
      warnings: ["Take with food", "Not for stomach ulcer patients"],
      category: "Pain Relief"
    },
    {
      id: "3",
      name: "Cetirizine",
      genericName: "Cetirizine HCl",
      type: "Tablet",
      dosage: "10mg",
      frequency: "Once daily",
      duration: "5-7 days",
      price: "₹45",
      description: "Antihistamine for allergies, cold symptoms, and runny nose",
      sideEffects: ["Drowsiness", "Dry mouth"],
      warnings: ["May cause sleepiness", "Avoid driving"],
      category: "Allergy Relief"
    },
    {
      id: "4",
      name: "ORS Solution",
      genericName: "Oral Rehydration Salt",
      type: "Powder",
      dosage: "1 sachet in 200ml water",
      frequency: "As needed",
      duration: "Until symptoms improve",
      price: "₹15",
      description: "Rehydration solution for dehydration, fever, and weakness",
      sideEffects: ["None reported"],
      warnings: ["Prepare fresh solution", "Complete within 24 hours"],
      category: "Hydration"
    }
  ];

  const homeRemedies = [
    {
      name: "Ginger Tea",
      description: "Natural remedy for nausea, cold, and digestive issues",
      preparation: "Boil fresh ginger in water for 10-15 minutes",
      benefits: ["Reduces nausea", "Soothes sore throat", "Aids digestion"]
    },
    {
      name: "Honey & Lemon",
      description: "Traditional remedy for cough and sore throat",
      preparation: "Mix 1 tsp honey with warm water and lemon juice",
      benefits: ["Soothes throat", "Natural antibacterial", "Boosts immunity"]
    },
    {
      name: "Steam Inhalation",
      description: "Helps with congestion and respiratory issues",
      preparation: "Inhale steam from hot water for 5-10 minutes",
      benefits: ["Clears nasal congestion", "Soothes airways", "Natural decongestant"]
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Pain Relief': return Heart;
      case 'Allergy Relief': return Thermometer;
      case 'Hydration': return Package;
      default: return Pill;
    }
  };

  const handleOrderMedicine = (medicine: Medicine) => {
    toast({
      title: "Order Placed",
      description: `${medicine.name} has been added to your cart. You'll be redirected to complete the order.`,
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-success rounded-full mb-4">
          <Pill className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold">Medicine Suggestions</h1>
        <p className="text-muted-foreground">
          Recommended over-the-counter medicines and home remedies for your symptoms
        </p>
      </div>

      {/* Important Warning */}
      <Card className="shadow-card-soft border-l-4 border-l-medical-warning">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-medical-warning mt-1" />
            <div>
              <h3 className="font-semibold mb-1 text-medical-warning">Important Medical Advice</h3>
              <p className="text-sm text-muted-foreground">
                These are general suggestions based on common symptoms. Always consult a pharmacist or doctor before taking any medication, 
                especially if you have allergies, existing conditions, or are taking other medications.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Over-the-Counter Medicines */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recommended Medicines</h2>
        <div className="grid gap-4">
          {medicines.map((medicine) => {
            const CategoryIcon = getCategoryIcon(medicine.category);
            
            return (
              <Card key={medicine.id} className="shadow-card-soft hover:shadow-card-hover transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Medicine Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-success rounded-full flex-shrink-0">
                          <CategoryIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                            <div>
                              <h3 className="text-xl font-semibold">{medicine.name}</h3>
                              <p className="text-muted-foreground text-sm">{medicine.genericName}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">{medicine.category}</Badge>
                              <span className="font-semibold text-medical-success">{medicine.price}</span>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground mb-3">{medicine.description}</p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm mb-4">
                            <div className="flex items-center gap-2">
                              <Pill className="w-4 h-4 text-medical-primary" />
                              <span>{medicine.dosage} {medicine.type}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-medical-success" />
                              <span>{medicine.frequency}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-medical-warning" />
                              <span>{medicine.duration}</span>
                            </div>
                          </div>

                          {/* Warnings and Side Effects */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                            <div className="p-3 bg-medical-light rounded-lg">
                              <h4 className="font-medium mb-1 text-medical-warning">Warnings:</h4>
                              <ul className="space-y-1">
                                {medicine.warnings.map((warning, index) => (
                                  <li key={index} className="flex items-start gap-1">
                                    <span className="text-medical-warning">•</span>
                                    <span>{warning}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="p-3 bg-card rounded-lg border">
                              <h4 className="font-medium mb-1">Side Effects:</h4>
                              <ul className="space-y-1">
                                {medicine.sideEffects.map((effect, index) => (
                                  <li key={index} className="flex items-start gap-1">
                                    <span className="text-muted-foreground">•</span>
                                    <span>{effect}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 lg:w-48">
                      <Button 
                        onClick={() => handleOrderMedicine(medicine)}
                        className="bg-gradient-success hover:shadow-medical text-white"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Order Now
                      </Button>
                      <Button variant="outline" className="border-medical-success text-medical-success">
                        <Info className="w-4 h-4 mr-2" />
                        More Info
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Home Remedies */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Natural Home Remedies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {homeRemedies.map((remedy, index) => (
            <Card key={index} className="shadow-card-soft hover:shadow-card-hover transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="p-2 bg-gradient-success rounded-lg">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  {remedy.name}
                </CardTitle>
                <CardDescription>{remedy.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium mb-1">How to prepare:</h4>
                  <p className="text-sm text-muted-foreground">{remedy.preparation}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Benefits:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {remedy.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <CheckCircle className="w-3 h-3 text-medical-success mt-1 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Pharmacy Notice */}
      <Card className="shadow-card-soft border-l-4 border-l-medical-primary">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Package className="w-5 h-5 text-medical-primary mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Medicine Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Medicines can be ordered online and delivered to your location. 
                Always verify the pharmacy is licensed and the medicines are genuine. 
                Keep prescriptions and medical records handy when ordering.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button variant="outline" onClick={onBack}>
          Back to Analysis
        </Button>
      </div>
    </div>
  );
};

export default MedicineSuggestions;
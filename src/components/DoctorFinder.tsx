import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Phone, 
  Star, 
  Clock, 
  Navigation,
  Search,
  Stethoscope,
  Heart,
  Brain,
  Eye,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: number;
  distance: string;
  address: string;
  phone: string;
  availability: string;
  consultationFee: string;
  hospital: string;
  specialties: string[];
}

interface DoctorFinderProps {
  onBack: () => void;
}

const DoctorFinder = ({ onBack }: DoctorFinderProps) => {
  const { toast } = useToast();
  const [location, setLocation] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  // Mock doctor data (in real app, this would come from API)
  const doctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Rajesh Kumar",
      specialty: "General Medicine",
      rating: 4.8,
      experience: 15,
      distance: "2.5 km",
      address: "City Hospital, Main Road, District Center",
      phone: "+91-98765-43210",
      availability: "Available Today",
      consultationFee: "₹500",
      hospital: "City Hospital",
      specialties: ["General Medicine", "Internal Medicine"]
    },
    {
      id: "2", 
      name: "Dr. Priya Sharma",
      specialty: "Family Medicine",
      rating: 4.9,
      experience: 12,
      distance: "3.2 km",
      address: "Rural Health Center, Village Road",
      phone: "+91-98765-43211",
      availability: "Available Tomorrow",
      consultationFee: "₹400",
      hospital: "Rural Health Center",
      specialties: ["Family Medicine", "Pediatrics"]
    },
    {
      id: "3",
      name: "Dr. Amit Patel",
      specialty: "Cardiology",
      rating: 4.7,
      experience: 20,
      distance: "5.8 km",
      address: "District Hospital, Medical Complex",
      phone: "+91-98765-43212",
      availability: "Available in 2 days",
      consultationFee: "₹800",
      hospital: "District Hospital",
      specialties: ["Cardiology", "Heart Surgery"]
    },
    {
      id: "4",
      name: "Dr. Sunita Reddy",
      specialty: "Neurology",
      rating: 4.6,
      experience: 18,
      distance: "8.1 km",
      address: "Specialty Clinic, Medical Plaza",
      phone: "+91-98765-43213",
      availability: "Available Today",
      consultationFee: "₹700",
      hospital: "Specialty Clinic",
      specialties: ["Neurology", "Headache Treatment"]
    }
  ];

  const getSpecialtyIcon = (specialty: string) => {
    if (specialty.includes('Cardiology') || specialty.includes('Heart')) return Heart;
    if (specialty.includes('Neurology') || specialty.includes('Brain')) return Brain;
    if (specialty.includes('Eye') || specialty.includes('Ophthalmology')) return Eye;
    return Stethoscope;
  };

  const openMaps = (address: string, doctorName: string) => {
    console.log('Opening directions for:', address);
    const encodedAddress = encodeURIComponent(address);
    const encodedDoctorName = encodeURIComponent(doctorName);
    
    // Try multiple map services
    const mapServices = [
      {
        name: 'Google Maps',
        url: `https://www.google.com/maps/search/${encodedDoctorName}+${encodedAddress}`
      },
      {
        name: 'Apple Maps', 
        url: `https://maps.apple.com/maps?q=${encodedDoctorName}+${encodedAddress}`
      },
      {
        name: 'OpenStreetMap',
        url: `https://www.openstreetmap.org/search?query=${encodedAddress}`
      }
    ];
    
    // Try to open Google Maps first
    try {
      const newWindow = window.open(mapServices[0].url, '_blank', 'noopener,noreferrer');
      if (newWindow) {
        console.log('Successfully opened Google Maps');
        toast({
          title: "Directions Opened",
          description: `Opening ${mapServices[0].name} for ${doctorName}`,
        });
      } else {
        // If blocked, show fallback options
        console.log('Pop-up blocked, showing alternatives');
        showMapOptions(mapServices, doctorName);
      }
    } catch (error) {
      console.error('Error opening maps:', error);
      showMapOptions(mapServices, doctorName);
    }
  };

  const showMapOptions = (mapServices: any[], doctorName: string) => {
    toast({
      title: "Choose Map Service",
      description: "Pop-up blocked. Please allow pop-ups or copy the address to open in your preferred map app.",
      action: (
        <div className="flex flex-col gap-1">
          {mapServices.map((service, index) => (
            <a
              key={index}
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs underline hover:no-underline"
            >
              Open in {service.name}
            </a>
          ))}
        </div>
      ),
    });
  };

  const callDoctor = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-medical rounded-full mb-4">
          <MapPin className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold">🏥 Nearby Doctors Found!</h1>
        <p className="text-muted-foreground">
          Here are qualified healthcare professionals in your area with contact details
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-medical-success/10 rounded-full">
          <div className="w-2 h-2 bg-medical-success rounded-full animate-pulse"></div>
          <span className="text-medical-success font-medium">4 doctors available nearby</span>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-medical-primary" />
            Search Doctors
          </CardTitle>
          <CardDescription>
            Enter your location to find doctors near you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Enter your city, district, or area"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-11"
              />
            </div>
            <Button className="bg-gradient-medical hover:shadow-medical text-white">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Doctor List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Available Doctors</h2>
        <div className="grid gap-4">
          {doctors.map((doctor) => {
            const SpecialtyIcon = getSpecialtyIcon(doctor.specialty);
            
            return (
              <Card key={doctor.id} className="shadow-card-soft hover:shadow-card-hover transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Doctor Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-medical rounded-full flex-shrink-0">
                          <SpecialtyIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                            <h3 className="text-xl font-semibold">{doctor.name}</h3>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{doctor.rating}</span>
                              <span className="text-muted-foreground text-sm">({doctor.experience} years exp.)</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {doctor.specialties.map((specialty) => (
                              <Badge key={specialty} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-medical-primary" />
                              <span>{doctor.distance} away</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-medical-success" />
                              <span className="text-medical-success">{doctor.availability}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-medical-warning" />
                              <span>{doctor.consultationFee}</span>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground text-sm mt-2">
                            {doctor.hospital} • {doctor.address}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 lg:w-48">
                      <Button 
                        onClick={() => callDoctor(doctor.phone)}
                        className="bg-gradient-medical hover:shadow-medical text-white"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => openMaps(doctor.address, doctor.name)}
                        className="border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white"
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        Get Directions
                      </Button>
                      
                      {/* Fallback: Copy address button */}
                      <Button 
                        variant="outline"
                        onClick={() => {
                          navigator.clipboard.writeText(doctor.address).then(() => {
                            toast({
                              title: "Address Copied!",
                              description: "Address copied to clipboard. Paste it in your map app.",
                            });
                          }).catch(() => {
                            toast({
                              title: "Address",
                              description: doctor.address,
                            });
                          });
                        }}
                        className="border-medical-success text-medical-success hover:bg-medical-success hover:text-white text-xs"
                      >
                        📋 Copy Address
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Emergency Notice */}
      <Card className="shadow-card-soft border-l-4 border-l-destructive">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-destructive mt-1" />
            <div>
              <h3 className="font-semibold mb-1 text-destructive">Emergency Services</h3>
              <p className="text-sm text-muted-foreground mb-2">
                For life-threatening emergencies, call immediately:
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="font-medium">Ambulance: 108</span>
                <span className="font-medium">Police: 100</span>
                <span className="font-medium">Fire: 101</span>
              </div>
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

export default DoctorFinder;
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  MapPin,
  Globe,
  Phone,
  Mail,
  CheckCircle,
  Edit,
  Save,
  X,
  Upload,
  Shield,
  Award,
  Users,
} from "lucide-react";

interface ClientProfile {
  id: number;
  userId: number;
  company?: string;
  phone?: string;
  industry?: string;
  companySize?: string;
  website?: string;
  description?: string;
  registrationNumber?: string;
  gstNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
    email: string;
    emailVerified: boolean;
  };
}

interface ClientProfileProps {
  profile: ClientProfile | null;
  onUpdate: (data: Partial<ClientProfile>) => void;
  loading?: boolean;
}

export function ClientProfile({ profile, onUpdate, loading = false }: ClientProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<ClientProfile>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onUpdate(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(profile || {});
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof ClientProfile, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Company Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Company Information
              </CardTitle>
              <CardDescription>
                Manage your company profile and verification status
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {profile?.isVerified && (
                <Badge variant="default" className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="company">Company Name</Label>
              {isEditing ? (
                <Input
                  id="company"
                  value={formData.company || ""}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="Enter company name"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900">
                  {profile?.company || "Not provided"}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="industry">Industry</Label>
              {isEditing ? (
                <Input
                  id="industry"
                  value={formData.industry || ""}
                  onChange={(e) => handleInputChange("industry", e.target.value)}
                  placeholder="e.g., Technology, Healthcare, Manufacturing"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900">
                  {profile?.industry || "Not provided"}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="companySize">Company Size</Label>
              {isEditing ? (
                <select
                  id="companySize"
                  value={formData.companySize || ""}
                  onChange={(e) => handleInputChange("companySize", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select company size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              ) : (
                <p className="mt-1 text-sm text-gray-900">
                  {profile?.companySize || "Not provided"}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              {isEditing ? (
                <Input
                  id="website"
                  value={formData.website || ""}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="https://yourcompany.com"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900">
                  {profile?.website ? (
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <Globe className="h-3 w-3" />
                      {profile.website}
                    </a>
                  ) : (
                    "Not provided"
                  )}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="description">Company Description</Label>
            {isEditing ? (
              <Textarea
                id="description"
                value={formData.description || ""}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe your company and what you do..."
                rows={4}
              />
            ) : (
              <p className="mt-1 text-sm text-gray-900">
                {profile?.description || "Not provided"}
              </p>
            )}
          </div>

          {isEditing && (
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Contact Information
          </CardTitle>
          <CardDescription>
            Your contact details and location
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              {isEditing ? (
                <Input
                  id="phone"
                  value={formData.phone || ""}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+91 9876543210"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900 flex items-center gap-2">
                  <Phone className="h-3 w-3" />
                  {profile?.phone || "Not provided"}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <p className="mt-1 text-sm text-gray-900 flex items-center gap-2">
                <Mail className="h-3 w-3" />
                {profile?.user.email}
                {profile?.user.emailVerified && (
                  <CheckCircle className="h-3 w-3 text-green-600" />
                )}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="city">City</Label>
              {isEditing ? (
                <Input
                  id="city"
                  value={formData.city || ""}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="Enter city"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900">
                  {profile?.city || "Not provided"}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="state">State</Label>
              {isEditing ? (
                <Input
                  id="state"
                  value={formData.state || ""}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  placeholder="Enter state"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900">
                  {profile?.state || "Not provided"}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="country">Country</Label>
              {isEditing ? (
                <Input
                  id="country"
                  value={formData.country || ""}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  placeholder="Enter country"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900">
                  {profile?.country || "Not provided"}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            {isEditing ? (
              <Textarea
                id="address"
                value={formData.address || ""}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter full address"
                rows={3}
              />
            ) : (
              <p className="mt-1 text-sm text-gray-900 flex items-start gap-2">
                <MapPin className="h-3 w-3 mt-0.5" />
                {profile?.address || "Not provided"}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Business Registration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Business Registration
          </CardTitle>
          <CardDescription>
            Legal and tax information for verification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="registrationNumber">Registration Number</Label>
              {isEditing ? (
                <Input
                  id="registrationNumber"
                  value={formData.registrationNumber || ""}
                  onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
                  placeholder="Company registration number"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900">
                  {profile?.registrationNumber || "Not provided"}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="gstNumber">GST Number</Label>
              {isEditing ? (
                <Input
                  id="gstNumber"
                  value={formData.gstNumber || ""}
                  onChange={(e) => handleInputChange("gstNumber", e.target.value)}
                  placeholder="GST registration number"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900">
                  {profile?.gstNumber || "Not provided"}
                </p>
              )}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Verification Status</h4>
                <p className="text-sm text-blue-700 mt-1">
                  {profile?.isVerified
                    ? "Your company has been verified and is trusted by freelancers."
                    : "Complete your business registration details to get verified and build trust with freelancers."}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Company Statistics
          </CardTitle>
          <CardDescription>
            Your activity and performance on the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-gray-600">Projects Posted</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">8</div>
              <div className="text-sm text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">4.9</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}



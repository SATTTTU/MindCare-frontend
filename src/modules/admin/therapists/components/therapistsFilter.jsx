import React from "react";
import Input from "@/components/ui/Input/input";
import Select from "@/components/ui/Select/select";

const TherapistFilter = ({ 
  search, 
  setSearch, 
  statusFilter, 
  setStatusFilter, 
  specializationFilter, 
  setSpecializationFilter 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Input
        placeholder="Search therapists by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Select
        options={[
          { label: "All Status", value: "all" },
          { label: "Pending", value: "pending" },
          { label: "Approved", value: "approved" },
          { label: "Rejected", value: "rejected" },
          { label: "Unknown/Empty", value: "unknown" }
        ]}
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      />
      <Select
        options={[
          { label: "All Specializations", value: "all" },
          { label: "Clinical Psychology", value: "clinical psychology" },
          { label: "Counseling Psychology", value: "counseling psychology" },
          { label: "Cognitive Behavioral Therapy", value: "cognitive behavioral therapy" },
          { label: "Family Therapy", value: "family therapy" },
          { label: "Marriage Counseling", value: "marriage counseling" },
          { label: "Child Psychology", value: "child psychology" },
          { label: "Addiction Counseling", value: "addiction counseling" },
        ]}
        value={specializationFilter}
        onChange={(e) => setSpecializationFilter(e.target.value)}
      />
    </div>
  );
};

export default TherapistFilter;
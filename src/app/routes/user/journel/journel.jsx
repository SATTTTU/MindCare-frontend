import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { JournalComponent } from "@/modules/user/journel/components/inputJournel";

export const JournelRoute = () => {
    const navigate = useNavigate();

    return (
        <div className="p-4">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-slate-600 hover:text-slate-800 mb-4"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
            </button>

            <JournalComponent />
        </div>
    );
};

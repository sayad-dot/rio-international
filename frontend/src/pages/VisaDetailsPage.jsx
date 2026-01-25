import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { visaApi } from '../services/api/visaApi';
import { useState } from 'react';
import {
    Clock, Calendar, Plane, CheckCircle, FileText,
    HelpCircle, ChevronDown, ChevronUp, AlertCircle,
    Shield, Check, ArrowRight, Loader2
} from 'lucide-react';

const VisaDetailsPage = () => {
    const { slug } = useParams();
    const [activeTab, setActiveTab] = useState('overview');

    const { data, isLoading, error } = useQuery({
        queryKey: ['visaPackage', slug],
        queryFn: () => visaApi.getPackageBySlug(slug)
    });

    const visa = data?.data?.visaPackage;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="h-10 w-10 text-primary-600 animate-spin" />
            </div>
        );
    }

    if (error || !visa) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Visa Package Not Found</h2>
                <p className="text-gray-600">The visa package you are looking for does not exist.</p>
            </div>
        );
    }

    const tabs = [
        { id: 'overview', label: 'Overview', icon: FileText },
        { id: 'documents', label: 'Documents', icon: CheckCircle },
        { id: 'process', label: 'Process', icon: Clock },
        { id: 'faq', label: 'FAQ', icon: HelpCircle },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Header */}
            <div className="relative h-[400px]">
                <img
                    src={visa.imageUrl}
                    alt={visa.country}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200';
                        e.target.onerror = null; // Prevent infinite loop
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="container mx-auto">
                        <span className="inline-block px-4 py-1.5 bg-primary-600 text-white text-sm font-semibold rounded-full mb-4">
                            {visa.type}
                        </span>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 font-display">
                                    {visa.country}
                                </h1>
                                <p className="text-gray-300 text-lg max-w-2xl">
                                    {visa.description}
                                </p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl min-w-[250px]">
                                <p className="text-gray-300 text-sm mb-1">Starting from</p>
                                <div className="text-4xl font-bold text-white mb-2">
                                    ৳{visa.cost.toLocaleString()}
                                </div>
                                <button className="w-full py-3 bg-white text-primary-600 font-bold rounded-xl hover:bg-gray-50 transition-all">
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-10">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Processing', value: visa.processingTime, icon: Clock },
                        { label: 'Duration', value: visa.duration, icon: Calendar },
                        { label: 'Validity', value: visa.validity, icon: Shield },
                        { label: 'Entry', value: visa.entryType, icon: Plane },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                                <stat.icon className="h-5 w-5 text-primary-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-medium">{stat.label}</p>
                                <p className="font-semibold text-gray-900">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Content */}
                    <div className="lg:col-span-2">
                        {/* Tabs */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                            <div className="flex border-b border-gray-100 overflow-x-auto">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-6 py-4 font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                                                ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50/50'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                            }`}
                                    >
                                        <tab.icon className="h-4 w-4" />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            <div className="p-8">
                                {activeTab === 'overview' && (
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-bold text-gray-900">Visa Overview</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Travel to {visa.country} with our comprehensive visa assistance.
                                            We handle the complexities of the application process, ensuring a higher success rate for your {visa.type}.
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {visa.requirements.map((req, idx) => (
                                                <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                                                    <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                                    <span className="text-gray-700">{req}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'documents' && (
                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm">1</span>
                                                Mandatory Documents
                                            </h3>
                                            <ul className="space-y-3 pl-10">
                                                {visa.documents.mandatory.map((doc, idx) => (
                                                    <li key={idx} className="flex items-start gap-3 text-gray-700">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                                                        {doc}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {visa.documents.optional && (
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                    <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">2</span>
                                                    Optional / Supporting
                                                </h3>
                                                <ul className="space-y-3 pl-10">
                                                    {visa.documents.optional.map((doc, idx) => (
                                                        <li key={idx} className="flex items-start gap-3 text-gray-700">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                                                            {doc}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeTab === 'process' && (
                                    <div className="space-y-8">
                                        <h3 className="text-xl font-bold text-gray-900 mb-6">Application Process</h3>
                                        <div className="relative">
                                            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
                                            {visa.applicationProcess.map((step, idx) => (
                                                <div key={idx} className="relative pl-12 pb-8 last:pb-0">
                                                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-white">
                                                        {idx + 1}
                                                    </div>
                                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                        <h4 className="font-semibold text-gray-900 mb-1">Step {idx + 1}</h4>
                                                        <p className="text-gray-600">{step}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'faq' && (
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                                        {visa.faqs.map((faq, idx) => (
                                            <div key={idx} className="bg-gray-50 rounded-xl p-6">
                                                <h4 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                                                    <HelpCircle className="h-5 w-5 text-primary-500 mt-0.5" />
                                                    {faq.question}
                                                </h4>
                                                <p className="text-gray-600 pl-7">{faq.answer}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                            <h3 className="font-bold text-lg text-gray-900 mb-4">Need Assistance?</h3>
                            <p className="text-sm text-gray-600 mb-6">
                                Our team is available 24/7 to help you with your visa application queries.
                            </p>
                            <button className="w-full py-3 bg-white border-2 border-primary-600 text-primary-600 font-bold rounded-xl hover:bg-primary-50 transition-all mb-3">
                                Call +880 1XXX-XXXXXX
                            </button>
                            <button className="w-full py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 hover:shadow-lg transition-all">
                                Contact on WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisaDetailsPage;

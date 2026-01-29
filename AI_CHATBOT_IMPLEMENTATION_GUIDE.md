# AI Chatbot Implementation Guide for RIO International Travel Agency

## 🎯 Overview
This guide provides a complete A-Z implementation of a custom AI chatbot that:
- Understands your tours, visa packages, career opportunities, and services
- Responds in both **Bangla** and **English**
- Uses **FREE** AI services (at least initially)
- Has a beautiful, responsive, and dynamic UI
- Provides accurate information based on your actual data

---

## 📋 Table of Contents
1. [Technology Stack (Free Tier)](#technology-stack)
2. [Data Preparation](#data-preparation)
3. [Backend Implementation](#backend-implementation)
4. [Frontend Implementation](#frontend-implementation)
5. [AI Model Integration](#ai-model-integration)
6. [Bilingual Support](#bilingual-support)
7. [Testing & Optimization](#testing-optimization)
8. [Deployment](#deployment)

---

## 🛠 Technology Stack (Free Tier)

### Free AI API Options (Choose One):
1. **Google Gemini API** (RECOMMENDED) ⭐
   - Free tier: 60 requests/minute
   - Best for multilingual (excellent Bangla support)
   - Context length: 32k tokens
   - 100% FREE for now
   
2. **Groq API** (Fast & Free)
   - Free tier: Fast inference
   - Good for English, decent Bangla
   - Very fast responses
   
3. **OpenAI API**
   - $5 free credit for new accounts
   - Best quality but costs after free credits

### Other Technologies:
- **Vector Database**: Chroma (free, local)
- **Embeddings**: Google Gemini Embeddings (free) or sentence-transformers
- **Backend**: Node.js + Express (already in your stack)
- **Frontend**: React + Tailwind CSS (already in your stack)

---

## 📊 Data Preparation

### Step 1: Extract Your Company Data

Create a new file to consolidate all your data:

```bash
mkdir -p backend/src/chatbot/data
touch backend/src/chatbot/data/company-knowledge.json
```

Create the knowledge base with this structure:

```json
{
  "company_info": {
    "name": "RIO International",
    "type": "Travel Agency",
    "services": ["Tours", "Visa Processing", "Career Opportunities"],
    "languages": ["English", "Bangla"],
    "description": "Leading travel agency providing comprehensive travel solutions"
  },
  "tours": [
    {
      "id": "tour-1",
      "name": "Dubai Adventure",
      "destination": "Dubai, UAE",
      "duration": "7 days 6 nights",
      "price": "85000 BDT",
      "highlights": ["Burj Khalifa", "Desert Safari", "Dubai Mall"],
      "description": "Experience the luxury of Dubai...",
      "bangla_name": "দুবাই অ্যাডভেঞ্চার",
      "bangla_description": "দুবাইয়ের বিলাসবহুলতা অনুভব করুন..."
    }
  ],
  "visa_packages": [
    {
      "country": "USA",
      "type": "Tourist Visa",
      "processing_time": "15-20 days",
      "price": "Starting from 25000 BDT",
      "requirements": ["Valid passport", "Bank statement", "Photo"],
      "bangla_country": "যুক্তরাষ্ট্র",
      "bangla_description": "পর্যটন ভিসা প্রক্রিয়াকরণ..."
    }
  ],
  "jobs": [
    {
      "title": "Frontend Developer",
      "location": "Dhaka, Bangladesh",
      "salary": "40000-60000 BDT",
      "requirements": ["React.js", "Tailwind CSS", "2+ years experience"],
      "bangla_title": "ফ্রন্টএন্ড ডেভেলপার"
    }
  ],
  "faqs": [
    {
      "question": "What payment methods do you accept?",
      "answer": "We accept bank transfers, bKash, Nagad, and credit/debit cards.",
      "bangla_question": "আপনারা কী ধরনের পেমেন্ট গ্রহণ করেন?",
      "bangla_answer": "আমরা ব্যাংক ট্রান্সফার, বিকাশ, নগদ এবং ক্রেডিট/ডেবিট কার্ড গ্রহণ করি।"
    },
    {
      "question": "How long does visa processing take?",
      "answer": "Visa processing typically takes 15-30 days depending on the country.",
      "bangla_question": "ভিসা প্রসেসিং এ কতদিন সময় লাগে?",
      "bangla_answer": "দেশ ভেদে ভিসা প্রসেসিং এ সাধারণত ১৫-৩০ দিন সময় লাগে।"
    }
  ],
  "contact": {
    "phone": "+880-XXX-XXXXXX",
    "email": "info@riointernational.com",
    "address": "Dhaka, Bangladesh",
    "hours": "9 AM - 6 PM (Sunday - Thursday)"
  }
}
```

### Step 2: Auto-Generate Knowledge Base from Database

Create a script to export your actual data:

**File: `backend/src/chatbot/data/generate-knowledge-base.js`**

```javascript
const { PrismaClient } = require('@prisma/client');
const fs = require('fs').promises;
const path = require('path');

const prisma = new PrismaClient();

async function generateKnowledgeBase() {
  console.log('🤖 Generating AI Chatbot Knowledge Base...');

  const knowledge = {
    company_info: {
      name: "RIO International",
      type: "Travel Agency",
      services: ["International Tours", "Visa Processing", "Career Opportunities", "Travel Consulting"],
      languages: ["English", "Bangla"],
      description: "Leading travel agency providing comprehensive travel solutions including tours, visa processing, and career opportunities worldwide.",
      bangla_description: "আন্তর্জাতিক ট্যুর, ভিসা প্রসেসিং এবং ক্যারিয়ার সুযোগ সহ সম্পূর্ণ ভ্রমণ সমাধান প্রদানকারী শীর্ষস্থানীয় ট্রাভেল এজেন্সি।"
    },
    tours: [],
    visa_packages: [],
    jobs: [],
    faqs: [],
    contact: {
      email: "info@riointernational.com",
      hours: "9 AM - 6 PM (Sunday - Thursday)",
      response_time: "We typically respond within 24 hours"
    }
  };

  // Fetch Tours
  const tours = await prisma.tour.findMany({
    include: {
      destinations: true,
      includes: true,
      itinerary: true
    }
  });

  knowledge.tours = tours.map(tour => ({
    id: tour.id,
    name: tour.name,
    destination: tour.destination,
    duration: tour.duration,
    price: tour.price,
    group_size: tour.groupSize,
    highlights: tour.highlights || [],
    description: tour.description,
    includes: tour.includes?.map(i => i.item) || [],
    itinerary: tour.itinerary?.map(day => ({
      day: day.day,
      title: day.title,
      description: day.description
    })) || [],
    category: tour.category,
    available: tour.available
  }));

  // Fetch Visa Packages
  const visaPackages = await prisma.visaPackage.findMany({
    include: {
      requirements: true,
      benefits: true
    }
  });

  knowledge.visa_packages = visaPackages.map(visa => ({
    id: visa.id,
    country: visa.country,
    type: visa.type,
    processing_time: visa.processingTime,
    price: visa.price,
    description: visa.description,
    requirements: visa.requirements?.map(r => r.requirement) || [],
    benefits: visa.benefits?.map(b => b.benefit) || [],
    validity: visa.validity,
    available: visa.available
  }));

  // Fetch Jobs
  const jobs = await prisma.job.findMany({
    include: {
      requirements: true,
      responsibilities: true,
      benefits: true
    }
  });

  knowledge.jobs = jobs.map(job => ({
    id: job.id,
    title: job.title,
    company: job.company,
    location: job.location,
    type: job.type,
    salary: job.salary,
    description: job.description,
    requirements: job.requirements?.map(r => r.requirement) || [],
    responsibilities: job.responsibilities?.map(r => r.responsibility) || [],
    benefits: job.benefits?.map(b => b.benefit) || [],
    experience: job.experience,
    posted_date: job.postedDate,
    status: job.status
  }));

  // Add Common FAQs
  knowledge.faqs = [
    {
      question: "What services does RIO International provide?",
      answer: "We provide international tour packages, visa processing services for various countries, career opportunities, and comprehensive travel consulting.",
      bangla_question: "RIO International কি কি সেবা প্রদান করে?",
      bangla_answer: "আমরা আন্তর্জাতিক ট্যুর পैकেজ, বিভিন্ন দেশের ভিসা প্রসেসিং সেবা, ক্যারিয়ার সুযোগ এবং সম্পূর্ণ ভ্রমণ পরামর্শ প্রদান করি।"
    },
    {
      question: "How can I book a tour package?",
      answer: "You can book a tour by visiting our website, selecting your desired package, and clicking 'Book Now'. Our team will contact you within 24 hours.",
      bangla_question: "আমি কিভাবে ট্যুর প্যাকেজ বুক করতে পারি?",
      bangla_answer: "আপনি আমাদের ওয়েবসাইট ভিজিট করে, আপনার পছন্দের প্যাকেজ নির্বাচন করে এবং 'বুক করুন' ক্লিক করে ট্যুর বুক করতে পারেন। আমাদের টিম ২৪ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করবে।"
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept bank transfers, bKash, Nagad, Rocket, and major credit/debit cards.",
      bangla_question: "আপনারা কি ধরনের পেমেন্ট গ্রহণ করেন?",
      bangla_answer: "আমরা ব্যাংক ট্রান্সফার, বিকাশ, নগদ, রকেট এবং প্রধান ক্রেডিট/ডেবিট কার্ড গ্রহণ করি।"
    },
    {
      question: "How long does visa processing take?",
      answer: "Visa processing time varies by country, typically taking 15-30 business days. Some countries offer express processing.",
      bangla_question: "ভিসা প্রসেসিং এ কত সময় লাগে?",
      bangla_answer: "দেশ ভেদে ভিসা প্রসেসিং এর সময় ভিন্ন হয়, সাধারণত ১৫-৩০ কার্যদিবস লাগে। কিছু দেশ এক্সপ্রেস প্রসেসিং প্রদান করে।"
    },
    {
      question: "Do you provide group discounts?",
      answer: "Yes, we offer special discounts for group bookings of 10 or more people. Contact us for customized group packages.",
      bangla_question: "আপনারা কি গ্রুপ ডিসকাউন্ট দেন?",
      bangla_answer: "হ্যাঁ, আমরা ১০ জন বা তার বেশি মানুষের গ্রুপ বুকিং এর জন্য বিশেষ ছাড় প্রদান করি। কাস্টমাইজড গ্রুপ প্যাকেজের জন্য আমাদের সাথে যোগাযোগ করুন।"
    },
    {
      question: "Is travel insurance included in tour packages?",
      answer: "Travel insurance can be added to any package. We recommend it for international travel and can help you arrange comprehensive coverage.",
      bangla_question: "ট্যুর প্যাকেজে কি ট্রাভেল ইনস্যুরেন্স অন্তর্ভুক্ত?",
      bangla_answer: "যেকোনো প্যাকেজে ট্রাভেল ইনস্যুরেন্স যোগ করা যায়। আমরা আন্তর্জাতিক ভ্রমণের জন্য এটি সুপারিশ করি এবং সম্পূর্ণ কভারেজের ব্যবস্থা করতে সাহায্য করতে পারি।"
    }
  ];

  // Save to file
  const outputPath = path.join(__dirname, 'company-knowledge.json');
  await fs.writeFile(outputPath, JSON.stringify(knowledge, null, 2), 'utf-8');
  
  console.log('✅ Knowledge base generated successfully!');
  console.log(`📊 Stats:
  - Tours: ${knowledge.tours.length}
  - Visa Packages: ${knowledge.visa_packages.length}
  - Jobs: ${knowledge.jobs.length}
  - FAQs: ${knowledge.faqs.length}`);
  
  await prisma.$disconnect();
}

generateKnowledgeBase().catch(console.error);
```

Run this script:
```bash
cd backend
node src/chatbot/data/generate-knowledge-base.js
```

---

## 🔧 Backend Implementation

### Step 1: Install Required Packages

```bash
cd backend
npm install @google/generative-ai chromadb uuid dotenv
```

### Step 2: Setup Environment Variables

Add to **`backend/.env`**:

```env
# Google Gemini API (FREE)
GOOGLE_GEMINI_API_KEY=your_api_key_here

# Get free API key from: https://makersuite.google.com/app/apikey
# No credit card required!
```



### Step 3: Create Vector Store Service

**File: `backend/src/chatbot/services/vectorStore.js`**

```javascript
const { ChromaClient } = require('chromadb');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs').promises;
const path = require('path');

class VectorStore {
  constructor() {
    this.client = null;
    this.collection = null;
    this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;

    try {
      // Initialize Chroma client
      this.client = new ChromaClient();
      
      // Get or create collection
      try {
        this.collection = await this.client.getCollection({
          name: "rio_travel_knowledge"
        });
        console.log('✅ Connected to existing vector store');
      } catch (error) {
        this.collection = await this.client.createCollection({
          name: "rio_travel_knowledge"
        });
        console.log('✅ Created new vector store');
        await this.loadKnowledge();
      }

      this.initialized = true;
    } catch (error) {
      console.error('❌ Vector store initialization error:', error);
      throw error;
    }
  }

  async loadKnowledge() {
    console.log('📚 Loading knowledge base into vector store...');
    
    const knowledgePath = path.join(__dirname, '../data/company-knowledge.json');
    const data = JSON.parse(await fs.readFile(knowledgePath, 'utf-8'));

    const documents = [];
    const ids = [];
    const metadatas = [];

    // Process tours
    data.tours.forEach((tour, idx) => {
      const text = `Tour: ${tour.name}
Destination: ${tour.destination}
Duration: ${tour.duration}
Price: ${tour.price}
Description: ${tour.description}
Highlights: ${tour.highlights?.join(', ')}
Includes: ${tour.includes?.join(', ')}`;

      documents.push(text);
      ids.push(`tour_${idx}`);
      metadatas.push({ type: 'tour', id: tour.id, name: tour.name });
    });

    // Process visa packages
    data.visa_packages.forEach((visa, idx) => {
      const text = `Visa Package: ${visa.country} ${visa.type}
Processing Time: ${visa.processing_time}
Price: ${visa.price}
Description: ${visa.description}
Requirements: ${visa.requirements?.join(', ')}
Benefits: ${visa.benefits?.join(', ')}`;

      documents.push(text);
      ids.push(`visa_${idx}`);
      metadatas.push({ type: 'visa', id: visa.id, country: visa.country });
    });

    // Process jobs
    data.jobs.forEach((job, idx) => {
      const text = `Job: ${job.title} at ${job.company}
Location: ${job.location}
Type: ${job.type}
Salary: ${job.salary}
Description: ${job.description}
Requirements: ${job.requirements?.join(', ')}
Responsibilities: ${job.responsibilities?.join(', ')}`;

      documents.push(text);
      ids.push(`job_${idx}`);
      metadatas.push({ type: 'job', id: job.id, title: job.title });
    });

    // Process FAQs
    data.faqs.forEach((faq, idx) => {
      const text = `Q: ${faq.question}
A: ${faq.answer}
[Bangla] Q: ${faq.bangla_question}
A: ${faq.bangla_answer}`;

      documents.push(text);
      ids.push(`faq_${idx}`);
      metadatas.push({ type: 'faq' });
    });

    // Add company info
    documents.push(`Company: ${data.company_info.name}
Type: ${data.company_info.type}
Services: ${data.company_info.services.join(', ')}
Description: ${data.company_info.description}
Bangla: ${data.company_info.bangla_description}`);
    ids.push('company_info');
    metadatas.push({ type: 'company' });

    // Add to collection
    await this.collection.add({
      ids,
      documents,
      metadatas
    });

    console.log(`✅ Loaded ${documents.length} documents into vector store`);
  }

  async search(query, limit = 5) {
    if (!this.initialized) await this.initialize();

    try {
      const results = await this.collection.query({
        queryTexts: [query],
        nResults: limit
      });

      return results.documents[0] || [];
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  }

  async reset() {
    try {
      await this.client.deleteCollection({ name: "rio_travel_knowledge" });
      this.initialized = false;
      await this.initialize();
      console.log('✅ Vector store reset successfully');
    } catch (error) {
      console.error('Reset error:', error);
    }
  }
}

module.exports = new VectorStore();
```

### Step 4: Create Chatbot Service

**File: `backend/src/chatbot/services/chatbotService.js`**

```javascript
const { GoogleGenerativeAI } = require('@google/generative-ai');
const vectorStore = require('./vectorStore');

class ChatbotService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    this.conversationHistory = new Map(); // Store conversations by session
  }

  async initialize() {
    await vectorStore.initialize();
  }

  detectLanguage(text) {
    // Simple Bangla detection (checks for Bangla Unicode characters)
    const banglaRegex = /[\u0980-\u09FF]/;
    return banglaRegex.test(text) ? 'bangla' : 'english';
  }

  buildSystemPrompt(language, context) {
    const prompts = {
      english: `You are a helpful, friendly, and professional AI assistant for RIO International Travel Agency. 

Your personality:
- Warm and welcoming, like a knowledgeable travel advisor
- Professional but conversational
- Enthusiastic about helping customers plan their trips
- Patient and thorough in explanations
- Use emojis occasionally to be friendly (✈️ 🌍 🎫 ✨ 🏨 etc.)

Your knowledge:
${context}

Important guidelines:
1. ONLY provide information that is in the context above
2. If asked about something not in your knowledge, politely say you'll connect them with a human agent
3. Always mention specific prices, dates, and details when available
4. For bookings, guide them to contact the team or use the website
5. Be concise but complete
6. If you're not sure, admit it and offer to connect them with support
7. Always be helpful and encouraging about travel plans

Remember: You represent RIO International - be professional, accurate, and customer-focused!`,

      bangla: `আপনি RIO International Travel Agency এর একজন সহায়ক, বন্ধুত্বপূর্ণ এবং পেশাদার AI সহায়ক।

আপনার ব্যক্তিত্ব:
- উষ্ণ এবং স্বাগত জানানো, একজন জ্ঞানী ভ্রমণ উপদেষ্টার মতো
- পেশাদার কিন্তু কথোপকথনমূলক
- গ্রাহকদের ভ্রমণ পরিকল্পনায় সাহায্য করতে উৎসাহী
- ব্যাখ্যায় ধৈর্যশীল এবং পুঙ্খানুপুঙ্খ
- বন্ধুত্বপূর্ণ হতে মাঝেমধ্যে ইমোজি ব্যবহার করুন (✈️ 🌍 🎫 ✨ 🏨 ইত্যাদি)

আপনার জ্ঞান:
${context}

গুরুত্বপূর্ণ নির্দেশিকা:
1. শুধুমাত্র উপরের প্রসঙ্গে যা আছে তা প্রদান করুন
2. যদি এমন কিছু জিজ্ঞাসা করা হয় যা আপনার জ্ঞানে নেই, ভদ্রভাবে বলুন আপনি তাদের একজন মানব এজেন্টের সাথে সংযুক্ত করবেন
3. সর্বদা নির্দিষ্ট মূল্য, তারিখ এবং বিবরণ উল্লেখ করুন যখন উপলব্ধ
4. বুকিং এর জন্য, তাদের দল টিমের সাথে যোগাযোগ করতে বা ওয়েবসাইট ব্যবহার করতে গাইড করুন
5. সংক্ষিপ্ত কিন্তু সম্পূর্ণ হন
6. যদি নিশ্চিত না হন, স্বীকার করুন এবং সাপোর্টের সাথে সংযুক্ত করার প্রস্তাব দিন
7. সর্বদা ভ্রমণ পরিকল্পনা সম্পর্কে সহায়ক এবং উৎসাহী হন

মনে রাখবেন: আপনি RIO International এর প্রতিনিধিত্ব করছেন - পেশাদার, সঠিক এবং গ্রাহক-কেন্দ্রিক হন!`
    };

    return prompts[language];
  }

  async chat(message, sessionId = 'default') {
    try {
      // Detect language
      const language = this.detectLanguage(message);

      // Search for relevant context
      const relevantDocs = await vectorStore.search(message, 5);
      const context = relevantDocs.join('\n\n');

      // Build system prompt
      const systemPrompt = this.buildSystemPrompt(language, context);

      // Get conversation history
      let history = this.conversationHistory.get(sessionId) || [];

      // Create chat
      const chat = this.model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: systemPrompt }]
          },
          {
            role: "model",
            parts: [{ text: language === 'bangla' ? "বুঝেছি! আমি RIO International এর সহায়ক। আমি কীভাবে সাহায্য করতে পারি? 😊" : "Understood! I'm RIO International's assistant. How can I help you? 😊" }]
          },
          ...history
        ]
      });

      // Send message
      const result = await chat.sendMessage(message);
      const response = result.response.text();

      // Update history
      history.push(
        { role: "user", parts: [{ text: message }] },
        { role: "model", parts: [{ text: response }] }
      );

      // Keep only last 10 exchanges (20 messages)
      if (history.length > 20) {
        history = history.slice(-20);
      }

      this.conversationHistory.set(sessionId, history);

      return {
        response,
        language,
        sessionId
      };

    } catch (error) {
      console.error('Chat error:', error);
      throw error;
    }
  }

  clearHistory(sessionId) {
    this.conversationHistory.delete(sessionId);
  }
}

module.exports = new ChatbotService();
```

### Step 5: Create API Controller

**File: `backend/src/controllers/chatbotController.js`**

```javascript
const chatbotService = require('../chatbot/services/chatbotService');
const { v4: uuidv4 } = require('uuid');

class ChatbotController {
  async chat(req, res) {
    try {
      const { message, sessionId } = req.body;

      if (!message || message.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Message is required'
        });
      }

      // Generate session ID if not provided
      const session = sessionId || uuidv4();

      // Get response from chatbot
      const result = await chatbotService.chat(message, session);

      res.json({
        success: true,
        data: {
          response: result.response,
          language: result.language,
          sessionId: result.sessionId,
          timestamp: new Date().toISOString()
        }
      });

    } catch (error) {
      console.error('Chatbot controller error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to process message',
        message: error.message
      });
    }
  }

  async clearHistory(req, res) {
    try {
      const { sessionId } = req.params;
      
      chatbotService.clearHistory(sessionId);

      res.json({
        success: true,
        message: 'Conversation history cleared'
      });

    } catch (error) {
      console.error('Clear history error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to clear history'
      });
    }
  }

  async regenerateKnowledge(req, res) {
    try {
      // This endpoint can be called when you update your data
      const vectorStore = require('../chatbot/services/vectorStore');
      await vectorStore.reset();

      res.json({
        success: true,
        message: 'Knowledge base regenerated successfully'
      });

    } catch (error) {
      console.error('Regenerate knowledge error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to regenerate knowledge base'
      });
    }
  }
}

module.exports = new ChatbotController();
```

### Step 6: Create Routes

**File: `backend/src/routes/chatbotRoutes.js`**

```javascript
const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');

// Public routes
router.post('/chat', chatbotController.chat);
router.delete('/session/:sessionId', chatbotController.clearHistory);

// Admin route (protected - add auth middleware if needed)
router.post('/regenerate-knowledge', chatbotController.regenerateKnowledge);

module.exports = router;
```

### Step 7: Register Routes in Main App

Update **`backend/src/app.js`**:

```javascript
// Add this with other route imports
const chatbotRoutes = require('./routes/chatbotRoutes');

// Add this with other route registrations
app.use('/api/chatbot', chatbotRoutes);
```

### Step 8: Initialize Chatbot on Server Start

Update **`backend/src/server.js`**:

```javascript
const chatbotService = require('./chatbot/services/chatbotService');

// Add after database connection
async function initializeChatbot() {
  try {
    console.log('🤖 Initializing AI Chatbot...');
    await chatbotService.initialize();
    console.log('✅ AI Chatbot initialized successfully');
  } catch (error) {
    console.error('❌ Chatbot initialization failed:', error);
  }
}

// Call in startup sequence
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await initializeChatbot();
});
```

---

## 🎨 Frontend Implementation

### Step 1: Create Chatbot Context

**File: `frontend/src/contexts/ChatbotContext.jsx`**

```javascript
import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

const ChatbotContext = createContext();

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within ChatbotProvider');
  }
  return context;
};

export const ChatbotProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  const sendMessage = useCallback(async (message) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await axios.post('/api/chatbot/chat', {
        message,
        sessionId
      });

      // Add bot response
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response.data.data.response,
        language: response.data.data.language,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setSessionId(response.data.data.sessionId);

    } catch (error) {
      console.error('Chat error:', error);
      
      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'Sorry, I encountered an error. Please try again. 😔',
        timestamp: new Date(),
        isError: true
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId]);

  const clearChat = useCallback(async () => {
    try {
      if (sessionId) {
        await axios.delete(`/api/chatbot/session/${sessionId}`);
      }
      setMessages([]);
      setSessionId(null);
    } catch (error) {
      console.error('Clear chat error:', error);
    }
  }, [sessionId]);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const value = {
    messages,
    isOpen,
    isLoading,
    sendMessage,
    clearChat,
    toggleChat,
    setIsOpen
  };

  return (
    <ChatbotContext.Provider value={value}>
      {children}
    </ChatbotContext.Provider>
  );
};
```

### Step 2: Create Chatbot UI Component

**File: `frontend/src/components/Chatbot/Chatbot.jsx`**

```javascript
import React, { useState, useRef, useEffect } from 'react';
import { useChatbot } from '../../contexts/ChatbotContext';
import { 
  MessageCircle, 
  X, 
  Send, 
  Trash2, 
  Bot, 
  User,
  Minimize2
} from 'lucide-react';

const Chatbot = () => {
  const {
    messages,
    isOpen,
    isLoading,
    sendMessage,
    clearChat,
    toggleChat,
    setIsOpen
  } = useChatbot();

  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput('');
    }
  };

  const handleClear = () => {
    if (window.confirm('Clear chat history?')) {
      clearChat();
    }
  };

  // Quick action buttons
  const quickActions = [
    { text: 'Show me tours', bangla: 'ট্যুর দেখান' },
    { text: 'Visa services', bangla: 'ভিসা সেবা' },
    { text: 'Job opportunities', bangla: 'চাকরির সুযোগ' },
    { text: 'Contact info', bangla: 'যোগাযোগ তথ্য' }
  ];

  if (!isOpen) {
    return (
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 
                   text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all 
                   duration-300 z-50 group animate-bounce hover:animate-none"
        aria-label="Open chatbot"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs 
                         rounded-full w-5 h-5 flex items-center justify-center 
                         animate-pulse">
          1
        </span>
      </button>
    );
  }

  return (
    <div 
      className={`fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl z-50 
                  transition-all duration-300 ${
                    isMinimized ? 'h-16 w-80' : 'h-[600px] w-96'
                  }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 
                      rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Bot className="w-8 h-8" />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 
                           rounded-full border-2 border-white"></span>
          </div>
          <div>
            <h3 className="font-bold">RIO Travel Assistant</h3>
            <p className="text-xs opacity-90">Always here to help ✨</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="hover:bg-white/20 p-1.5 rounded-lg transition"
            aria-label="Minimize"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleClear}
            className="hover:bg-white/20 p-1.5 rounded-lg transition"
            aria-label="Clear chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={toggleChat}
            className="hover:bg-white/20 p-1.5 rounded-lg transition"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div className="h-[420px] overflow-y-auto p-4 space-y-4 bg-gradient-to-b 
                          from-gray-50 to-white">
            
            {/* Welcome Message */}
            {messages.length === 0 && (
              <div className="text-center py-8">
                <Bot className="w-16 h-16 mx-auto text-blue-600 mb-4" />
                <h4 className="font-bold text-gray-800 mb-2">
                  Welcome to RIO International! 👋
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  I'm your travel assistant. Ask me anything about tours, visas, 
                  or careers!
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  আমি বাংলা এবং ইংরেজি উভয়ই বুঝি! 🇧🇩
                </p>
                
                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {quickActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        sendMessage(action.text);
                        setInput('');
                      }}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs 
                               py-2 px-3 rounded-lg transition"
                    >
                      {action.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message List */}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center 
                                  justify-center ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-purple-100 text-purple-600'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div className={`rounded-2xl px-4 py-2 ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : message.isError
                      ? 'bg-red-50 text-red-700 rounded-bl-none'
                      : 'bg-white shadow-md text-gray-800 rounded-bl-none'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user'
                        ? 'text-blue-100'
                        : 'text-gray-400'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2 bg-white shadow-md 
                              rounded-2xl rounded-bl-none px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" 
                         style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" 
                         style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" 
                         style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-xs text-gray-500">Typing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message... / আপনার বার্তা টাইপ করুন..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full 
                         focus:outline-none focus:ring-2 focus:ring-blue-600 
                         focus:border-transparent text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                         p-2 rounded-full hover:shadow-lg transition-all duration-300 
                         disabled:opacity-50 disabled:cursor-not-allowed 
                         hover:scale-105 active:scale-95"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
            <p className="text-xs text-gray-400 text-center mt-2">
              Powered by AI • Bilingual Support 🇧🇩 🇬🇧
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;
```

### Step 3: Update Main App

Update **`frontend/src/App.jsx`**:

```javascript
import { ChatbotProvider } from './contexts/ChatbotContext';
import Chatbot from './components/Chatbot/Chatbot';

function App() {
  return (
    <ChatbotProvider>
      {/* Your existing app content */}
      <YourExistingRoutes />
      
      {/* Add Chatbot - it will appear on all pages */}
      <Chatbot />
    </ChatbotProvider>
  );
}

export default App;
```

---

## 🌍 Bilingual Support Enhancement

The chatbot automatically detects language, but you can enhance it:

**Add language toggle in Chatbot component:**

```javascript
const [preferredLanguage, setPreferredLanguage] = useState('auto');

// Add to header
<button
  onClick={() => setPreferredLanguage(prev => 
    prev === 'auto' ? 'english' : prev === 'english' ? 'bangla' : 'auto'
  )}
  className="text-xs bg-white/20 px-2 py-1 rounded"
>
  {preferredLanguage === 'auto' ? '🌐 Auto' : 
   preferredLanguage === 'english' ? '🇬🇧 EN' : '🇧🇩 BN'}
</button>
```

---

## 🧪 Testing & Optimization

### Step 1: Test the Implementation

```bash
# Generate knowledge base
cd backend
node src/chatbot/data/generate-knowledge-base.js

# Start backend
npm run dev

# In another terminal, start frontend
cd frontend
npm run dev
```

### Step 2: Test Queries

Try these test queries:

**English:**
- "Show me Dubai tour packages"
- "How much does a USA visa cost?"
- "What jobs are available?"
- "How do I book a tour?"

**Bangla:**
- "দুবাই ট্যুর প্যাকেজ দেখান"
- "আমেরিকা ভিসা কত টাকা?"
- "কি কি চাকরি আছে?"
- "ট্যুর কিভাবে বুক করব?"

### Step 3: Monitor Performance

Add logging to track usage:

```javascript
// In chatbotController.js
const logChatInteraction = async (message, response, language) => {
  // Log to file or database
  console.log(`[${new Date().toISOString()}] ${language}: ${message.substring(0, 50)}...`);
};
```

---

## 🚀 Deployment

### Option 1: Deploy with Current Setup

Your current deployment (Render/Vercel) works, but add:

1. **Environment variable** on Render:
   ```
   GOOGLE_GEMINI_API_KEY=your_api_key
   ```

2. **Persistent storage** for Chroma (vector store):
   - Use Render persistent disk
   - Or migrate to Pinecone (has free tier)

### Option 2: Use Pinecone (Free Vector DB)

If Chroma doesn't persist well on Render, switch to Pinecone:

```bash
npm install @pinecone-database/pinecone
```

Get free API key from: https://www.pinecone.io/

---

## 💰 Cost Analysis (FREE Options)

| Service | Free Tier | Limits |
|---------|-----------|--------|
| **Google Gemini** | ✅ FREE | 60 requests/min |
| **Groq** | ✅ FREE | Good for testing |
| **Chroma** | ✅ FREE | Local/self-hosted |
| **Pinecone** | ✅ FREE | 1 index, 100k vectors |
| **Hosting** | ✅ FREE | Your current setup |

**Total Cost: $0** for testing and moderate usage!

---

## 🎨 UI Customization

### Make it cuter and more dynamic:

1. **Add animations** (already included in component)
2. **Custom avatar** - replace Bot icon with your logo
3. **Sound effects** (optional):

```javascript
const playSound = () => {
  const audio = new Audio('/sounds/notification.mp3');
  audio.play();
};
```

4. **Typing animation for bot responses**:

```javascript
const [displayedText, setDisplayedText] = useState('');

useEffect(() => {
  if (botMessage) {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(botMessage.slice(0, index));
      index++;
      if (index > botMessage.length) clearInterval(interval);
    }, 30);
  }
}, [botMessage]);
```

---

## 📱 Mobile Responsive

The component is already responsive, but test on mobile:

```css
/* Add to your CSS if needed */
@media (max-width: 640px) {
  .chatbot-container {
    width: calc(100vw - 32px);
    height: calc(100vh - 100px);
    bottom: 16px;
    right: 16px;
  }
}
```

---

## 🔄 Auto-Update Knowledge Base

Add a cron job to regenerate knowledge daily:

**File: `backend/src/chatbot/jobs/updateKnowledge.js`**

```javascript
const cron = require('node-cron');
const { exec } = require('child_process');

// Run every day at 2 AM
cron.schedule('0 2 * * *', () => {
  console.log('🔄 Updating chatbot knowledge base...');
  exec('node src/chatbot/data/generate-knowledge-base.js', (error, stdout) => {
    if (error) {
      console.error('Knowledge update failed:', error);
    } else {
      console.log('✅ Knowledge base updated');
      
      // Reset vector store
      const vectorStore = require('../services/vectorStore');
      vectorStore.reset();
    }
  });
});
```

---

## 🎯 Next Steps & Improvements

Once you test and it works well:

1. **Analytics**: Track popular queries
2. **Feedback**: Add 👍 👎 buttons for responses
3. **Voice Input**: Add speech-to-text
4. **Rich Responses**: Include images, carousels for tours
5. **Booking Integration**: Direct booking from chat
6. **Human Handoff**: Connect to live support when needed

---

## 🆘 Troubleshooting

### Issue: "API Key not found"
**Solution**: Make sure `GOOGLE_GEMINI_API_KEY` is in `.env`

### Issue: "Vector store not persisting"
**Solution**: Use Pinecone instead of Chroma for production

### Issue: "Bangla not working well"
**Solution**: Gemini is best for Bangla. Make sure you're using `gemini-pro` model

### Issue: "Responses are slow"
**Solution**: Switch to Groq for faster inference, or use Gemini with lower context

### Issue: "Chatbot giving wrong information"
**Solution**: 
1. Regenerate knowledge base
2. Add more specific data
3. Improve system prompt with examples

---

## 📚 Resources

- **Gemini API**: https://ai.google.dev/
- **Groq API**: https://groq.com/
- **Chroma**: https://www.trychroma.com/
- **Pinecone**: https://www.pinecone.io/
- **Tailwind CSS**: https://tailwindcss.com/

---

## ✅ Checklist

- [ ] Get Google Gemini API key (FREE)
- [ ] Install backend packages
- [ ] Generate knowledge base from database
- [ ] Create backend services and routes
- [ ] Create frontend components
- [ ] Test in English and Bangla
- [ ] Deploy to production
- [ ] Monitor and optimize
- [ ] Gather user feedback
- [ ] Consider upgrading to paid tier if needed

---

## 🎉 Conclusion

You now have a **complete, professional, bilingual AI chatbot** that:
- ✅ Knows your tours, visas, jobs
- ✅ Speaks English & Bangla fluently
- ✅ Has a beautiful, responsive UI
- ✅ Costs **$0** to start
- ✅ Can scale with your business

The chatbot will make your website more interactive and help customers 24/7!

**Good luck! 🚀 শুভকামনা! 🌟**

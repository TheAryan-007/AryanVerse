import { NextResponse } from "next/server";

// Structured Knowledge Base compiled from the codebase profile
const KNOWLEDGE_BASE = `
ARYAN CHAUHAN PROFILE DETAILS:
- Name: Aryan Chauhan
- Age: 18
- Current Status: 2nd year B.Tech Computer Science student at Bennett University, Greater Noida, specializing in Data Science.
- Persona/Creed: "Never afraid to take part. Win or lose, I show up."
- Availability: Available for work.

EDUCATION:
- B.Tech Computer Science (2nd Year) at Bennett University, specializing in Data Science.
- CBSE Class 12 Boards: Scored 81% overall.
- CBSE Class 12 Fine Arts Landscape Project: Scored a perfect 100/100.
- School Milestones: Appointed School Head Boy in Class 11 (led student council of 30+ peers). Scored 98/100 in Hindi during early school years.

CORE SKILLS:
- Programming Languages: Java (strongest academic language, OOP, software design), Python (comfortable, machine learning, data science), HTML, CSS (UI design, responsiveness), JavaScript (interactive web developments), C++ (currently learning, algorithms & DSA).
- Version Control: Git & GitHub.
- Data Science Toolkit: Pandas (manipulation & analysis), NumPy (arrays & computing), Matplotlib / Plotly (visualization), Jupyter Notebook, Google Colab, Scikit-Learn (ML pipelines), Microsoft Excel.
- Productivity & Platforms: VS Code, LeetCode, Kaggle, LinkedIn, Canva, Google Cloud Generative AI Studio (Badge), MATLAB Machine Learning (Certificate).
- Competencies: Leadership, Teamwork, Problem Solving, Communication, Graphic Design, Creative Writing.

PROFESSIONAL EXPERIENCE:
1. Data Science Intern — Unessa Foundation (June 2026 - Present): Selected via Internshala selection program. Applying data analysis and building machine learning pipelines.
2. Graphic Design & Social Media Management Intern — DAWN Foundation (~3 months post Class 12): Designed wellness graphic campaigns reaching 5000+ students, magazine layouts, content writing, and visual branding.

PROJECTS PORTFOLIO:
1. SkySentry AI (Jan 2026 - Mar 2026): Lead ML Engineer (Research Project). AI-powered computer vision for false alert reduction in aerial surveillance. Deployed YOLOv10 (NMS-free training) trained on 12k custom annotated frames of UAVs, birds, aircraft. Integrated OpenCV Kalman filter. Validation mAP@0.5 of 96.8%, operating at 48.7 FPS.
2. AryanVerse (May 2026 - Present): Creator & Architect (Personal Project). Immersive WebGL sandbox portfolio styled as an interactive solar system galaxy. Syncs Three.js canvas with Next.js App Router using GSAP camera interpolations. Optimized geometry buffer.
3. Movie Recommendation System (Planned Q3 2026): ML Developer. Hybrid recommendation engine using Content-Based filtering (TF-IDF vectorizer) and Collaborative Filtering (Singular Value Decomposition). Tech stack: Python, Scikit-Learn, Streamlit, Pandas.
4. Unscripted Love (Dec 2025 - Present): Author / Creative Writer. Contemporary novel writing project. Maps external events to internal psychological shifts using Hero's Journey schema. Currently writing Chapter 3. Planned length: 12 chapters (~45k words).
5. LyfChanger (Planned Q4 2026): Founder. Premium conceptual startup plan designed as a digital-first lifestyle platform combining habit curation with wellness merchandise.
6. Class 11 Streetwear Brand (Jul 2023 - Feb 2024): Founder. High-school print-on-demand streetwear brand. Utilized organic Instagram video campaigns, generating ₹84,000 in revenue with zero ad spend.
7. Echos (Planned Q4 2026): Lead Creator. Semantic intelligence engine for notes and mind mapping. Embeds short text, clusters vectors using DBSCAN (OpenAI text-embedding-3-small), and renders constellation connections dynamically.

TIMELINE CHAPTERS:
- Chapter 1 (0-12 yrs): Roots in Meerut, move to Rajasthan, first stage speech in Class 3, 98/100 Hindi.
- Chapter 2 (12-14 yrs): Moved to Noida, competed at Jawaharlal Nehru Stadium representing school at National High Jump Championship.
- Chapter 3 (14-16 yrs): Top marks in school English, late-night whiteboard teaching sessions earning nickname "Maverick Guru".
- Chapter 4 (16-17 yrs): Appointed School Head Boy, organized Sports Day.
- Chapter 5 (17-18 yrs): Scored 81% CBSE Class 12, bootstrapped Class 11 streetwear brand (₹84k revenue), 100/100 Fine Arts.
- Chapter 6 (Ongoing): B.Tech CS at Bennett University, building AryanVerse, Interning at Unessa.

CONTACT INFORMATION:
- Email: aryanncr2@gmail.com
- WhatsApp/Phone: +91 7827087385
- LinkedIn: https://www.linkedin.com/in/aryan-chauhan-4284b32a7
- GitHub: https://github.com/TheAryan-007
- Instagram: @aryannxnn._.02
- Portfolio URL: https://aryanverse.vercel.app
`;

// Helper for local simulated fallback responses
function getLocalResponse(query) {
  const q = query.toLowerCase();

  if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("greet")) {
    return "Greetings, traveler! I am EON, operating in local low-power mode. Ask me about Aryan's skills, projects, internships, achievements, or how to contact him!";
  }
  if (q.includes("who") || q.includes("about") || q.includes("bio") || q.includes("background") || q.includes("profile")) {
    return "Aryan Chauhan is an 18-year-old developer and storyteller currently in his 2nd year of **B.Tech Computer Science (specializing in Data Science)** at Bennett University. He loves building intelligent systems like *SkySentry AI* and creative digital worlds like this *AryanVerse*!";
  }
  if (q.includes("skill") || q.includes("java") || q.includes("python") || q.includes("c++") || q.includes("programming") || q.includes("languages") || q.includes("tech")) {
    return "Aryan's technical skills include:\n\n* **Languages:** Java (strongest academic language), Python (machine learning, data science), HTML/CSS, JavaScript, and C++ (currently learning).\n* **Data Science:** Pandas, NumPy, Matplotlib, Scikit-Learn, Jupyter Notebook, Google Colab.\n* **Tools:** Git, GitHub, VS Code, Canva, MS Excel.\n* **Certificates:** MATLAB Machine Learning Certificate, Google Cloud Generative AI Studio badge.";
  }
  if (q.includes("project") || q.includes("skysentry") || q.includes("lyfchanger") || q.includes("unscripted") || q.includes("echos") || q.includes("movie") || q.includes("recommend") || q.includes("streetwear")) {
    return "Here are Aryan's primary projects:\n\n1. **SkySentry AI:** Computer vision for false alert reduction in aerial feeds using YOLOv10 and Kalman filters (96.8% mAP, 48.7 FPS).\n2. **AryanVerse:** This interactive WebGL solar system portfolio built using Next.js, Three.js, and GSAP.\n3. **LyfChanger:** A premium startup plan in conceptual phase, designed as a digital-first lifestyle platform combining habit curation with wellness merchandise.\n4. **Custom Streetwear Brand:** A streetwear brand bootstrapped in Class 11 that generated ₹84,000 in revenue using organic social marketing.\n5. **Unscripted Love:** An ongoing contemporary novel project (writing Chapter 3).\n6. **Echos:** A planned semantic notes engine using vector embeddings and graphs.\n7. **Movie Recommendation System:** Collaborative and content-based recommendation engine.";
  }
  if (q.includes("experience") || q.includes("intern") || q.includes("unessa") || q.includes("dawn") || q.includes("work")) {
    return "Aryan's professional experience includes:\n\n* **Data Science Intern** at Unessa Foundation (June 2026 - Present): Applying analysis and machine learning workflows to real-world tasks.\n* **Graphic Design Intern** at DAWN Foundation: Coordinated wellness marketing campaigns reaching 5,000+ students and designed layouts.";
  }
  if (q.includes("achievement") || q.includes("award") || q.includes("milestone") || q.includes("high jump") || q.includes("head boy")) {
    return "Aryan's major achievements include:\n\n* **National-Level Athlete:** Competed at the National High Jump Championship in Class 8.\n* **School Head Boy:** Appointed leader of the MDVM student council in Class 11.\n* **Perfect Art Score:** Scored 100/100 on his CBSE Class 12 Fine Arts Landscape project.\n* **Entrepreneurship:** Bootstrapped a custom streetwear clothing brand to ₹84,000 in revenue in school.";
  }
  if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("whatsapp") || q.includes("linkedin") || q.includes("social") || q.includes("instagram")) {
    return "Here are Aryan's contact coordinates:\n\n* **Email:** [aryanncr2@gmail.com](mailto:aryanncr2@gmail.com)\n* **WhatsApp/Call:** [+91 7827087385](https://wa.me/917827087385)\n* **LinkedIn:** [Aryan Chauhan](https://www.linkedin.com/in/aryan-chauhan-4284b32a7)\n* **GitHub:** [TheAryan-007](https://github.com/TheAryan-007)\n* **Instagram:** [@aryannxnn._.02](https://www.instagram.com/aryannxnn._.02)";
  }

  return "Hello! I am EON, Aryan's digital assistant. I am currently operating in local low-power mode because the host's Gemini API key is not yet configured. I can tell you all about Aryan's skills, projects, internships, achievements, or contact coordinates. Go ahead and ask!";
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { message, history = [] } = body;

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Check if the key is default or missing
    if (!apiKey || apiKey === "YOUR_GEMINI_API_KEY_HERE") {
      const reply = getLocalResponse(message);
      return NextResponse.json({
        reply: reply,
        isSimulated: true,
        notice: "Host notice: To unlock open-ended conversational AI, set your GEMINI_API_KEY in your .env.local file."
      });
    }

    // Call the Google Gemini API (using gemini-2.5-flash)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
    // Structure chat history into Gemini format
    const contents = [];
    
    // Add history in user/model roles
    for (const chat of history) {
      contents.push({
        role: chat.role === "user" ? "user" : "model",
        parts: [{ text: chat.text }]
      });
    }
    
    // Add current user prompt
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const systemInstructionText = `
You are EON, a sleek holographic robotic drone companion that floats inside Aryan Chauhan's 3D WebGL solar system digital portfolio. 
Your job is to introduce Aryan, explain his skills, achievements, B.Tech curriculum, experiences, and projects in a friendly, technical, futuristic, and enthusiastic cyber-assistant tone.

Here is the verified data about Aryan Chauhan. You must rely ONLY on this factsheet. If asked about something not in this factsheet, politely state that you do not have that information in your core database:
${KNOWLEDGE_BASE}

GUIDELINES:
1. Act as a holographic companion. Use occasional cybernetic or spatial phrases (e.g. "Signal received", "Scanning database", "Universe core loaded").
2. Answer questions in a clean, easily readable layout. Use simple plain text. DO NOT use markdown bold text (like double asterisks **), brackets, or any markdown links. Use clean bullet points using hyphens (-) and write normal web URLs directly if needed (e.g. https://github.com/TheAryan-007).
3. Do not invent any projects, grades, or personal history. Stick strictly to the KNOWLEDGE_BASE.
4. Keep replies relatively concise so they fit well inside a compact portfolio chat widget.
`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: contents,
        systemInstruction: {
          parts: [{ text: systemInstructionText }]
        },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API HTTP error:", response.status, errText);
      // Fallback to local response on API failure
      return NextResponse.json({
        reply: getLocalResponse(message) + "\n\n*(Note: Gemini API returned an error, falling back to local database mode)*",
        isSimulated: true
      });
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!replyText) {
      return NextResponse.json({
        reply: getLocalResponse(message) + "\n\n*(Note: Received empty response from API, falling back to local database)*",
        isSimulated: true
      });
    }

    return NextResponse.json({
      reply: replyText,
      isSimulated: false
    });

  } catch (error) {
    console.error("Error in chat API route:", error);
    return NextResponse.json({
      reply: "Scanning systems... I encountered a grid failure processing that query. Please try again. (Saved to universe core local logs)",
      isSimulated: true
    });
  }
}

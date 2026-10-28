import { ChatMessage, Task, CampusEvent } from '../types';

export const initialChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    role: 'assistant',
    content: `Hello Aarav! 👋 I'm **CampusMate AI**, your personal academic companion. 

I constantly monitor your deadlines, course syllabi, campus calendar, and study habits.

Here is a quick snapshot of your day:
- 🔴 **Highest Priority**: *Engineering Mechanics Problem Set* is due tomorrow.
- 🟡 **Up Next**: *Data Structures Lab* in 3 days.
- 🚀 **Campus Buzz**: *PromptWars × KickToTech 2026 Hackathon* begins tomorrow!

How can I help you excel today? You can tap one of the suggested prompts below or ask me anything!`,
    timestamp: '1:45 PM',
    suggestedActions: [
      { label: 'Start Mechanics Task (45m)', actionType: 'start_pomodoro', payload: { taskId: 'task-1' } },
      { label: 'Create 5-Day Exam Plan', actionType: 'send_prompt', payload: { prompt: 'I have an exam in 5 days' } },
    ],
  },
];

export async function generateAiResponse(
  userQuery: string,
  tasks: Task[],
  events: CampusEvent[],
  apiKey?: string
): Promise<{ content: string; suggestedActions?: any[] }> {
  // If user provided a real Gemini API Key, attempt to fetch live response:
  if (apiKey && apiKey.trim().length > 10) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `You are CampusMate AI, an intelligent, encouraging, highly structured academic companion for college students.
Current student context:
Name: Aarav Sharma (CS & AI, Year 3).
Tasks: ${JSON.stringify(tasks.map((t) => ({ title: t.title, subject: t.subject, dueDate: t.dueDate, priority: t.priority, progress: t.progress })))}
Upcoming Events: ${JSON.stringify(events.map((e) => ({ title: e.title, date: e.date, venue: e.venue })))}

Student Question: "${userQuery}"

Provide a concise, highly practical, formatted Markdown response with actionable study advice, time blocks, or campus tips. Keep tone professional yet friendly.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return { content: text };
        }
      }
    } catch (err) {
      console.warn('Live Gemini API call failed, falling back to simulated intelligence engine:', err);
    }
  }

  // Built-in intelligent simulated response engine:
  const query = userQuery.toLowerCase();

  // 1. "Create a study plan for my exams" / "I have an exam in 5 days"
  if (query.includes('study plan') || query.includes('exam in 5 days') || query.includes('exam plan')) {
    return {
      content: `### 🎯 Custom 5-Day Rapid Mastery Exam Plan

Based on your current subjects (**Engineering Mechanics**, **Data Structures**, and **Applied Mathematics**), here is an optimized spaced-repetition revision blueprint:

| Day | Focus Subject | Deep Work Block (50m + 10m) | Active Recall Milestone |
| :--- | :--- | :--- | :--- |
| **Day 1 (Today)** | Engineering Mechanics | Method of Joints & Truss Equilibrium | Solve 5 past exam problems without notes |
| **Day 2** | Data Structures | Red-Black Tree rotation rules & BST properties | Code 2 balancing cases from scratch |
| **Day 3** | Applied Mathematics | Bayes Theorem & Discrete Probability laws | 10 timed practice questions |
| **Day 4** | Mixed Review | High-yield formula flashcards & weak areas | 2-hour simulated mock paper |
| **Day 5** | Final Polish | Light review + sleep optimization | Summary sheet read-through |

💡 **Pro-Tip from CampusMate AI**:
*Your energy peaks between 10:00 AM and 1:00 PM. Schedule your hardest calculations (Mechanics & Algorithms) in this window.*`,
      suggestedActions: [
        { label: 'Add Day 1 Session to Pomodoro', actionType: 'start_pomodoro', payload: { subject: 'Engineering Mechanics', minutes: 50 } },
        { label: 'View Assignments', actionType: 'navigate', payload: { page: 'assignments' } },
      ],
    };
  }

  // 2. "What should I study today?"
  if (query.includes('what should i study today') || query.includes('what to study') || query.includes('study today')) {
    return {
      content: `### ⚡ Your Optimized Study Agenda for Today

Analyzing your deadlines and current completion percentages:

1. **Top Priority (Immediate Action)**:
   - **Engineering Mechanics (ME201)**: Assignment is due **tomorrow at 11:59 PM** and is currently at **0% progress**.
   - ⏱️ *Recommended Duration*: 45 minutes
   - 📌 *Target*: Complete problems 1 through 3 using the Method of Joints.

2. **Secondary Priority (Evening Sprint)**:
   - **Data Structures (CS204)**: Red-Black Tree Implementation (45% done).
   - ⏱️ *Recommended Duration*: 30 minutes
   - 📌 *Target*: Complete the test suite for insertions.

3. **Hackathon Prep**:
   - Don't forget that **PromptWars × KickToTech 2026** begins tomorrow. Keep evening hours light to stay well-rested!

Shall I launch a 45-minute focus session for Engineering Mechanics right now?`,
      suggestedActions: [
        { label: 'Start 45m Pomodoro for Mechanics', actionType: 'start_pomodoro', payload: { taskId: 'task-1' } },
        { label: 'Mark 1 Subtask Completed', actionType: 'complete_subtask', payload: { taskId: 'task-1', subtaskId: 'st-1' } },
      ],
    };
  }

  // 3. "Help me prioritize my assignments"
  if (query.includes('prioritize') || query.includes('priority') || query.includes('matrix')) {
    return {
      content: `### 📊 Eisenhower Prioritization Analysis

Here is how your current workload maps out based on urgency and academic impact:

#### 🚨 1. Urgent & Important (Do First Today)
- **Engineering Mechanics Problem Set**
  - *Due Date*: Tomorrow, 11:59 PM
  - *Weight*: 15% Internal Assessment
  - *Action*: Allocate 45 minutes immediately.

#### 📈 2. Important, Not Immediate (Schedule Next)
- **Data Structures Red-Black Tree**
  - *Due Date*: In 3 days (45% completed)
  - *Action*: Schedule 90-minute block for tomorrow afternoon.
- **Machine Learning CIFAR-10 Project**
  - *Due Date*: In 5 days (20% completed)
  - *Action*: Start model training runs before Thursday.

#### 💡 3. Quick Wins (Low cognitive friction)
- **Math Quiz Formulas**: 15 minutes of flashcard review during commute.

Would you like me to auto-sort your Assignments board by this priority order?`,
      suggestedActions: [
        { label: 'View Sorted Assignments', actionType: 'navigate', payload: { page: 'assignments' } },
      ],
    };
  }

  // 4. "Find upcoming campus events"
  if (query.includes('campus event') || query.includes('events') || query.includes('hackathon') || query.includes('workshop')) {
    return {
      content: `### 🎪 Upcoming Highlights on Campus This Week

Here are the top curated events matching your profile:

1. 🏆 **PromptWars × KickToTech 2026 Hackathon** *(Featured)*
   - **When**: Oct 29 - Oct 30 (Starts Tomorrow!)
   - **Where**: Main Innovation Hub & Auditorium
   - **Track**: Education & Student Life
   - **Status**: You are RSVP'd! ✅

2. 🤖 **Hands-on Generative AI with Google Cloud & Gemini**
   - **When**: Tomorrow, 3:30 PM - 5:30 PM
   - **Where**: Computer Science Lab 4
   - **Highlights**: Vertex AI, Gemini 1.5/2.0 API, free cloud credits & swag.

3. 💼 **Pre-Placement Mock Interviews with Alumni**
   - **When**: Nov 05, 11:00 AM
   - **Where**: T&P Seminar Hall 2
   - **Opportunity**: 1-on-1 coding & resume reviews.

Would you like to RSVP for the Gemini Workshop or set a calendar reminder for the Hackathon?`,
      suggestedActions: [
        { label: 'Explore All Campus Events', actionType: 'navigate', payload: { page: 'events' } },
        { label: 'RSVP to Gemini Workshop', actionType: 'rsvp_event_action', payload: { eventId: 'event-2' } },
      ],
    };
  }

  // 5. Default intelligent response
  return {
    content: `I've analyzed your academic schedule and tasks for "${userQuery}".

Here's my strategic recommendation:
- **Immediate Next Step**: Dedicate **25–45 minutes** of uninterrupted focus on your most pressing academic deliverable (**Engineering Mechanics Assignment** due tomorrow).
- **Study Technique**: Utilize the **Feynman Technique** or the **Pomodoro 25/5 rhythm** to maximize knowledge retention and minimize mental fatigue.
- **Resource Alert**: The Central Library has extended 24/7 access during hackathon week if you need a distraction-free environment.

Feel free to ask me to draft a breakdown of any topic, summarize study notes, or balance your extracurricular commitments!`,
    suggestedActions: [
      { label: 'Launch Focus Timer', actionType: 'start_pomodoro', payload: { minutes: 25 } },
      { label: 'Ask "What should I study today?"', actionType: 'send_prompt', payload: { prompt: 'What should I study today?' } },
    ],
  };
}

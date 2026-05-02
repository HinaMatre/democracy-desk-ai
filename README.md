# Democracy Desk AI 🗳️

## Vertical: Civic Tech / Education
**Democracy Desk AI** is a civic technology application focused on empowering voters with AI-driven guidance. It demystifies the complex election process, helping both first-time and experienced voters confidently navigate registration, polling dates, and general civic education.

## Approach
This project was built using an **Agentic AI workflow** with Antigravity and powered by the **Gemini API** for real-time, intelligent, and highly contextual responses.

## Core Logic & Features

### Age-based Branching & Context Awareness
Our AI Assistant intelligently adapts its tone and educational focus based on user context:
- **Under 18 Users**: The assistant gracefully pivots conversations from immediate voting instructions to pre-registration processes and foundational civic education.
- **Experienced Voters**: The assistant uses professional, data-driven language to deliver concise, advanced insights without basic overviews.
- **New Voters**: The assistant employs highly encouraging, jargon-free explanations to ensure a welcoming learning experience.

### Mock Data Fetching for Reliability
To guarantee the app is functional, lightning-fast, and independent of live API fluctuations during the demo, we utilize `data/election_mock_data.json`. This ensures immediate, reliable retrieval of crucial election dates (Registration Deadline, Polling Day, Results Day) using direct backend intent matching.

## Google Services Integration
- **Google Calendar**: The UI features a "Set Reminder" button that dynamically generates a pre-filled Google Calendar event using the mock polling date, allowing users to add the election to their schedule with a single click.
- **Google Maps**: We've integrated a robust "Find My Booth" feature. It links users directly to a customized Google Maps search for nearby polling locations, ensuring real-world utility and a flawless demo experience.

## Security
We maintain strict security and maintainability standards:
- Utilizes a `.env` file to securely manage sensitive credentials like `GEMINI_API_KEY` and `GOOGLE_MAPS_API_KEY`.
- Includes a `.gitignore` to prevent accidental commits of environment files and massive dependency folders (`node_modules`).
- A provided `.env.example` file serves as a secure, blank template for judges and reviewers to easily set up the application without exposing our private keys.

## Accessibility & UI Polish
- **Semantic Structure**: Built using Semantic HTML5 to provide a logical document structure.
- **High-Contrast Theme**: Features a vibrant, high-contrast **Royal Purple** and **Sunrise Orange** color palette. This not only looks incredibly modern but also enhances readability.
- **Responsive Layout**: Designed to adapt fluidly from desktop sidebars to sleek, app-like mobile bottom-navigation bars.

---

## Setup Instructions

To run Democracy Desk AI locally for judging or development, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/HinaMatre/democracy-desk-ai.git
   cd democracy-desk-ai
   ```

2. **Install dependencies:**
   Ensure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   - Copy the provided security template to create your own active environment file:
     ```bash
     cp .env.example .env
     ```
   - Open the new `.env` file and insert your actual API keys:
     ```env
     GEMINI_API_KEY=your_actual_gemini_key
     GOOGLE_MAPS_API_KEY=your_actual_maps_key
     PORT=3000
     ```

4. **Start the server:**
   ```bash
   node index.js
   ```

5. **View the application:**
   Open your preferred web browser and navigate to [http://localhost:3000](http://localhost:3000)

---
*Built to empower every vote.*

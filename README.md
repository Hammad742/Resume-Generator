# Resume Generator & ATS Analyzer

A powerful, modern web application designed to help job seekers create professional, high-impact resumes with AI-driven ATS optimization.

## 🔗 Live Demo
Try the live app here: **[hammad-resume-generator.vercel.app](https://hammad-resume-generator.vercel.app/)**

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)
![Gemini](https://img.shields.io/badge/AI-Gemini%202.5-orange)

## 🚀 Key Features

- **Four Professional Templates**: Choose between Modern, Minimal, Fresher, and Compact layouts tailored for different career stages.
- **AI-Powered ATS Analyzer**: Integrated with Google Gemini AI to analyze your resume against industry standards, providing scores and actionable feedback.
- **Smart Photo Cropping**: Professional image handling with built-in cropping and positioning tools.
- **One-Click PDF Export**: High-fidelity A4 PDF generation using `html2pdf.js` with optimized pagination.
- **Real-time Preview**: See your changes instantly as you type.
- **Local Persistence**: Your data is saved locally in your browser, so you never lose your progress.
- **Fully Responsive**: Seamless experience across mobile, tablet, and desktop devices.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 8
- **Styling**: Vanilla CSS3 (Custom Design System)
- **Icons**: Lucide React
- **AI Integration**: Google Gemini 2.5 Flash API
- **PDF Generation**: html2pdf.js, html2canvas, jsPDF

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/resume-generator.git
   cd resume-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add your Gemini API key (get one [here](https://aistudio.google.com/app/apikey)):
     ```env
     VITE_GEMINI_API_KEY=your_actual_api_key_here
     ```

## 🚀 Running the App

### Development Mode
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

### Production Build
```bash
npm run build
```
The production-ready files will be in the `dist` folder.

### Preview Production Build
```bash
npm run preview
```

## ☁️ Deployment (Vercel)

1. Push your code to GitHub.
2. Connect your repository to [Vercel](https://vercel.com).
3. In the Vercel project settings, add the following Environment Variable:
   - Key: `VITE_GEMINI_API_KEY`
   - Value: `your_gemini_api_key`
4. Deploy!

## 🧠 How the ATS Analyzer Works

The analyzer uses a hybrid engine:
1. **Rule-Based Check**: Evaluates section completeness, contact info validity, and formatting.
2. **AI Analysis**: Uses Google Gemini 2.5 Flash to evaluate qualitative aspects, keyword density, and provide recruiter-style feedback.
3. **Non-Destructive**: The analyzer only suggests improvements and never modifies your original data.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---
Built with ❤️ for career growth.

import React, { useState, useEffect, useCallback, useRef, type RefObject } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import * as blazeface from '@tensorflow-models/blazeface';
import toast, { Toaster } from 'react-hot-toast';

// --- 1. INTERFACE DEFINITIONS ---

interface Question {
    id: number;
    text: string;
    options: { id: string; text: string }[];
    answer: string | null;
}

interface Violation {
    type: string;
    message: string;
    timestamp: string;
}

// Define the type for the BlazeFace model once loaded
type BlazeFaceModel = blazeface.BlazeFaceModel;

// Define the type for the Webcam Ref
type WebcamRef = RefObject<Webcam>;

// --- MOCK EXAM DATA ---
const EXAM_QUESTIONS: Question[] = [
    { id: 1, text: 'Which React Hook is used for side effects?', options: [{ id: 'a', text: 'useState' }, { id: 'b', text: 'useEffect' }, { id: 'c', text: 'useContext' }, { id: 'd', text: 'useReducer' }], answer: null },
    { id: 2, text: 'What is the primary method for component-local state?', options: [{ id: 'a', text: 'Props' }, { id: 'b', text: 'useState' }, { id: 'c', text: 'Redux' }, { id: 'd', text: 'DOM' }], answer: null },
    { id: 3, text: 'JSX stands for?', options: [{ id: 'a', text: 'JavaScript XML' }, { id: 'b', text: 'Java Syntax X' }, { id: 'c', text: 'JSON X' }, { id: 'd', text: 'JS Extension' }], answer: null },
    { id: 4, text: 'Which method is used to update the state in React?', options: [{ id: 'a', text: 'setState()' }, { id: 'b', text: 'changeState()' }, { id: 'c', text: 'modifyState()' }, { id: 'd', text: 'update()' }], answer: null },
    { id: 5, text: 'How do you create a function component?', options: [{ id: 'a', text: 'class Component' }, { id: 'b', text: 'const MyComp = () => {}' }, { id: 'c', text: 'function: MyComp' }, { id: 'd', text: 'useFunction()' }], answer: null },
    { id: 6, text: 'What is a "prop"?', options: [{ id: 'a', text: 'Local State' }, { id: 'b', text: 'Method for effects' }, { id: 'c', text: 'Component arguments' }, { id: 'd', text: 'A database' }], answer: null },
    { id: 7, text: 'What tool is commonly used to bundle React apps?', options: [{ id: 'a', text: 'npm' }, { id: 'b', text: 'Webpack' }, { id: 'c', text: 'Babel' }, { id: 'd', text: 'Jest' }], answer: null },
    { id: 8, text: 'What is the purpose of the `key` prop when rendering lists?', options: [{ id: 'a', text: 'Styling' }, { id: 'b', text: 'Optimization/Identity' }, { id: 'c', text: 'Accessibility' }, { id: 'd', text: 'Security' }], answer: null },
    { id: 9, text: 'Which hook replaces lifecycle methods like `componentDidMount`?', options: [{ id: 'a', text: 'useState' }, { id: 'b', text: 'useMemo' }, { id: 'c', text: 'useEffect' }, { id: 'd', text: 'useCallback' }], answer: null },
    { id: 10, text: 'React elements are:', options: [{ id: 'a', text: 'Objects' }, { id: 'b', text: 'HTML tags' }, { id: 'c', text: 'Functions' }, { id: 'd', text: 'Strings' }], answer: null },
];
const MAX_WARNINGS = 3;

// Define the type for the violation logger function
type LogViolation = (type: string, message: string) => void;

// --- CUSTOM HOOK: TIMER ---
const EXAM_DURATION_SECONDS = 45 * 60; // 45 minutes

function useTimer(isSubmitted: boolean, handleSubmit: () => void) {
    // Initialize timer state with the total duration in seconds
    const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_SECONDS);

    useEffect(() => {
        // Stop the timer if the exam is submitted or time has run out
        if (isSubmitted || timeLeft <= 0) {
            if (timeLeft <= 0 && !isSubmitted) {
                // Auto-submit when time reaches zero
                handleSubmit();
                toast.success("Time's Up! Exam automatically submitted.", { duration: 5000 });
            }
            return;
        }

        const interval = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isSubmitted, timeLeft, handleSubmit]);

    // Format seconds into MM:SS string
    const formatTime = (totalSeconds: number): string => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return formatTime(timeLeft);
}
// --- END CUSTOM HOOK: TIMER ---


// --- NEW FACE DETECTOR COMPONENT ---
// This component remains unchanged from the previous step
const FaceDetector: React.FC<{ webcamRef: WebcamRef, logViolation: LogViolation }> = ({ webcamRef, logViolation }) => {
    // Correctly type the state for the model
    const [model, setModel] = useState<BlazeFaceModel | null>(null);
    const [status, setStatus] = useState<string>('Loading AI Model...');
    const [faceCount, setFaceCount] = useState<number>(0);

    // 1. Load the BlazeFace Model
    useEffect(() => {
        const loadModel = async () => {
            await tf.setBackend('webgl');
            const loadedModel = await blazeface.load();
            // Set the model with the correct type
            setModel(loadedModel);
            setStatus('Face Detection Active.');
        };
        loadModel();
    }, []);

    // 2. Continuous Detection Loop
    const detectFaces = useCallback(async () => {
        // Access video element via current.video
        const video = webcamRef.current?.video;

        if (video && video.readyState === 4 && model) {
            const predictions = await model.estimateFaces(video, false);

            setFaceCount(predictions.length);

            // --- Detection Logic with Toast Alerts ---
            if (predictions.length === 0) {
                logViolation('Face Missing', 'Student face not detected in the frame.');
                toast.error("🔴 Face Not Visible! Keep your face centered.", { id: 'face-alert', duration: 1000 });
            } else if (predictions.length > 1) {
                logViolation('Multiple Faces', `Detected ${predictions.length} faces (Max 1 allowed).`);
                toast.error("🚨 Multiple Faces Detected! This is a violation.", { id: 'face-alert', duration: 3000 });
            }
        }
    }, [model, webcamRef, logViolation]);

    // Set up the detection interval (e.g., every 500ms)
    useEffect(() => {
        // Use native browser 'number' type for interval ID
        let interval: number | undefined; 
        if (model) {
            interval = setInterval(() => {
                detectFaces();
            }, 500);
        }
        // The cleanup function uses clearInterval which accepts a number
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [model, detectFaces]);

    return (
        <div className="text-center mt-3 text-xs">
            <p className={`font-semibold ${status.includes('Active') ? 'text-green-600' : 'text-yellow-600'}`}>
                {status}
            </p>
            <p className="text-xs text-gray-500 mt-1">
                Detected Faces: **{faceCount}**
            </p>
        </div>
    );
};
// --- END FACE DETECTOR COMPONENT ---


function ExamScreen() {
    // --- EXAM STATE ---
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [questions, setQuestions] = useState<Question[]>(EXAM_QUESTIONS);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    // --- PROCTORING STATE ---
    const [violations, setViolations] = useState<Violation[]>([]);
    const [warningCount, setWarningCount] = useState<number>(0);
    const webcamRef = useRef<Webcam>(null);

    const [studentInfo] = useState({
        name: 'Student Name',
        hallTicket: 'HT123456',
        totalQuestions: EXAM_QUESTIONS.length,
    });
    const currentQuestion = questions[currentQuestionIndex];

    // --- EXAM HANDLERS ---
    const handleSubmit = useCallback(() => {
        if (!isSubmitted) { // Prevent double submission
            setIsSubmitted(true);
            toast.success("Exam Submitted!", { duration: 3000 });
        }
    }, [isSubmitted]);

    // --- TIMER INTEGRATION ---
    const formattedTimeLeft = useTimer(isSubmitted, handleSubmit);


    // --- PROCTORING VIOLATION HANDLER ---
    const logViolation: LogViolation = useCallback((type, message) => {
        if (isSubmitted || warningCount >= MAX_WARNINGS) return;

        const timestamp = new Date().toLocaleTimeString();
        const newViolation: Violation = { type, message, timestamp };

        console.warn('PROCTORING VIOLATION:', newViolation);
        setViolations((prev: Violation[]) => [...prev, newViolation]);

        if (type !== 'Full-Screen Exit Attempt') {
            setWarningCount(prev => {
                const newCount = prev + 1;
                if (newCount >= MAX_WARNINGS) {
                    alert(`🚨 WARNING: Exam terminated due to exceeding ${MAX_WARNINGS} violations!`);
                    handleSubmit(); // Use the memoized handleSubmit
                    toast.error("🚨 EXAM TERMINATED due to too many violations!", { duration: 5000 });
                } else {
                    if (type !== 'Face Missing' && type !== 'Multiple Faces') {
                         toast.error(`Violation: ${message}`, { duration: 2000 });
                    }
                }
                return newCount;
            });
        } else {
            toast('Fullscreen mode required!', { icon: '⚠️' });
        }
    }, [isSubmitted, warningCount, handleSubmit]);


    // --- FRONTEND DETECTION EFFECTS (Only Fullscreen Remains) ---
    useEffect(() => {
        // Only managing Fullscreen logic now
        document.documentElement.requestFullscreen().catch(e => console.error("Could not enter fullscreen on load:", e));
        
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                logViolation('Full-Screen Exit Attempt', 'Exited full-screen mode.');
                // Attempt to re-enter fullscreen
                setTimeout(() => {
                    document.documentElement.requestFullscreen().catch(e => console.error("Could not re-enter fullscreen:", e));
                }, 100);
            }
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, [logViolation]);


    // --- EXAM NAVIGATION HANDLERS ---
    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedAnswer = event.target.value;
        const newQuestions = questions.map((q, index) => {
            if (index === currentQuestionIndex) {
                // Prevent changes if submitted
                if (isSubmitted) return q; 
                return { ...q, answer: selectedAnswer };
            }
            return q;
        });
        setQuestions(newQuestions);
    };

    const handleNext = () => {
        // Only allow navigation forward if not submitted
        if (!isSubmitted && currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };
    
    // NOTE: handleBack is kept for function continuity but is disabled in the UI (cannot go back)
    // const handleBack = () => {
    //     if (currentQuestionIndex > 0) {
    //         setCurrentQuestionIndex(prev => prev - 1);
    //     }
    // };


    // --- RENDER SUCCESS SCREEN (Unchanged) ---
    if (isSubmitted) {
        const attemptedQuestions = questions.filter(q => q.answer !== null).length;
        const unattemptedQuestions = questions.length - attemptedQuestions;

        return (
            <div className="flex flex-col items-center justify-center h-screen w-screen bg-green-50 font-sans">
                <div className="p-10 bg-white shadow-xl rounded-xl text-center border-t-8 border-green-500">
                    <h1 className="text-4xl font-extrabold text-green-600 mb-4">
                        ✅ Exam Submitted Successfully!
                    </h1>
                    <p className="text-xl text-gray-700 mb-6">
                        Thank you, **{studentInfo.name}** ({studentInfo.hallTicket}).
                    </p>
                    <div className="flex justify-center space-x-8 text-left">
                        <p className="text-lg">
                            **Total Questions:** <span className="font-bold text-blue-600">{studentInfo.totalQuestions}</span>
                        </p>
                        <p className="text-lg">
                            **Attempted:** <span className="font-bold text-green-600">{attemptedQuestions}</span>
                        </p>
                        <p className="text-lg">
                            **Unattempted:** <span className="font-bold text-red-600">{unattemptedQuestions}</span>
                        </p>
                    </div>
                </div>
                <Toaster />
            </div>
        );
    }


    return (
        <div className="flex h-screen w-screen bg-gray-50 font-sans">
            <Toaster />

            {/* LEFT SIDE PANEL */}
            <div className="w-80 bg-gray-100 p-6 border-r border-gray-300 flex flex-col space-y-4">

                {/* Student Details Card */}
                <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Student Details</h3>
                    <p className="text-sm"><strong className="font-medium">Name:</strong> {studentInfo.name}</p>
                    <p className="text-sm"><strong className="font-medium">Hall Ticket:</strong> {studentInfo.hallTicket}</p>
                </div>

                {/* LIVE VIDEO FEED & FACE DETECTOR */}
                <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200 flex flex-col items-center">
                    <h4 className="text-base font-medium text-red-600 mb-3">Live Proctoring Video</h4>

                    {/* Webcam Feed */}
                    <div className="relative">
                        <Webcam
                            ref={webcamRef}
                            audio={false}
                            height={200}
                            width={280}
                            screenshotFormat="image/jpeg"
                            videoConstraints={{ facingMode: "user" }}
                            className="rounded-md border-2 border-red-500"
                        />
                        <canvas className="absolute top-0 left-0 w-full h-full" />
                    </div>

                    <FaceDetector webcamRef={webcamRef as WebcamRef} logViolation={logViolation} />

                    <div className="mt-3 text-xs text-red-500 font-medium">DO NOT EXIT THE FRAME</div>
                </div>

                {/* WARNINGS PANEL */}
                <div className="p-3 bg-red-100 border border-red-500 rounded-lg shadow-inner">
                    <h4 className="text-sm font-bold text-red-700 mb-1 flex items-center">
                        ⚠️ Proctoring Status
                    </h4>
                    <p className="text-xs text-red-600 font-semibold">
                        Violations: **{warningCount} / {MAX_WARNINGS}**
                    </p>
                    {violations.slice(-3).map((v, index) => (
                        <p key={index} className="text-xs text-red-500 mt-1 truncate">
                            [{v.timestamp}] **{v.type}**
                        </p>
                    ))}
                    {warningCount >= MAX_WARNINGS && (
                        <p className="text-sm font-bold text-red-800 mt-2">
                            EXAM TERMINATED!
                        </p>
                    )}
                </div>

                {/* Question Navigation Map */}
                <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
                    <h4 className="text-base font-medium text-gray-800 mb-2">Question Palette</h4>
                    <div className="grid grid-cols-5 gap-2">
                        {questions.map((q, index) => (
                            <button
                                key={q.id}
                                onClick={() => {
                                    // Allow jumping to *attempted* questions, but restrict jumping to previous questions if the rule is strictly "forward only"
                                    // For simplicity and to satisfy "not back option", we only allow jumping forward or staying on current/answered
                                    if (index >= currentQuestionIndex || q.answer !== null) {
                                         setCurrentQuestionIndex(index);
                                    } else {
                                        toast.error("Navigation back to unattempted questions is disabled.", { duration: 1500 });
                                    }
                                }}
                                className={`p-1 text-sm font-semibold rounded ${index === currentQuestionIndex
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : q.answer !== null
                                            ? 'bg-green-300 hover:bg-green-400'
                                            // Disable clicking previous unattempted questions
                                            : (index < currentQuestionIndex ? 'bg-red-200 text-gray-500 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400')
                                    }`}
                                disabled={index < currentQuestionIndex && q.answer === null}
                            >
                                {q.id}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Exam Controls/Timer */}
                <div className="mt-auto p-4 bg-white shadow-md rounded-lg border border-gray-200 text-center">
                    <p className="text-xl font-bold text-blue-700">Time Left: {formattedTimeLeft}</p>
                    <button onClick={() => window.confirm("Are you sure you want to submit the exam?") && handleSubmit()} 
                            className="mt-4 w-full py-3 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition duration-150">
                        FINISH & SUBMIT
                    </button>
                </div>
            </div>

            {/* MAIN CONTENT AREA: Questions */}
            <div className="flex-1 p-8 overflow-y-auto">
                <div className="question-area mb-8">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">
                        Question **{currentQuestion.id}** of **{studentInfo.totalQuestions}**
                    </h2>
                    <p className="text-xl font-medium p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-md shadow-sm">
                        **{currentQuestion.text}**
                    </p>
                </div>

                {/* MULTIPLE CHOICE ANSWERS */}
                <div className="answers-area space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Choose the Correct Answer:</h3>
                    {currentQuestion.options.map((option) => (
                        <div key={option.id}
                            onClick={() => !isSubmitted && handleAnswerChange({ target: { value: option.id } } as React.ChangeEvent<HTMLInputElement>)}
                            className={`answer-option flex items-center p-4 bg-white border rounded-lg shadow-sm transition duration-150 
                                ${isSubmitted ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}
                                ${currentQuestion.answer === option.id ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500' : 'border-gray-200 hover:bg-blue-50'}`}>

                            <input
                                type="radio"
                                id={`option-${option.id}`}
                                name={`question-${currentQuestion.id}`}
                                value={option.id}
                                checked={currentQuestion.answer === option.id}
                                onChange={handleAnswerChange}
                                disabled={isSubmitted}
                                className="mr-4 h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <label htmlFor={`option-${option.id}`} className="text-base font-medium text-gray-700 flex-1 cursor-pointer">
                                <span className="font-bold uppercase mr-2">{option.id}.</span> {option.text}
                            </label>
                        </div>
                    ))}
                </div>

                {/* NAVIGATION BUTTONS */}
                <div className="mt-10 flex justify-between">
                    {/* BACK BUTTON REMOVED / DISABLED */}
                    <button
                        // Use a dummy button or remove entirely to enforce "no back"
                        onClick={() => toast.error("Going back to previous questions is disabled.", { duration: 1500 })}
                        disabled
                        className={`px-6 py-3 font-semibold rounded-lg shadow-md transition duration-150 bg-gray-300 text-gray-500 cursor-not-allowed`}
                    >
                        &larr; **Back (Disabled)**
                    </button>

                    <button
                        onClick={currentQuestionIndex === questions.length - 1 ? () => window.confirm("Final submission?") && handleSubmit() : handleNext}
                        disabled={isSubmitted}
                        className={`px-6 py-3 font-semibold rounded-lg shadow-md transition duration-150 ${isSubmitted ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
                    >
                        {currentQuestionIndex === questions.length - 1 ? '**Finish Exam**' : '**Save & Next Question** \u2192'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ExamScreen;
import React, { useState, useEffect } from 'react';
import LastPage from '../lastPage/LastPage';
import { useNavigate } from 'react-router-dom';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Form = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isSurveyComplete, setIsSurveyComplete] = useState(false);
     const navigate = useNavigate();

    useEffect(() => {
        const loadQuestions = () => {
            const questionList = [
                { id: 1, text: 'How satisfied are you with our products?', type: 'rating', maxRating: 5 },
                { id: 2, text: 'How fair are the prices compared to similar retailers?', type: 'rating', maxRating: 5 },
                { id: 3, text: 'How satisfied are you with the value for money of your purchase?', type: 'rating', maxRating: 5 },
                { id: 4, text: 'On a scale of 1-10, how would you recommend us to your friends and family?', type: 'rating', maxRating: 10 },
                { id: 5, text: 'What could we do to improve our service?', type: 'text' }
            ];
            setQuestions(questionList);
        };
        loadQuestions();
    }, []);

    const handleAnswer = (answer) => {
        const updatedAnswers = { ...answers, [questions[currentQuestionIndex].id]: answer };
        setAnswers(updatedAnswers);
        localStorage.setItem('answers', JSON.stringify(updatedAnswers));
    };
    // const notify = () => toast("Wow so easy!");
    const notify = (msg) =>  toast.warn(msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
        });
        const success = (msg) =>  toast.success(msg, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
            });
    const handleNext = () => {
        const currentQuestion = questions[currentQuestionIndex];
        const answerProvided = answers[currentQuestion.id] !== undefined && answers[currentQuestion.id] !== '';
        if (currentQuestion.type === 'rating' && !answerProvided) {
            notify('Please rate the Question');
            return;
            
        }

        if (currentQuestion.type === 'text' && !answerProvided) {
            notify('Please rate the Question');
            return;
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            const confirmSubmit = window.confirm('Are You Ready To Submit The Survery?');
            if (confirmSubmit) {
                submitSurvey();
                success('Congratulations! survey is done');
            }
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSkip = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            const confirmSubmit = window.confirm('Do you want to submit the survey?');
            if (confirmSubmit) {
                submitSurvey();
            }
        }
    };

    const submitSurvey = () => {
        localStorage.setItem('surveyStatus', 'COMPLETED');
        setIsSurveyComplete(true);

        setTimeout(() => {
            setIsSurveyComplete(false);
            setCurrentQuestionIndex(0);
            setAnswers({});
            navigate('/');
            localStorage.removeItem('answers');
        }, 5000);
    };

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    if (isSurveyComplete) {
        return <LastPage />;
    }

    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <div className="h-strech w-screen bg-[url('https://wallpaperaccess.com/full/1284635.jpg')]">
            <div className='flex justify-center items-center pt-12 md:pt-20'>
                <div className="p-4 md:w-3/4 lg:w-1/2 xl:w-1/3">
                

                    {/* Question Section */}
                    <div className='bg-white opacity-75 rounded-xl px-28 py-28 flex-col-1 justify-center items-center  '>
                    <h2 className="text-lg  md:text-2xl font-bold pb-5 ">{`Question ${currentQuestionIndex + 1}`}</h2>
                    <h3 className="text-md subpixel-antialiased tracking-wide italic md:text-lg mb-4">{questions[currentQuestionIndex].text}</h3>

                    {questions[currentQuestionIndex].type === 'rating' && (
                        <div className="flex flex-col gap-1 md:gap-2 pt-4">
                            {[...Array(questions[currentQuestionIndex].maxRating).keys()].map(rating => (
                            <button
                            key={rating + 1}
                            onClick={() => handleAnswer(rating + 1)}
                            className={`w-11 px-1 py-1 text-sm rounded-full ${answers[questions[currentQuestionIndex].id] === rating + 1 ? 'bg-[#f1a382] text-white' : 'bg-[#fad3c2]'}`}
                            >
                            {rating + 1}
                            </button>
                            ))}
                        </div>

                    

                    )}

                    {questions[currentQuestionIndex].type === 'text' && (
                        <textarea
                            onBlur={(e) => handleAnswer(e.target.value)}
                            defaultValue={answers[questions[currentQuestionIndex].id] || ''}
                            className="w-full p-2 border border-gray-300 rounded-xl"
                            rows="4"
                        />
                    )}

                    { /* Navigation Buttons */}
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mt-4 pt-5">
                        <button
                            onClick={handlePrevious}
                            disabled={currentQuestionIndex === 0}
                            className="px-2 py-2 bg-[#eea687] rounded-full"
                            
                        >
                            <ArrowBackRoundedIcon/>
                            
                        </button>
                        <button
                            onClick={handleNext}
                            className="px-2 py-2 bg-[#eea687] rounded-full"
                        >
                            {currentQuestionIndex === questions.length - 1 ? 'Submit' : <ArrowForwardRoundedIcon/>}
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default Form;

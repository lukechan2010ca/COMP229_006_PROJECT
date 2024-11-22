import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionsByAdId, createQuestion, answerQuestion } from "../../datasource/api-question";
import { getToken } from "../auth/auth-helper";

const MessageBoard = () => {
    let { adId } = useParams();
    console.log("Ad ID:", adId);
    let [questions, setQuestions] = useState([]);
    let [isLoading, setIsLoading] = useState(true);
    let [newQuestion, setNewQuestion] = useState("");

    useEffect(() => {
        if (adId) {
            getQuestionsByAdId(adId)
                .then((data) => {
                    if (data) {
                        setQuestions(data);
                    }
                    setIsLoading(false);
                })
                .catch((err) => {
                    alert(err.message);
                    console.log(err);
                });
        }
    }, [adId]);

    const handleQuestionSubmit = (e) => {
        e.preventDefault();
        if (newQuestion.trim()) {
            console.log("Submitting Question with adId:", adId);
            
            createQuestion({ adId, questionText: newQuestion })
                .then((response) => {
                    if (response.success) {
                        alert("Question added successfully!");
                        setQuestions([...questions, { ...response.data, answerText: null }]);
                        setNewQuestion("");
                    }
                })
                .catch((err) => {
                    alert(err.message);
                    console.error(err);
                });
        }
    };
    

    const handleAnswerChange = (index, answer) => {
        let updatedQuestions = [...questions];
        updatedQuestions[index].answer = answer;
        setQuestions(updatedQuestions);
    };

    const handleAnswerSubmit = (e, questionId, index) => {
        e.preventDefault();
        const answerText = questions[index].answer;
        
        if (!getToken()) {
            alert("You need to be signed in to answer questions.");
            return;
        }

        answerQuestion(questionId, answerText)
            .then((response) => {
                if (response.success) {
                    alert("Answer submitted successfully!");
                    setQuestions(
                        questions.map((q, idx) =>
                            idx === index ? { ...q, answerText: answerText } : q
                        )
                    );
                }
            })
            .catch((err) => {
                alert(err.message);
                console.error(err);
            });
    };

    return (
        <div className="container" style={{ paddingTop: 80 }}>
            <h1>Message Board for Ad ID: {adId}</h1>

            <form onSubmit={handleQuestionSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="newQuestion">Ask a Question:</label>
                    <input
                        type="text"
                        id="newQuestion"
                        className="form-control"
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-2">Submit Question</button>
            </form>

            <h3 className="mt-4">Questions:</h3>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <ul>
                    {questions.length > 0 ? (
                        questions.map((q, index) => (
                            <li key={q._id} className="mb-3">
                                <strong>Q:</strong> {q.questionText}
                                {q.answerText ? (
                                    <p><strong>A:</strong> {q.answerText}</p>
                                ) : (
                                    <form onSubmit={(e) => handleAnswerSubmit(e, q._id, index)}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Write an answer"
                                            value={q.answer || ""}
                                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                                        />
                                        <button type="submit" className="btn btn-success mt-2">Submit Answer</button>
                                    </form>
                                )}
                            </li>
                        ))
                    ) : (
                        <p>No questions yet. Be the first to ask!</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default MessageBoard;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getQuestion } from '../../datasource/api-question.js';


// const MessageBoard = () => {
//     let { adId } = useParams(); // Extract adId from URL parameters
//     console.log('adId from useParams:', adId);
//     let [questions, setQuestions] = useState([]);
//     let [loading, setLoading] = useState(true);
//     let [newQuestion, setNewQuestion] = useState("");

//     useEffect(() => {
//         console.log('adId:', adId);
//         // Fetch questions for the given ad ID
//         getQuestion(adId).then((data) => {
//             if (data) {
//                 setQuestions(data);
//                 setLoading(false);
//             }
//         }).catch(err => {
//             alert(err.message);
//             console.error(err);
//         });
//     }, [adId]);

//     const handleQuestionSubmit = (e) => {
//         e.preventDefault();
//         if (newQuestion.trim()) {
//             // createQuestion(adId, newQuestion).then(response => {
//             //     if (response.success) {
//             //         alert('Question added successfully!');
//             //         setQuestions([...questions, { questionText: newQuestion, answerText: null }]);
//             //         setNewQuestion("");
//             //     }
//             // }).catch(err => {
//             //     alert(err.message);
//             //     console.error(err);
//             // });
//         }
//     };

//     const handleAnswerChange = (index, answer) => {
//         let updatedQuestions = [...questions];
//         updatedQuestions[index].answer = answer;
//         setQuestions(updatedQuestions);
//     };

//     const handleAnswerSubmit = (e, questionId) => {
//         e.preventDefault();
//         const answerText = questions.find(q => q._id === questionId).answer;

//         // Use the API method to answer the question
//         // answerQuestion(questionId, answerText).then(response => {
//         //     if (response.success) {
//         //         alert('Answer submitted successfully!');
//         //         // Update the state to reflect the answer
//         //         setQuestions(questions.map(q => q._id === questionId ? { ...q, answerText: answerText } : q));
//         //     }
//         // }).catch(err => {
//         //     alert(err.message);
//         //     console.error(err);
//         // });
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="container" style={{ paddingTop: 80 }}>
//             <h1>Message Board for Ad ID: {adId}</h1>

//             <form onSubmit={handleQuestionSubmit}>
//                 <div className="form-group">
//                     <label htmlFor="newQuestion">Ask a Question:</label>
//                     <input
//                         type="text"
//                         id="newQuestion"
//                         className="form-control"
//                         value={newQuestion}
//                         onChange={(e) => setNewQuestion(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary mt-2">Submit Question</button>
//             </form>

//             <h3 className="mt-4">Questions:</h3>
//             <ul>
//                 {questions.length > 0 ? (
//                     questions.map((q, index) => (
//                         <li key={index}>
//                             <strong>Q:</strong> {q.questionText}
//                             {q.answerText ? (
//                                 <p><strong>A:</strong> {q.answerText}</p>
//                             ) : (
//                                 <form onSubmit={(e) => handleAnswerSubmit(e, q._id)}>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         placeholder="Write an answer"
//                                         value={q.answer || ""}
//                                         onChange={(e) => handleAnswerChange(index, e.target.value)}
//                                     />
//                                     <button type="submit" className="btn btn-success mt-2">Submit Answer</button>
//                                 </form>
//                             )}
//                         </li>
//                     ))
//                 ) : (
//                     <p>No questions yet. Be the first to ask!</p>
//                 )}
//             </ul>
//         </div>
//     );
// };

// export default MessageBoard;
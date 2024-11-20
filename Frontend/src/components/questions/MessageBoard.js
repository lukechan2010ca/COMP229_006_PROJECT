import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestion } from '../../datasource/api-question.js';


const MessageBoard = () => {
    let { adId } = useParams(); // Extract adId from URL parameters
    let [questions, setQuestions] = useState([]);
    let [loading, setLoading] = useState(true);
    let [newQuestion, setNewQuestion] = useState("");

    useEffect(() => {
        // Fetch questions for the given ad ID
        getQuestion(adId).then((data) => {
            if (data) {
                setQuestions(data);
                setLoading(false);
            }
        }).catch(err => {
            alert(err.message);
            console.error(err);
        });
    }, [adId]);

    const handleQuestionSubmit = (e) => {
        e.preventDefault();
        if (newQuestion.trim()) {
            // createQuestion(adId, newQuestion).then(response => {
            //     if (response.success) {
            //         alert('Question added successfully!');
            //         setQuestions([...questions, { questionText: newQuestion, answerText: null }]);
            //         setNewQuestion("");
            //     }
            // }).catch(err => {
            //     alert(err.message);
            //     console.error(err);
            // });
        }
    };

    const handleAnswerChange = (index, answer) => {
        let updatedQuestions = [...questions];
        updatedQuestions[index].answer = answer;
        setQuestions(updatedQuestions);
    };

    const handleAnswerSubmit = (e, questionId) => {
        e.preventDefault();
        const answerText = questions.find(q => q._id === questionId).answer;

        // Use the API method to answer the question
        // answerQuestion(questionId, answerText).then(response => {
        //     if (response.success) {
        //         alert('Answer submitted successfully!');
        //         // Update the state to reflect the answer
        //         setQuestions(questions.map(q => q._id === questionId ? { ...q, answerText: answerText } : q));
        //     }
        // }).catch(err => {
        //     alert(err.message);
        //     console.error(err);
        // });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container" style={{ paddingTop: 80 }}>
            <h1>Message Board for Ad ID: {adId}</h1>

            <form onSubmit={handleQuestionSubmit}>
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
            <ul>
                {questions.length > 0 ? (
                    questions.map((q, index) => (
                        <li key={index}>
                            <strong>Q:</strong> {q.questionText}
                            {q.answerText ? (
                                <p><strong>A:</strong> {q.answerText}</p>
                            ) : (
                                <form onSubmit={(e) => handleAnswerSubmit(e, q._id)}>
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
        </div>
    );
};

export default MessageBoard;

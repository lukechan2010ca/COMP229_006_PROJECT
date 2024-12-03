import { useEffect, useState } from "react";//managing component lifecycle
import { useParams } from "react-router-dom";//extract URL parameters
import { getQuestionsByAdId, createQuestion, answerQuestion } from "../../datasource/api-question";
import { getToken } from "../auth/auth-helper";
import { read as getAdById } from "../../datasource/api-ad"; // Change this line to import 'read' as 'getAdById'

//define functional component
const MessageBoard = () => {
    let { adId } = useParams();
    console.log("Ad ID:", adId);
    let [questions, setQuestions] = useState([]);
    let [isLoading, setIsLoading] = useState(true);
    let [newQuestion, setNewQuestion] = useState("");
    let [adDetails, setAdDetails] = useState({});
    let [isAdLoading, setIsAdLoading] = useState(true);

    // Fetch ad details to show product details
    useEffect(() => {
        if (adId) {
            getAdById(adId)
                .then((data) => {
                    if (data) {
                        setAdDetails(data);
                    }
                    setIsAdLoading(false);
                })
                .catch((err) => {
                    alert(err.message);
                    console.log(err);
                });
        }
    }, [adId]);

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
        //get the user’s authentication token
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
            {/* Product Details Section */}
            <h1>Product Details</h1>
            {isAdLoading ? (
                <div>Loading product details...</div>
            ) : (
                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title">{adDetails.title}</h5>
                        <p className="card-text"><strong>Description: </strong>{adDetails.description}</p>
                        <p className="card-text"><strong>Price: </strong>${adDetails.price}</p>
                        <p className="card-text"><strong>Expiration Date: </strong>{adDetails.expirationDate}</p>
                        <p className="card-text"><strong>Tags: </strong>{adDetails.tags?.toString()}</p>
                        <p className="card-text"><strong>Active: </strong>{adDetails.isActive ? "Yes" : "No"}</p>
                        <p className="card-text"><strong>Expired: </strong>{new Date(adDetails.expirationDate) < new Date() ? "Expired" : "No"}</p>
                    </div>
                </div>
            )}

            {/* Message Board Section */}
            <h1>Message Board</h1>

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



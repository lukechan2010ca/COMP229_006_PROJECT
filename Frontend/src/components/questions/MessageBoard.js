import { useEffect, useState } from "react";//managing component lifecycle
import { useParams } from "react-router-dom";//extract URL parameters
import { getQuestionsByAdId, createQuestion, answerQuestion } from "../../datasource/api-question";
import { getToken } from "../auth/auth-helper";
import { read } from "../../datasource/api-ad";
import './MessageBoard.css';
//define functional component
const MessageBoard = () => {
    let { adId } = useParams();
    console.log("Ad ID:", adId);

    let [questions, setQuestions] = useState([]);
    let [isLoading, setIsLoading] = useState(true);
    let [newQuestion, setNewQuestion] = useState("");
    let [adDetails, setAdDetails] = useState(null); // State for product details

    useEffect(() => {
        if (adId) {
            // Fetch questions
            getQuestionsByAdId(adId)
                .then((data) => {
                    if (data) {
                        setQuestions(data);
                    }
                    setIsLoading(false);
                })
                .catch((err) => {
                    alert(err.message);
                    console.error(err);
                });

            // Fetch ad details
            read(adId)
                .then((data) => {
                    if (data) {
                        setAdDetails(data);
                    }
                })
                .catch((err) => {
                    alert("Error fetching product details");
                    console.error(err);
                });
        }
    }, [adId]);

    const handleQuestionSubmit = (e) => {
        e.preventDefault();
        if (newQuestion.trim()) {
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
            {/* Product Details Section */}
            {adDetails && (
                <div className="mb-4">
                    <h2>Product Details</h2>
                    <p><strong>Title:</strong> {adDetails.title}</p>
                    <p><strong>Description:</strong> {adDetails.description}</p>
                    <p><strong>Price:</strong> ${adDetails.price}</p>
                    <p><strong>Expiration Date: </strong> 
                        {adDetails.expirationDate 
                            ? new Date(adDetails.expirationDate).toLocaleDateString('en-CA') 
                            : 'N/A'}
                    </p>
                    <p><strong>Tags:</strong> {adDetails.tags?.join(", ")}</p>
                </div>
            )}
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
                                            value={questions[index]?.answer || ""}
                                            onChange={(e) => {
                                                const updatedQuestions = [...questions];
                                                updatedQuestions[index] = { ...updatedQuestions[index], answer: e.target.value };
                                                setQuestions(updatedQuestions);
                                            }}
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
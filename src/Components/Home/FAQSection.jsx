import { useState } from "react";
import "../../Styles/FAQSection.css";
import { Link } from "react-router-dom";



const faqData = [
  {
  question: "How do I play games here?",
  answer:
    "Just click on any game — it will load instantly in your browser. No downloads or installs needed!",
},
{
  question: "Do I need an account to play?",
  answer:
    "You can play some games without an account, but to access all games, you'll need to sign in.",
},
{
  question: "Are all games free?",
  answer:
    "Not all. A few games are premium and require access, while others are free to play!",
},
{
  question: "What devices are supported?",
  answer:
    "You can play on any device — mobile, tablet, laptop, or desktop. Everything runs smoothly right in your browser.",
},
{
  question: "Do I need to download anything?",
  answer:
    "Nope! All games run directly in your browser. Just click and play instantly.",
},

];


const FAQSection = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const handleFaqToggle = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <div className="faq-left">
        <h2>Frequently Asked Questions</h2>
        <Link to="/gameview">
  <button className="faq-btn">Play Now</button>
</Link>

        <p>
          Have questions about gaming, accounts, or features? We’ve got you
          covered. Explore our FAQs to get quick answers and jump back into the
          fun.
        </p>
      </div>

      <div className="faq-right">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`accordion-item ${
              openFaqIndex === index ? "active" : ""
            }`}
            onClick={() => handleFaqToggle(index)}
          >
            <div className="accordion-question">{faq.question}</div>
            <div
              className="accordion-answer"
              style={{
                maxHeight: openFaqIndex === index ? "200px" : "0",
              }}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;

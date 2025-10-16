import { useState } from "react";
import "../../Styles/FAQSection.css";
import { Link } from "react-router-dom";



const faqData = [
  {
    question: "How do I start playing games?",
    answer:
      "Just click on any game you like — it launches instantly in your browser with no downloads required. You can start playing right away!",
  },
  {
    question: "Do I need an account to play?",
    answer:
      "No account is needed to play most games. However, creating a free account lets you save progress, earn rewards, and join tournaments.",
  },
  {
    question: "Are all games free to play?",
    answer:
      "Yes! All games on our platform are completely free to play. Some titles may offer optional in-game purchases, but they’re never required.",
  },
  {
    question: "Can I play with my friends?",
    answer:
      "Absolutely! Many multiplayer games allow you to invite friends directly or join public lobbies for co-op and versus matches.",
  },
  {
    question: "Which devices can I play on?",
    answer:
      "You can play on any device — desktop, laptop, tablet, or smartphone. Our platform is optimized for smooth gaming everywhere.",
  },
];

const FAQSection = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const handleFaqToggle = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
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
    </section>
  );
};

export default FAQSection;

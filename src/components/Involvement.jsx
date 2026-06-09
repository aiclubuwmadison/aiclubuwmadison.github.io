import { useState, useEffect, useMemo } from 'react';
import './Involvement.css';
import { Link } from 'react-router-dom';
import { 
  User, 
  Calendar, 
  Mail, 
  GraduationCap, 
  Lightbulb, 
  Clock, 
  Users, 
  LogIn, 
  UserPlus, 
  MessageCircle,
  Search,
  HelpCircle,
  CheckCircle,
  X 
} from 'lucide-react';

const FAQS = [
  {
    q: 'I am a Freshman in CS. Is this club for me?',
    a: (
      <>
        Absolutely! Our meetings are targeted towards students at all levels in their AI journeys. This school year will be new for all of us, so we encourage freshmen to join our Discord at <a href="https://discord.gg/TTSykcZAg4" target="_blank" rel="noreferrer">discord.gg/TTSykcZAg4</a> to stay in the loop on upcoming workshops and other virtual events.
      </>
    ),
    tag: 'Beginners',
    Icon: User,
  },
  {
    q: 'When are the meetings?',
    a: (
      <>
        Our intent is for individual groups (i.e. study groups &amp; project groups) to set up their own regular meeting times. Contact group leaders over <a href="https://discord.gg/TTSykcZAg4" target="_blank" rel="noreferrer">discord.gg/TTSykcZAg4</a> for their regular meeting schedule.
      </>
    ),
    tag: 'Schedule',
    Icon: Calendar,
  },
  {
    q: 'How do I join AI@UW’s official mailing list?',
    a: (
      <>
        Our email list is moderated through Google Forms — If you'd like to receive emails regarding club events and projects, please join our discord and sign up through the linktr.ee on our instagram page <a href="https://www.instagram.com/aiclubuw/" target="_blank" rel="noreferrer">instagram.com/aiclubuw</a> or the following <a href="https://linktr.ee/aiclubuw" target="_blank" rel="noreferrer">linktr.ee/aiclubuw.</a>
      </>
    ),
    tag: 'Mailing list',
    Icon: Mail,
  },
  {
    q: 'I am an AI@UW Alumni. How do I stay in touch?',
    a: (
      <>
        Join our <a href="https://discord.gg/TTSykcZAg4" target="_blank" rel="noreferrer">Discord</a>, <a href="https://www.instagram.com/aiclubuw/" target="_blank" rel="noreferrer">Instagram</a> or, <a href="https://www.linkedin.com/company/aiclub-uwmadison" target="_blank" rel="noreferrer">LinkedIn</a> network.
      </>
    ),
    tag: 'Alumni',
    Icon: GraduationCap,
  },
  {
    q: 'If I have a project idea, how can I find people to help me?',
    a: (
      <>
        The best way to get your project off the ground is to email us a week or two before the semester starts. This way, we can help you create a couple of slides to pitch your project at our kickoff meeting. If you want to start a project mid-semester, you can try to find support for your idea via describing it in our discord.
      </>
    ),
    tag: 'Projects',
    Icon: Lightbulb,
  },
  {
    q: 'How much time per week should I expect to spend on the project or the study groups? (Is every meeting mandatory?)',
    a: (
      <>
        It depends on which groups you are in. Generally speaking, if you are in study groups, the expected time commitment would be 2-3 hours weekly (if there is a programming assignment, you might expect to spend more time working on that). However, project groups might be slightly more time-consuming. We don't recommend getting involved in more than two groups in a given semester.
      </>
    ),
    tag: 'Commitment',
    Icon: Clock,
  },
  {
    q: 'How do I know if I am qualified to join in the project groups?',
    a: (
      <>
        Project groups will be advertised in our newsletters at the start of each semester as well as during our kickoff meetings. Prerequisites will be listed next to each project description (on newsletter/kickoff slides).
      </>
    ),
    tag: 'Prerequisites',
    Icon: Users,
  },
  {
    q: 'If I missed the first several meetings, can I still join in the groups? (Can I join in the groups halfway through the semester?)',
    a: (
      <>
        You should message the group leader over discord <a href="https://discord.gg/TTSykcZAg4" target="_blank" rel="noreferrer">discord.gg/TTSykcZAg4</a> to find out. Some groups progress in content, while some have meetings which act as standalone events (and don't depend on past meetings).
      </>
    ),
    tag: 'Joining late',
    Icon: LogIn,
  },
  {
    q: 'Can I join multiple groups?',
    a: (
      <>
        We strongly recommend students do not attempt to be involved with more than two project groups.
      </>
    ),
    tag: 'Multiple groups',
    Icon: UserPlus,
  },
];

const getElementText = (node) => {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getElementText).join(' ');
  if (node.props && node.props.children) return getElementText(node.props.children);
  return '';
};

const Involvement = () => {
  const [faqList, setFaqList] = useState(FAQS);
  const [searchQuery, setSearchQuery] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    document.title = 'FAQ | AI@UW';
  }, []);

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqList;
    const q = searchQuery.toLowerCase();
    return faqList.filter((item) => {
      const questionText = item.q.toLowerCase();
      const answerText = getElementText(item.a).toLowerCase();
      return questionText.includes(q) || answerText.includes(q);
    });
  }, [faqList, searchQuery]);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("sr-visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });

    const elements = document.querySelectorAll(".atmos-reveal, .atmos-faq-row");
    elements.forEach((el, i) => {
      if (el.dataset.srReady) return;
      el.dataset.srReady = "1";
      el.classList.add("sr-hidden");
      if (el.classList.contains("atmos-faq-row")) {
        el.style.transitionDelay = `${Math.min((i % 5) * 70, 280)}ms`;
      }
      io.observe(el);
    });

    return () => io.disconnect();
  }, [filteredFaqs]);

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      setNotification(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [notification]);

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    const newItem = {
      q: newQuestion.trim(),
      a: "This question has been submitted by a community member and is currently pending review by the AI@UW team. An official answer will be published shortly!",
      tag: 'Pending Review / Community Question',
      Icon: HelpCircle,
      isPending: true,
    };

    setFaqList((prev) => [...prev, newItem]);
    setNewQuestion('');
    setNotification({
      message: "Your question has been submitted successfully and is pending officer review.",
      id: Date.now()
    });
  };

  return (
    <div className="atmos-root atmos-involvement">
      <div className="atmos-shell">
        <div className="atmos-faq-layout">

          {/* Left Column */}
          <div className="atmos-faq-left atmos-reveal">
            <span className="faq-label">FAQ</span>
            <h1 className="faq-heading">
              Ask anything.<br />
              We're here to help<span className="faq-heading-period">.</span>
            </h1>
            <p className="faq-subtitle">Find quick answers to the most commonly asked questions.</p>

            <div className="faq-contact-card">
              <div className="faq-contact-card-icon">
                <MessageCircle size={20} />
              </div>
              <div className="faq-contact-card-body-wrap">
                <p className="faq-contact-card-title">Still have questions?</p>
                <p className="faq-contact-card-body">Can't find what you're looking for? Reach out to us — we'd love to hear from you.</p>
                <Link to="/contact" className="faq-contact-card-link">Contact Us →</Link>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="atmos-faq-right">
            {/* FAQ Search Bar */}
            <div className="faq-search-container atmos-reveal">
              <div className="faq-search-wrap">
                <input
                  type="text"
                  className="faq-search-input"
                  placeholder="Search questions or answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="faq-search-icon">
                  <Search size={18} />
                </span>
                {searchQuery && (
                  <button 
                    type="button" 
                    className="faq-search-clear" 
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            </div>

            {/* FAQ List Card */}
            <div className="faq-right-card">
              {filteredFaqs.length > 0 ? (
                <ul className="atmos-faq-list">
                  {filteredFaqs.map((item, i) => (
                    <li key={item.q} className="atmos-faq-row atmos-reveal">
                      <details className="atmos-faq-item">
                        <summary>
                          <div className="faq-row-inner">
                            <div className="faq-row-icon"><item.Icon size={17} /></div>
                            <div className="faq-row-text-wrap">
                              <h2 className="atmos-faq-q">{item.q}</h2>
                              {item.isPending && (
                                <span className="faq-pending-tag">Pending Review / Community Question</span>
                              )}
                            </div>
                          </div>
                          <span className="atmos-faq-toggle" aria-hidden="true" />
                        </summary>
                        <div className="atmos-faq-a">
                          <p className="atmos-faq-a-body">{item.a}</p>
                        </div>
                      </details>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="faq-empty-state">
                  <p className="faq-empty-title">No matching questions found</p>
                  <p className="faq-empty-subtitle">Try adjusting your keywords, or submit your question below to get it answered.</p>
                </div>
              )}
            </div>

            {/* Q&A Submission Form */}
            <div className="faq-submit-card atmos-reveal">
              <h3 className="faq-submit-title">Can't find your question?</h3>
              <p className="faq-submit-text">Submit a new question to the community. It will be displayed below under a pending status until reviewed by our team.</p>
              
              <form onSubmit={handleSubmitQuestion} className="faq-submit-form">
                <div className="faq-submit-textarea-wrap">
                  <textarea
                    className="faq-submit-textarea"
                    placeholder="Type your question here (e.g. Do I need experience with PyTorch?)..."
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    rows={3}
                    maxLength={300}
                    required
                  />
                  <div className="faq-submit-char-count">
                    {newQuestion.length}/300
                  </div>
                </div>
                <button type="submit" className="faq-submit-btn">
                  Submit Question
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>

      {/* Success Notification Toast */}
      {notification && (
        <div className="faq-toast" role="alert">
          <div className="faq-toast-icon">
            <CheckCircle size={18} />
          </div>
          <div className="faq-toast-content">
            <p className="faq-toast-title">Question Submitted</p>
            <p className="faq-toast-message">{notification.message}</p>
          </div>
          <button 
            type="button" 
            className="faq-toast-close" 
            onClick={() => setNotification(null)}
            aria-label="Close notification"
          >
            <X size={15} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Involvement;

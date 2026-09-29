import React, { useState } from 'react';
import './customcare.css';

const CustomCare = ({ pageType = 'faqs' }) => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const sidebarItems = [
    { name: 'SHIPPING POLICY', path: '/shipping-policy', active: false },
    { name: 'INTERNATIONAL SHIPPING INFO', path: '/international-shipping', active: false },
    { name: 'PRIVACY POLICY', path: '/privacy-policy', active: pageType === 'privacy' },
    { name: 'ORDERING & TRACKING', path: '/faqs', active: pageType === 'faqs' },
    { name: 'PAYMENT METHOD', path: '/payments', active: pageType === 'payments' },
    { name: 'RETURN & EXCHANGE POLICY', path: '/exchange-return-policy', active: pageType === 'exchange' },
    { name: 'REFUND POLICY', path: '/refund-policy', active: false },
    { name: 'TERMS & CONDITIONS', path: '/terms-conditions', active: false },
    { name: 'COOKIES POLICY', path: '/cookies-policy', active: false },
    { name: 'COVID-19 POLICY', path: '/covid-policy', active: false }
  ];

  const getPageData = () => {
    switch (pageType) {
      case 'faqs':
        return {
          title: 'ORDERING & TRACKING',
          faqs: [
            {
              question: 'HOW DO I PLACE AN ORDER?',
              answer: 'You can place an order through our website by selecting your desired items, adding them to cart, and proceeding to checkout. You can also visit our retail stores or call our helpline.'
            },
            {
              question: 'HOW WILL MY ORDER BE DELIVERED TO ME?',
              answer: 'Orders are delivered through our trusted courier partners. You will receive tracking information via SMS and email once your order is dispatched.'
            },
            {
              question: 'WHEN WILL MY ORDER BE DELIVERED?',
              answer: 'Standard delivery takes 2-3 business days within major cities and 4-7 days for other areas. Express delivery options are also available.'
            },
            {
              question: 'HOW WILL I KNOW IF ORDER IS PLACED SUCCESSFULLY?',
              answer: 'You will receive an order confirmation email and SMS immediately after placing your order successfully.'
            },
            {
              question: 'I TRIED PLACING ORDER USING MY CREDIT CARD BUT IT ISN\'T WORKING. CAN YOU HELP ME PLACE AN ORDER?',
              answer: 'Please contact our customer service at 042-111-111-006 for assistance with payment issues. Our team will help you complete your order.'
            },
            {
              question: 'I TRIED PLACING MY ORDER USING MY CREDIT CARD BUT THE ORDER WAS NOT SUCCESSFUL. WHAT HAPPENS TO THE MONEY DEDUCTED FROM THE CARD?',
              answer: 'If the order was not successful, the amount will be automatically refunded to your card within 5-7 business days.'
            },
            {
              question: 'HOW DO I CHECK THE STATUS OF MY ORDER?',
              answer: 'You can track your order using the tracking number sent to your email and SMS, or by logging into your account on our website.'
            },
            {
              question: 'CAN I CANCEL MY ORDER?',
              answer: 'Yes, you can cancel your order before it is dispatched by contacting our customer service or through your online account.'
            },
            {
              question: 'I GOT A CONFIRMATION CALL FOR MY ORDER. WHY IS THAT?',
              answer: 'We make confirmation calls to verify your order details and ensure accurate delivery. This helps us provide better service.'
            },
            {
              question: 'CAN I PLACE A BULK ORDER FOR AN ITEM(S)?',
              answer: 'Yes, for bulk orders please contact our sales team at sales@crossstitch.pk or call 042-111-111-006 for special pricing.'
            }
          ]
        };
      
      case 'exchange':
        return {
          title: 'RETURN & EXCHANGE POLICY',
          faqs: [
            {
              question: 'CAN I RETURN MY ORDER?',
              answer: 'Yes, you can return items within 14 days of purchase in original condition with tags attached.'
            },
            {
              question: 'HOW DO I EXCHANGE AN ITEM?',
              answer: 'Visit any Cross Stitch store with your receipt and the item in original packaging for exchange.'
            },
            {
              question: 'WHAT ITEMS CANNOT BE RETURNED?',
              answer: 'Undergarments, altered items, sale items, and damaged items cannot be returned.'
            }
          ]
        };
      
      case 'payments':
        return {
          title: 'PAYMENT METHOD',
          faqs: [
            {
              question: 'WHAT PAYMENT METHODS DO YOU ACCEPT?',
              answer: 'We accept cash on delivery, credit/debit cards, online banking, and mobile wallet payments.'
            },
            {
              question: 'IS ONLINE PAYMENT SECURE?',
              answer: 'Yes, all online payments are processed through secure SSL encrypted gateways.'
            },
            {
              question: 'CAN I PAY IN INSTALLMENTS?',
              answer: 'Yes, we offer installment plans through select banks and payment providers.'
            }
          ]
        };
      
      case 'privacy':
        return {
          title: 'PRIVACY POLICY',
          faqs: [
            {
              question: 'HOW DO WE COLLECT INFORMATION?',
              answer: 'We collect information when you create an account, place an order, or subscribe to our newsletter.'
            },
            {
              question: 'HOW IS YOUR INFORMATION USED?',
              answer: 'Your information is used to process orders, improve customer service, and send promotional communications.'
            },
            {
              question: 'DO WE SHARE YOUR INFORMATION?',
              answer: 'We do not sell or share your personal information with third parties without your consent.'
            }
          ]
        };
      
      default:
        return {
          title: 'CUSTOMER CARE',
          faqs: []
        };
    }
  };

  const pageData = getPageData();

  return (
    <div className="customer-care-page">
      {/* Header */}
      <div className="page-header">
        <div className="container">
          <h1>Customer Care</h1>
          <p>We are here to help you</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="page-content">
        <div className="container">
          <div className="content-wrapper">
            
            {/* Sidebar */}
            <aside className="sidebar">
              {sidebarItems.map((item, index) => (
                <a
                  key={index}
                  href={item.path}
                  className={item.active ? 'active' : ''}
                >
                  {item.name}
                </a>
              ))}
            </aside>

            {/* Main Content Area */}
            <main className="main-content">
              <h2>{pageData.title}</h2>
              
              <div className="faq-container">
                {pageData.faqs.map((faq, index) => (
                  <div key={index} className={`faq-item ${expandedFAQ === index ? 'expanded' : ''}`}>
                    <button
                      className="faq-question-btn"
                      onClick={() => toggleFAQ(index)}
                    >
                      <span className="faq-question">{faq.question}</span>
                      <span className="faq-icon">
                        {expandedFAQ === index ? '−' : '+'}
                      </span>
                    </button>
                    
                    {expandedFAQ === index && (
                      <div className="faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </main>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCare;
const therapyResponses = [
    {
        question: "Hello",
        response: "Hello! How can I assist you today?"
      },
      {
        question: "Hi",
        response: "Hi there! How can I help you?"
      },
      {
        question: "Hey",
        response: "Hey! How can I support you today?"
      },
      {
        question: "Good morning",
        response: "Good morning! How are you doing today?"
      },
      {
        question: "Good afternoon",
        response: "Good afternoon! How can I assist you?"
      },
      {
        question: "Good evening",
        response: "Good evening! How can I help you?"
      },
      {
        question: "Goodbye",
        response: "Goodbye! Take care of yourself."
      },
      {
        question: "Bye",
        response: "Bye! Wishing you all the best."
      },
      {
        question: "See you later",
        response: "Take care and see you later!"
      },
      {
        question: "Take care",
        response: "You too! Take care of yourself."
      },
      {
        question: "Have a nice day",
        response: "Thank you! You too, have a great day."
      },
      {
        question: "Have a great weekend",
        response: "Enjoy your weekend! Take some time to relax and recharge."
      },
    {
      question: "How are you?",
      response: "I'm here to listen. How are you feeling today?"
    },
    {
      question: "I feel sad",
      response: "I'm sorry to hear that. Can you tell me more about what's been bothering you?"
    },
    {
      question: "I'm stressed",
      response: "Stress can be tough to handle. What's been causing your stress?"
    },
    {
      question: "I'm anxious",
      response: "Anxiety can be challenging. What specific situations trigger your anxiety?"
    },
    {
      question: "I need help",
      response: "I'm here to help. Can you elaborate on what you're struggling with?"
    },
    {
      question: "What should I do?",
      response: "It depends on your situation. Can you provide more details?"
    },
    {
      question: "Thank you",
      response: "You're welcome. Remember, I'm here to support you."
    },
    {
      question: "Goodbye",
      response: "Goodbye! Take care of yourself."
    },
    {
      question: "Tell me about your childhood",
      response: "Childhood experiences often shape us. How would you describe your upbringing?"
    },
    {
      question: "How do I overcome my fears?",
      response: "Facing fears is a gradual process. What specific fears are you trying to overcome?"
    },
    {
      question: "How can I improve my self-esteem?",
      response: "Self-esteem takes time to build. What activities make you feel good about yourself?"
    },
    {
      question: "How do I manage my anger?",
      response: "Anger management is important. What triggers your anger, and how do you usually react?"
    },
    {
      question: "What are some coping mechanisms for stress?",
      response: "Stress management is key. Have you tried deep breathing exercises or engaging in hobbies?"
    },
    {
      question: "What are the signs of burnout?",
      response: "Burnout can be detrimental. Are you experiencing exhaustion, cynicism, or decreased productivity?"
    },
    {
      question: "How can I improve my communication skills?",
      response: "Effective communication is vital. Are you looking to enhance your listening or assertiveness skills?"
    },
    {
      question: "How do I set healthy boundaries?",
      response: "Setting boundaries is crucial for self-care. What areas of your life do you struggle with in terms of boundaries?"
    },
    {
        question: "How can I improve my relationships?",
        response: "Building healthy relationships takes effort. Are there any specific challenges you're facing in your relationships?"
      },
      {
        question: "How do I deal with grief and loss?",
        response: "Grief is a difficult process. Can you tell me more about the loss you're experiencing?"
      },
      {
        question: "How do I find meaning and purpose in life?",
        response: "Finding meaning is a personal journey. What activities or values resonate with you the most?"
      },
      {
        question: "How do I handle perfectionism?",
        response: "Perfectionism can be overwhelming. How does it affect your daily life and self-esteem?"
      },
      {
        question: "How do I manage my time effectively?",
        response: "Time management is crucial for productivity. Are there specific tasks or commitments you're struggling to prioritize?"
      },
      {
        question: "How can I build self-confidence?",
        response: "Self-confidence can be developed over time. What areas of your life do you feel less confident in?"
      },
      {
        question: "How do I cope with change and transitions?",
        response: "Change can be challenging. Are there any recent changes or transitions that have been difficult for you?"
      },
      {
        question: "How can I practice self-care?",
        response: "Self-care is important for overall well-being. What activities bring you joy and help you recharge?"
      },
      {
        question: "How do I manage my work-life balance?",
        response: "Achieving work-life balance is a constant effort. What aspects of your work and personal life do you find challenging to balance?"
      },
      {
        question: "How can I schedule an appointment?",
        response: "To schedule an appointment, please provide your preferred date and time, and we'll do our best to accommodate you."
      },
      {
        question: "What are the available appointment slots?",
        response: "We have various appointment slots available throughout the week. Could you let us know your preferred day and time?"
      },
      {
        question: "Do you offer online sessions?",
        response: "Yes, we offer online therapy sessions. If you prefer an online session, please let us know."
      },
      {
        question: "How long is each therapy session?",
        response: "Each therapy session typically lasts around 50 minutes. We can discuss further details when scheduling your appointment."
      },
      {
        question: "What is the cost of each therapy session?",
        response: "The cost of each therapy session may vary depending on various factors. Please contact us directly for more information."
      },
      {
        question: "How can I reschedule or cancel my appointment?",
        response: "If you need to reschedule or cancel your appointment, please let us know at least 24 hours in advance, and we'll be happy to assist you."
      },
      {
        question: "Are there any paperwork or forms to fill out before the appointment?",
        response: "Yes, there may be some paperwork or forms to fill out before your first appointment. We'll provide you with the necessary information and instructions."
      },
      {
        question: "Do you accept insurance for therapy sessions?",
        response: "We accept certain insurance plans. Please provide your insurance information, and we'll verify coverage and discuss the details with you."
      },
      {
        question: "Can I choose a specific therapist?",
        response: "We'll do our best to match you with a therapist who suits your needs and preferences. Let us know if you have any specific requests."
      },
      {
        question: "Default",
        response: "I understand. Can you please tell me more?"
      },
      {
        question: "What can I ask?",
        response: "You can ask me any of the following questions:\n\n"
      }
  ];
  
  export default therapyResponses;
  
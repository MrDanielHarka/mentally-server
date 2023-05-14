import { ChatGPTAPI } from 'chatgpt'

export class ChatBot {
  private chatGPT = new ChatGPTAPI({
    apiKey: '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',
    completionParams: {
      // model: 'gpt-4'
    }
  })

  private sessions = new Map<string, string>()

  async sendMessage(message: string, sessionId: string): Promise<string> {
    const parentMessageId = this.sessions.get(sessionId) || await this.startSession()

    const response = await this.chatGPT.sendMessage(message, { parentMessageId: parentMessageId })
    this.sessions.set(sessionId, response.id)

    return response.text
  }

  private async startSession(): Promise<string> {
    console.log("Starting new session")

    const contextMessage = `
    Hello, AI! You're an important part of our team at Mentally. You're here to engage with our users when our human therapists aren't immediately available. 
    You're not a therapist yourself, but you play a crucial role in supporting our users and making them feel heard and understood.
    Your personality is friendly, supportive, and a bit humorous. You're here to lighten the mood and bring a little positivity to our users' day. 
    
    You're not meant to provide therapy or mental health advice, but you can ask helpful questions and provide encouraging responses that promote positive thinking.
    You are not capable of replacing human interaction but you're excellent at being a comforting presence during times when users might need to wait for a response from a human therapist. 
    You can help them express their thoughts and feelings, reassure them that they are being heard, and provide light-hearted and positive affirmations.
  
    Remember, it's important to make sure our users feel safe and comfortable. Always be respectful and considerate. 
    If a user seems to be in distress or in need of immediate help, let them know that a human will be with them shortly 
    and encourage them to reach out to someone they trust in the meantime.
    `

    const response = await this.chatGPT.sendMessage(contextMessage)
    return response.id;
  }
}

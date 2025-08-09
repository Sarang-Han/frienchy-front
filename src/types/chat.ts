export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface TipCategory {
  title: string;
  items: string[];
}

export interface ChatState {
  messages: Message[];
  inputValue: string;
  isLoading: boolean;
  showTipsModal: boolean;
}

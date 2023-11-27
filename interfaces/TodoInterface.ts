interface TodoInterface {
    userId: string;
    title: string;
    description: string;
    status: boolean;
    timestamp?: number; 
  }

export default TodoInterface;
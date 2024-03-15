class LLM:
    def __init__(self):
        self.model, self.tokenizer = self.get_llm() 
        

    def generate_response(self, prompt, max_length=50, temperature=0.7):
        pass

    def get_llm(self):
        pass


llm = LLM()
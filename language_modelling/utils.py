import transformers
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM


class LLM:
    def __init__(self):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        print(torch.cuda.is_available() , '********')
        print(f"Using device: {self.device}")
        self.get_llm() 
        

    def generate_response(self, prompt, max_length=50, temperature=0.7):
        input_ids = self.tokenizer(prompt, return_tensors="pt").to(self.device)
        # print(input_ids)
        # output = self.model.generate(input_ids, max_length=max_length, temperature=temperature)
        # return self.tokenizer.decode(output[0], skip_special_tokens=True)

        if self.model is not None:  # If model loading was successful
            # Generate text using the loaded model (replace max_length with desired output length)
            with torch.no_grad():
                
                outputs = self.model.generate(**input_ids, max_length=200)[0]
                generated_text = self.tokenizer.decode(outputs,  skip_special_tokens=True)
                # print('\n\n\n\n', generated_text)
            return generated_text

        else:
            print("Model loading failed. Please try again with a smaller model or alternative approach.")

    def get_llm(self):
        self.model = None

        try:
            from accelerate import FullyShardedDataParallelPlugin, Accelerator
            from torch.distributed.fsdp.fully_sharded_data_parallel import FullOptimStateDictConfig, FullStateDictConfig

            fsdp_plugin = FullyShardedDataParallelPlugin(
                state_dict_config=FullStateDictConfig(offload_to_cpu=True, rank0_only=False),
                optim_state_dict_config=FullOptimStateDictConfig(offload_to_cpu=True, rank0_only=False),
            )

            accelerator = Accelerator(fsdp_plugin=fsdp_plugin)
                        # Attempt to load full model on GPU if memory allows
            from transformers import AutoModelForCausalLM, BitsAndBytesConfig

            base_model_id = "bigscience/bloom-7b1"
            bnb_config = BitsAndBytesConfig(
                load_in_4bit=True,
                bnb_4bit_use_double_quant=True,
                bnb_4bit_quant_type="nf4",
                bnb_4bit_compute_dtype=torch.bfloat16
            )

            self.model = AutoModelForCausalLM.from_pretrained(base_model_id, quantization_config=bnb_config, resume_download=True)
            # self.model = AutoModelForCausalLM.from_pretrained(base_model_id, torch_dtype=torch.float32).to(self.device)
            self.model.eval()
            print("Full Bloom-7B model loaded successfully.")
        except RuntimeError as e:
            if "out of memory" in str(e):
                print("Full Bloom-7B model might not fit on GPU. Trying to load a smaller section...")

            # Alternative: Load a smaller, compatible BLOOM model (if available)
            # For example: model_name = "bigscience/bloom-137B"  # Replace with a suitable smaller model

            # If no smaller model is available, consider alternative approaches:
            # 1. Gradient accumulation for training (might not be suitable for inference)
            # 2. Model parallelism (requires specialized hardware/software)
            # 3. Cloud platforms with high-memory GPUs (e.g., Google Colab Pro)

        self.tokenizer = AutoTokenizer.from_pretrained("bigscience/bloom-7b1", add_bos_token=True,)
        if self.tokenizer.pad_token is None:
            self.tokenizer.add_special_tokens({'pad_token': '[PAD]'})



llm = LLM()




# # Craft a short input sequence to avoid memory issues
# prompt = "Write a poem about a beautiful sunset."
# response = llm.generate_response(prompt)


# import pycuda.driver as cuda
# import torch
# cuda.init()
# num_gpus = cuda.Device.count()
# print(f"Number of GPUs: {num_gpus}")
# print("is torch cuda avaialable",torch.cuda.is_available())
# print("torch cuda count",torch.cuda.device_count())
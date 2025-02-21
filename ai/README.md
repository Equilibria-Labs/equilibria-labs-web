# Fine-Tuning Mistral 8x7B with Hugging Face AutoTrain (Hosted, No-Code Solution)

This guide provides step-by-step instructions for fine-tuning **Mistral 8x7B** on Hugging Face's **AutoTrain** hosted solution using a **JSONL dataset** and accessing the model via API.

---

## **Prerequisites**
Before starting, ensure you have:
- A **Hugging Face account** ([Sign up here](https://huggingface.co/join))
- An **AutoTrain** subscription (required for LLM fine-tuning)
- A prepared **JSONL dataset** formatted for instruction tuning

---

## **Step 1: Prepare Your JSONL Dataset**
AutoTrain supports JSONL format for **Supervised Fine-Tuning (SFT)**. Each line should contain an **input-output pair**.

### **Example JSONL File (`sleep_data.jsonl`)**
```json
{"input": "ISI: 12, PSQI: 8, ESS: 10. Patient reports difficulty falling asleep and daytime drowsiness.", 
 "output": "Your sleep assessment suggests moderate insomnia (ISI: 12) and poor sleep quality (PSQI: 8). You may also experience excessive daytime sleepiness (ESS: 10). Consider improving sleep hygiene, reducing caffeine intake, and consulting a sleep specialist if symptoms persist."}

{"input": "ISI: 5, PSQI: 3, ESS: 6. Patient has no major complaints.", 
 "output": "Your sleep assessment indicates good sleep quality (PSQI: 3) and minimal insomnia symptoms (ISI: 5). Keep maintaining healthy sleep habits!"}
```

✅ **Ensure:**
- Each entry contains an `"input"` (structured sleep assessment data).
- Each entry has a corresponding `"output"` (natural language report).
- The dataset is saved as **JSONL (not CSV, JSON, or TXT).**

---

## **Step 2: Upload Dataset to Hugging Face**
1. Visit **[Hugging Face Datasets](https://huggingface.co/datasets)**
2. Click **"Create a Dataset"**
3. Name your dataset (e.g., `sleep-report-dataset`)
4. **Upload `sleep_data.jsonl`** to your dataset repository
5. Click **"Commit"** to save your dataset.

---

## **Step 3: Create a New AutoTrain Project**
1. Go to **[Hugging Face AutoTrain](https://ui.autotrain.huggingface.co/)**
2. Click **"New Project"**
3. Select **"LLM Fine-Tuning"**
4. Choose **Mistral 8x7B** as the base model

---

## **Step 4: Configure Fine-Tuning Settings**
1. Under **"Dataset"**, select **"Use a dataset from Hugging Face Hub"**
2. Enter your dataset name (`your-username/sleep-report-dataset`)
3. **Do not change the column mapping**
4. Under **"Fine-Tuning Method"**, choose **LLM SFT**
5. Select **Training Parameters**:
   - Batch Size: **4** (or adjust based on your needs)
   - Epochs: **3-5** (higher for better learning)
   - Learning Rate: **2e-5** (default)

---

## **Step 5: Start Fine-Tuning**
1. Click **"Start Training"**
2. Monitor progress in the AutoTrain UI
3. Once complete, your model will be available on **Hugging Face Hub**

---

## **Step 6: Test Your Fine-Tuned Model via API**
Once training is complete, you can use the Hugging Face **Inference API** to interact with your model.

### **Using the API with Node.js**
Install `axios` if you haven't already:
```sh
npm install axios
```

Use the following Node.js script to send a request to your fine-tuned model:
```javascript
const axios = require('axios');

const API_URL = "https://api-inference.huggingface.co/models/your-username/mistral-sleep-report";
const HEADERS = { "Authorization": "Bearer YOUR_HUGGINGFACE_API_KEY" };

async function query(inputText) {
    try {
        const response = await axios.post(API_URL, { inputs: inputText }, { headers: HEADERS });
        console.log(response.data);
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
    }
}

query("ISI: 14, PSQI: 9, ESS: 12. Patient wakes up frequently and struggles with daytime fatigue.");
```
✅ **Replace `your-username/mistral-sleep-report` with your actual model name.**
✅ **Replace `YOUR_HUGGINGFACE_API_KEY` with your Hugging Face access token.**

---

## **Conclusion**
- **AutoTrain simplifies fine-tuning Mistral 8x7B without code.**
- **JSONL format ensures structured learning for your use case.**
- **Use LLM SFT for optimal fine-tuning.**
- **Your fine-tuned model can be deployed directly via Hugging Face API.**

---

## **Next Steps**
- Improve training with **more diverse sleep report examples**.
- Experiment with **different fine-tuning hyperparameters**.
- Deploy the model in an **app or chatbot** for real-world use.

🚀 **Start Training Now on [Hugging Face AutoTrain](https://ui.autotrain.huggingface.co/)!** 🚀


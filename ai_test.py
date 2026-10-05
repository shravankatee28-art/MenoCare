from google import genai
from dotenv import load_dotenv
import os


# Load .env file

load_dotenv()


# Get Gemini API key

api_key = os.getenv("GEMINI_API_KEY")


# Create Gemini client

client = genai.Client(
    api_key=api_key
)


# Send test question

response = client.models.generate_content(

    model="gemini-3.7-flash",

    contents="Explain menopause in one simple sentence."

)


# Print AI response

print(response.text)
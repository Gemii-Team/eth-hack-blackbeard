import os
import boto3
from dotenv import load_dotenv

load_dotenv()

bedrock_client = boto3.client("bedrock-runtime", region_name=os.getenv("AWS_REGION"))

def chat_with_bedrock(user_input: str):
    """Send user input to AWS Bedrock model and return response."""
    model_id = os.getenv("BEDROCK_MODEL", "anthropic.claude-v2")
    response = bedrock_client.invoke_model(
        body={
            "prompt": user_input,
            "max_tokens": 200
        },
        modelId=model_id
    )
    return response["body"].read().decode("utf-8")
